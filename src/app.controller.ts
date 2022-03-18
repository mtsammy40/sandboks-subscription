import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { PlatformEvents } from './commons/data/platform-events.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
