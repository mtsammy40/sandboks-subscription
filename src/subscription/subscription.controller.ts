import { Controller } from '@nestjs/common';
import { EventPattern, KafkaContext, MessagePattern, Payload } from '@nestjs/microservices';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PlatformEvents } from '../commons/data/platform-events.enum';
import { NotificationAccountingDto } from '../commons/dto/notification-accounting.dto';

@Controller()
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {
  }

  @EventPattern(PlatformEvents.CREATE_SUBSCRIPTION_REQUESTED)
  create(@Payload() createSubscriptionDto: CreateSubscriptionDto) {
    return this.subscriptionService.createSubscription(createSubscriptionDto);
  }

  @EventPattern(PlatformEvents.USER_CREATED)
  createForUser(userDto: any) {
    console.log('Payload ', userDto);
    const createSubscriptionDto = new CreateSubscriptionDto();
    createSubscriptionDto.userId = userDto.value.id;
    createSubscriptionDto.planId = '06d59e6c-a6c0-11ec-b909-0242ac120002';
    return this.subscriptionService.createSubscription(createSubscriptionDto);
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
    return this.subscriptionService.suspendSubscription(
      suspendSubscriptionDto.id,
      null,
    );
  }
}
