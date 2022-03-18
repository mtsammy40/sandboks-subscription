import { Injectable, Logger } from '@nestjs/common';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { SubscriptionManager } from './subscription-manager';
import { Status, Subscription } from './entities/subscription.entity';
import { ApplicationException } from '../commons/exceptions/application.exception';
import { ErrorCode } from '../commons/exceptions/error.code';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client, ClientKafka } from '@nestjs/microservices';
import { microserviceConfig } from '../microservice.config';
import { PlatformEvents } from '../commons/data/platform-events.enum';
import { PlanService } from '../plan/plan.service';
import { ChannelConfiguration } from '../plan/entities/plan.entity';
import { NotificationAccountingDto } from '../commons/dto/notification-accounting.dto';

@Injectable()
export class SubscriptionService implements SubscriptionManager {
  @Client(microserviceConfig) client: ClientKafka;

  private readonly logger = new Logger(SubscriptionService.name);

  constructor(
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
    private readonly planService: PlanService,
  ) {}

  async accountForNotification(
    notificationAccountingDto: NotificationAccountingDto,
  ): Promise<boolean> {
    const { userId, type } = notificationAccountingDto;
    if (!userId) {
      throw ApplicationException.simpleException(
        ErrorCode.INVALID_INPUT,
        'Invalid userId',
      );
    }
    if (!type) {
      throw ApplicationException.simpleException(
        ErrorCode.INVALID_INPUT,
        'Invalid type',
      );
    }

    const subscription = await this.findActiveSubscriptionByUserId(userId);
    const plan = await this.planService.findOne(subscription.planId);

    const config: ChannelConfiguration = plan.configuration[type.toLowerCase()];

    if (!config) {
      throw ApplicationException.simpleException(
        ErrorCode.GENERAL,
        'Configurations for type not found',
      );
    }

    if (!config.isEnabled) {
      throw ApplicationException.simpleException(
        ErrorCode.CHANNEL_DENIED,
        'Notification not allowed for this plan',
      );
    }

    const messageCounter = subscription.counter[type.toLowerCase()] || 0;
    if (config.maxAllowed <= messageCounter) {
      throw ApplicationException.simpleException(
        ErrorCode.QUOTA_EXHAUSTED,
        'You have exhausted your quota for this plan',
      );
    }

    subscription.counter[type.toLowerCase()] = messageCounter + 1;
    await this.subscriptionRepository.save(subscription);

    await this.client.emit<Subscription>(
      PlatformEvents.NOTIFICATION_ACCOUNTING_DONE,
      notificationAccountingDto,
    );
    return true;
  }

  async createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
  ): Promise<Subscription> {
    this.logger.log(
      'CreateSubscription ',
      JSON.stringify(createSubscriptionDto),
    );
    await createSubscriptionDto.test();

    const subscription = Subscription.create(
      createSubscriptionDto.userId,
      createSubscriptionDto.planId,
    );
    const savedSubscription = await this.subscriptionRepository.save(
      subscription,
    );

    await this.client.emit<Subscription>(
      PlatformEvents.SUBSCRIPTION_CREATED,
      savedSubscription,
    );
    return savedSubscription;
  }

  async expireSubscription(id: string): Promise<boolean> {
    const subscription = await this.findActiveSubscription(id);

    subscription.status = Status.EXPIRED;
    const savedSubscription = await this.subscriptionRepository.save(
      subscription,
    );

    await this.client.emit<Subscription>(
      PlatformEvents.SUBSCRIPTION_EXPIRED,
      savedSubscription,
    );

    return true;
  }

  async suspendSubscription(id: string, reason: string): Promise<boolean> {
    const subscription = await this.findActiveSubscription(id);

    subscription.status = Status.SUSPENDED;
    const savedSubscription = await this.subscriptionRepository.save(
      subscription,
    );

    await this.client.emit<Subscription>(
      PlatformEvents.SUBSCRIPTION_SUSPENDED,
      savedSubscription,
    );

    return true;
  }

  private async findActiveSubscription(id: string) {
    const subscription = await this.subscriptionRepository.findOneBy({
      id,
      status: Status.ACTIVE,
    });

    if (!subscription) {
      throw ApplicationException.simpleException(
        ErrorCode.INVALID_INPUT,
        'Subscription not found',
      );
    }
    return subscription;
  }

  private async findActiveSubscriptionByUserId(userId: string) {
    const subscription = await this.subscriptionRepository.findOneBy({
      userId,
      status: Status.ACTIVE,
    });

    if (!subscription) {
      throw ApplicationException.simpleException(
        ErrorCode.INVALID_INPUT,
        'Subscription not found',
      );
    }
    return subscription;
  }
}
