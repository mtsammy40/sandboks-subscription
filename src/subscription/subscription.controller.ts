import { Controller, Logger } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SubscriptionService } from './subscription.service';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { UpdateSubscriptionDto } from './dto/update-subscription.dto';
import { PlatformEvents } from '../common/data/platform-events.enum';
import { NotificationAccountingDto } from '../common/dto/notification-accounting.dto';
import { PlatformBus } from 'src/common/data/platform-bus.enum';
import { PlatformEvent } from 'src/common/data/platform-event';
import { PlatformEventListener } from 'src/common/listener';
import { PlatformEventWatcher } from 'src/common/platform-event-watcher';
import { EventsProvider } from 'src/common/events/events-provider';

@Controller()
@PlatformEventWatcher
export class SubscriptionController {
  private readonly logger = new Logger(SubscriptionService.name);

  constructor(private readonly subscriptionService: SubscriptionService, private readonly eventsProvider: EventsProvider) {
  }

  
  @PlatformEventListener(PlatformEvents.CREATE_SUBSCRIPTION_REQUESTED)
  async create(createSubscriptionDto: any, rid: string) {
    console.log('If we are here we are good', createSubscriptionDto);
    return this.subscriptionService.createSubscription(createSubscriptionDto, rid);
  }

  @PlatformEventListener(PlatformEvents.NOTIFICATION_POSTING_REQUESTED)
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
