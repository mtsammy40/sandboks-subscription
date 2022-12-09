import { Column } from 'typeorm';

export abstract class BaseEntity {
  @Column({ name: 'created_at', nullable: false })
  createdAt: Date;

  @Column({ name: 'updated_at', nullable: false })
  updatedAt: Date;
}
