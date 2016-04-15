/**
 * Created by subi on 2016. 4. 5..
 */
export default class Yeoga {
    constructor (id,userUid, date){
        this.id = id;
        this.userUid = userUid;
        this.date = date;
    }

    static fromJSON(obj) {
        return new this(obj);
    }

}