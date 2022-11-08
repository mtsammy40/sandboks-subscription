export class PlatformEvent {
    constructor(rid: string, eid: string, data: any = null) {
        this._rid = rid;
        this._eid = eid;
        this.data = data;
    }
    _rid: string;
    _eid: string;
    data: any;
}