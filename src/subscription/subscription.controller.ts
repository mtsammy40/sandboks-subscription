import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PlatformEvents } from '../commons/data/platform-events.enum';
import { NotificationAccountingDto } from '../commons/dto/notification-accounting.dto';
import { PlatformBus } from 'src/commons/data/platform-bus.enum';
import { PlatformEvent } from 'src/commons/data/platform-event';

@Controller()
export class SubscriptionController {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(private readonly subscriptionService: SubscriptionService) {
  }

  @EventPattern(PlatformBus.APP)
  process(@Payload('value') platformEvent: PlatformEvent): void {
    this.logger.log('Receiving payload...'+ JSON.stringify(platformEvent))
    this.route(platformEvent)
  }

  route(platformEvent: PlatformEvent): void {
    this.logger.log('Type '+platformEvent._eid);
    if(platformEvent._eid === PlatformEvents.CREATE_SUBSCRIPTION_REQUESTED ) {
      this.subscriptionService.createSubscription(new CreateSubscriptionDto(platformEvent.data.userId, platformEvent.data.planId), platformEvent._rid);
    } else if(platformEvent._eid === PlatformEvents.USER_CREATED) {
      this.subscriptionService.createSubscriptionFromUser(platformEvent.data);
    }
  }

  async createForUser(userDto: any) {
    return this.subscriptionService.createSubscriptionFromUser(userDto);
  }

  @EventPattern(PlatformEvents.NOTIFICATION_POSTING_REQUESTED)
  accounting(@Payload() notificationAccountingDto: NotificationAccountingDto) {
    return this.subscriptionService.accountForNotification(
      notificationAccountingDto,
    );
  }

  @EventPattern(PlatformEvents.SUSPEND_SUBSCRIPTION_REQUESTED)
  suspend(@Payload() suspendSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.suspendSubscription(
      suspendSubscriptionDto.id,
      null,
    );
  }

  @EventPattern(PlatformEvents.EXPIRE_SUBSCRIPTION_REQUESTED)
  expire(@Payload() suspendSubscriptionDto: UpdateSubscriptionDto) {
    return this.subscriptionService.expireSubscription(
      suspendSubscriptionDto.id
    );
  }
}
