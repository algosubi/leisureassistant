/**
 * Created by subi on 2016. 4. 5..
 */
export default class Request {
    constructor(id, userUid, date, address, wantYeoga, type) {
        this.id = id;
        this.userUid = userUid;
        this.date = date;
        this.address = address;
        this.wantYeoga = wantYeoga;
        this.type = type;
    }

    static fromJSON(obj) {
        return new this(obj);
    }

}