import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PlanService } from './plan.service';
import { CreatePlanDto } from './dto/create-plan.dto';
import { UpdatePlanDto } from './dto/update-plan.dto';

@Controller()
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @MessagePattern('createPlan')
  create(@Payload() createPlanDto: CreatePlanDto) {
    return this.planService.create(createPlanDto);
  }

  @MessagePattern('findAllPlan')
  findAll() {
    return this.planService.findAll();
  }

  @MessagePattern('findOnePlan')
  findOne(@Payload() id: number) {
    return undefined;
  }

  @MessagePattern('updatePlan')
  update(@Payload() updatePlanDto: UpdatePlanDto) {
    return undefined;
  }

  @MessagePattern('removePlan')
  remove(@Payload() id: number) {
    return undefined;
  }
}
