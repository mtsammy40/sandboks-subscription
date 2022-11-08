import { Subscription } from './entities/subscription.entity';
import { CreateSubscriptionDto } from './dto/create-subscription.dto';
import { NotificationType } from '../commons/data/notification-type.enum';
import { NotificationAccountingDto } from '../commons/dto/notification-accounting.dto';

export abstract class SubscriptionManager {
  abstract createSubscription(
    createSubscriptionDto: CreateSubscriptionDto,
    returnId: string
  ): Promise<Subscription>;

  abstract suspendSubscription(id: string, reason: string): Promise<boolean>;

  abstract expireSubscription(id: string): Promise<boolean>;

  abstract accountForNotification(
    notificationAccountingDto: NotificationAccountingDto,
  ): Promise<boolean>;
}
