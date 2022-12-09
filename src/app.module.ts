import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SubscriptionModule } from './subscription/subscription.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './subscription/entities/subscription.entity';
import { Plan } from './plan/entities/plan.entity';
import { CommonModule } from './common/common.module';

@Module({
  imports: [SubscriptionModule, TypeOrmModule.forRootAsync({
    useFactory: () => ({
      type: 'postgres',
      url: 'postgres://sdhhbldrgtnhtx:540dd1aeef5b556a6d27a40622e027683401d7de88a3a4fdfcfcfc8bc3b2ac0b@ec2-34-233-64-238.compute-1.amazonaws.com:5432/dd7vuikpovbot4',
      schema: 'subscription',
      synchronize: true,
      ssl: {
        rejectUnauthorized: false
      },
      entities: [Subscription, Plan]
    }),
  }), CommonModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
