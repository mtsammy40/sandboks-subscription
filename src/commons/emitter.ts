import { ClientKafka } from "@nestjs/microservices";
import { tap } from "rxjs";
import { Subscription } from "src/subscription/entities/subscription.entity";
import { PlatformBus } from "./data/platform-bus.enum";
import { PlatformEvent } from "./data/platform-event";
import { PlatformEvents } from "./data/platform-events.enum";
import { ApplicationException } from "./exceptions/application.exception";

export function AppEventProcessor(onReturn: PlatformEvents, onError: PlatformEvents) {
    return (target: any, key: string, descriptor: any) => {
        var originalMethod = descriptor.value;
        
        descriptor.value = async function (...args: any[]) {
            let client: ClientKafka = this.client; 
            let rid = args[1];

            try {
                let returnValue = await originalMethod.apply(this, args);
                let envelope = new PlatformEvent(rid, onReturn, returnValue);
                client.emit<Subscription>(
                    PlatformBus.APP,
                    JSON.stringify(envelope),
                ).pipe(tap(eventSub => console.log('Sending response...')));
                return returnValue;
            } catch (e: any) {
                if (e instanceof ApplicationException) {
                   
                } else {
                    e = ApplicationException.generalException("Unknown Error");
                }
                console.log('Error ', JSON.stringify(e));
                
                let envelope = new PlatformEvent(rid, onError, e.error);
                client.emit<Subscription>(
                    PlatformBus.APP,
                    JSON.stringify(envelope),
                ).pipe(tap(eventSub => console.log('Sending error response...')));
                throw e;
            }
        }

        return descriptor;
    }
}