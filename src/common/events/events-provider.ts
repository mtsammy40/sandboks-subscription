import { Injectable } from '@nestjs/common';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { PlatformEvent } from '../data/platform-event';
import { PlatformEvents } from '../data/platform-events.enum';

@Injectable()
export class EventsProvider {
private eventsPipe$: BehaviorSubject<PlatformEvent> = new BehaviorSubject<PlatformEvent>(null);

 async publishToEventsPipe(platformEvent: PlatformEvent): Promise<void> {
  this.eventsPipe$.next(platformEvent);
 }

 subscribe(event?: PlatformEvents): Observable<PlatformEvent> {
  if(event) {
    return this.eventsPipe$.pipe(filter((_platformEvent) => _platformEvent._eid === event))
  } else {
    return this.eventsPipe$.pipe();
  }
 }
}
