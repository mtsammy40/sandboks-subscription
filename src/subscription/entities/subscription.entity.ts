import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../common/data/base-entity';

export enum Status {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  EXPIRED = 'EXPIRED',
}

export interface SubscriptionCounter {
  email: number;
  sms: number;
  push: number;
}

@Entity('subscriptions')
export class Subscription extends BaseEntity {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column({ name: 'user_id', nullable: false, type: 'uuid' })
  userId: string;

  @Column({ name: 'plan_id', nullable: false, type: 'uuid' })
  planId: string;

  @Column({ nullable: false })
  status: Status;

  @Column({ nullable: false, type: 'jsonb' })
  counter: SubscriptionCounter;

  static create(userId: string, planId: string): Subscription {
    const subscription = new Subscription();
    subscription.userId = userId;
    subscription.planId = planId;
    subscription.status = Status.ACTIVE;
    subscription.counter = { email: 0, sms: 0, push: 0 };
    subscription.createdAt = new Date();
    subscription.updatedAt = new Date();
    return subscription;
  }
}
