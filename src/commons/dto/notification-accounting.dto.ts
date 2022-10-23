import { NotificationType } from '../data/notification-type.enum';

export class NotificationAccountingDto {
  userId: string;
  type: NotificationType;
  notification: any;
}
