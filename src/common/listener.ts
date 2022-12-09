import { PlatformEvents } from "./data/platform-events.enum";

export function PlatformEventListener (platformEvent: PlatformEvents) {

    return (target: any, key: string, descriptor: PropertyDescriptor) => {
        let mapping: {key: string, value: PlatformEvents}[] = target.mapping;
        if(!mapping) {
            mapping = [];
        };
        console.log('mapping ', mapping);
        
        mapping.push({key, value: platformEvent })
        target.mapping = mapping;
        var originalMethod = descriptor.value;
        descriptor.value = function(...args) {
            return originalMethod.apply(this, args);
        }
    }
}