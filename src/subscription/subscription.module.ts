import { Module } from '@nestjs/common';
import { SubscriptionService } from './subscription.service';
import { SubscriptionController } from './subscription.controller';
import { PlanModule } from '../plan/plan.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subscription.entity';
import { PlanService } from '../plan/plan.service';
import { Plan } from '../plan/entities/plan.entity';
import { CommonModule } from 'src/common/common.module';

@Module({
  imports: [PlanModule, TypeOrmModule.forFeature([Subscription, Plan]), CommonModule],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, PlanService],
  exports: [PlanModule, TypeOrmModule],
})
export class SubscriptionModule {}
