import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { PlatformBus } from './common/data/platform-bus.enum';
import { PlatformEvent } from './common/data/platform-event';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @EventPattern(PlatformBus.APP)
  async listen(@Payload() event: any): Promise<void> {
    console.log('receiving...', event);
    this.appService.publish(event.value);
  }
}
