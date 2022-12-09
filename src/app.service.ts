import { Injectable } from '@nestjs/common';
import { PlatformEvent } from './common/data/platform-event';
import { EventsProvider } from './common/events/events-provider';

@Injectable()
export class AppService {
  constructor(private readonly eventsProvider: EventsProvider){}

  async publish(platformEvent: PlatformEvent): Promise<void> {
    await this.eventsProvider.publishToEventsPipe(platformEvent)
  }
}
