import { Injectable } from '@nestjs/common';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plan } from './entities/plan.entity';
import { Repository } from 'typeorm';
import { Client, ClientKafka } from '@nestjs/microservices';
import { microserviceConfig } from '../microservice.config';
import { Subscription } from '../subscription/entities/subscription.entity';
import { ApplicationException } from '../commons/exceptions/application.exception';
import { ErrorCode } from '../commons/exceptions/error.code';

@Injectable()
export class PlanService {
  @Client(microserviceConfig) client: ClientKafka;

  constructor(
    @InjectRepository(Plan)
    private readonly planRepository: Repository<Plan>,
  ) {}

  create(createPlanDto: CreatePlanDto) {
    return 'This action adds a new plan';
  }

  findAll() {
    return `This action returns all plan`;
  }

  async findOne(id: string): Promise<Plan> {
    const plan = await this.planRepository.findOneBy({ id });
    if (!plan) {
      throw ApplicationException.simpleException(
        ErrorCode.INVALID_INPUT,
        'Plan not found',
      );
    }
    return plan;
  }

  update(id: string, updatePlanDto: UpdatePlanDto) {
    return `This action updates a #${id} plan`;
  }

  remove(id: string) {
    return `This action removes a #${id} plan`;
  }
}
