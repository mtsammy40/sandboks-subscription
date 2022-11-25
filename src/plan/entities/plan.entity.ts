import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../commons/data/base-entity';

export enum Status {
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED'
}

export interface PlanConfiguration {
  price: number;
  email: ChannelConfiguration;
  sms: ChannelConfiguration;
  push: ChannelConfiguration;
}

export interface ChannelConfiguration {
  isEnabled: boolean;
  maxAllowed: number;
}

@Entity('plans')
export class Plan extends BaseEntity {
  @Column({ primary: true, generated: 'uuid' })
  id: string;

  @Column({ nullable: false })
  status: Status;

  @Column({ nullable: false, type: 'jsonb' })
  configuration: PlanConfiguration;

  @Column({ nullable: true, type: 'boolean' })
  isDefault: boolean;

}
