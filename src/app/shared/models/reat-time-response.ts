export interface IRealTimeDataResponse {
    _source :{
        CP:            number;
        Date:          Date;
    }
}

export class RealTimeDataResponse {
    CP:            number;
    Date:          Date;

    constructor(data){
        this.CP = data['_source']['CP']
        this.Date = data['_source']['Date']
    }
}