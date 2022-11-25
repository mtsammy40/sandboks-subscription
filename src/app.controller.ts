import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PlatformEvents } from './commons/data/platform-events.enum';
import { PlatformBus } from './commons/data/platform-bus.enum';
import { PlatformEvent } from './commons/data/platform-event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(PlatformBus.APP)
  async listen(@Payload() event: PlatformEvent, ): Promise<void>{
    this.appService.publishToEventsPipe(event);
  }
}
