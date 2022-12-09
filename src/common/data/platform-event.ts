import { PlatformEvents } from "./platform-events.enum";

export class PlatformEvent {
    constructor(rid: string, eid: PlatformEvents, data: any = null) {
        this._rid = rid;
        this._eid = eid;
        this.data = data;
    }
    _rid: string;
    _eid: PlatformEvents;
    data: any;
}