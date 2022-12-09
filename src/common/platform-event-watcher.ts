import { filter, map, Subscription, tap } from "rxjs";
import { PlatformEvents } from "./data/platform-events.enum";
import { EventsProvider } from "./events/events-provider";


export function PlatformEventWatcher<T extends {
    new(...args: any[]): {}
}>(clazz: T) {
    var theClass = class extends clazz {
        constructor(...args: any[]) {
            super(...args);
            let eventsProvider: EventsProvider = args
                .find(arg => arg instanceof EventsProvider);
            let declaredEvents = getAllDeclaredEvents(this);
            if(eventsProvider) {
                eventsProvider.subscribe()
                .pipe(
                filter(_event => {
                    if(_event) {
                        return declaredEvents.some(_e => _e === _event._eid)
                    }
                    return false;
                    }))
                .subscribe(_e => {
                    let methodNames = getAllMethodsForEvent(this, _e._eid);
                    console.log('methodNames -> ', methodNames, _e.data);
                    methodNames.forEach(_methodName => {
                        this[_methodName].call(this, _e.data, _e._rid);
                    });
                });
            } else {
                throw new Error('Events provider is null')
            }
        }
    };
    return theClass;
}

const getAllDeclaredEvents = (obj) => {
    const values: PlatformEvents[] = obj.mapping.map((mp: any) => mp.value);
    return values;
}

const getAllMethodsForEvent = (obj, event) => {
   return obj.mapping.filter(_mapping => _mapping.value === event).map(_mapping => _mapping.key)
}

const getAllMethods = (obj: any) => {
    let props = []

    do {
        const l = Object.getOwnPropertyNames(obj)
            .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
            .sort()
            .filter((p, i, arr) =>
                typeof obj[p] === 'function' &&  //only the methods
                p !== 'constructor' &&           //not the constructor
                (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                props.indexOf(p) === -1          //not overridden in a child
            )
        props = props.concat(l)
    }
    while (
        (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
        Object.getPrototypeOf(obj)              //not the the Object prototype methods (hasOwnProperty, etc...)
    )

    return props
}

const viewMethods = (obj: any) => {
    let props = []
    let descriptors = [];

    do {
        const l = Object.getOwnPropertyNames(obj)
            .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
            .sort()
            .filter((p, i, arr) => {
                // console.log(`here ${p} is a ${typeof obj[p]}`);
                
                return typeof obj[p] === 'function' &&  //only the methods
                    p !== 'constructor' &&           //not the constructor
                    (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                    props.indexOf(p) === -1          //not overridden in a child
            }
            )

            const m = Object.getOwnPropertyNames(obj)
            .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
            .sort()
            .filter((p, i, arr) => {
                // console.log(`here ${p} is a ${typeof obj[p]}`);
                
                return typeof obj[p] === 'function' &&  //only the methods
                    p !== 'constructor' &&           //not the constructor
                    (i == 0 || p !== arr[i - 1]) &&  //not overriding in this prototype
                    props.indexOf(p) === -1          //not overridden in a child
            }
            )
            .map(methodName => obj[methodName]);
        props = props.concat(l)
        descriptors = descriptors.concat(m)
    }
    while (
        (obj = Object.getPrototypeOf(obj)) &&   //walk-up the prototype chain
        Object.getPrototypeOf(obj)              //not the the Object prototype methods (hasOwnProperty, etc...)
    )

    return descriptors
}