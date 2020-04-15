import { FrozenValues } from './frozen-values';

export interface IListingResponse {
    CP:            number;
    Date:          Date;
    HP:            number;
    LP:            number;
    OP:            number;
    bi:            number;
    bj:            number;
    bk:            number;
    frozen_values: FrozenValues;
    index:         string;
    reset:         boolean;
    u:             number;
    count:         string;
}

export class ListingResponse {
    CP:            number;
    Date:          Date;
    HP:            number;
    LP:            number;
    OP:            number;
    bi:            number;
    bj:            number;
    bk:            number;
    frozen_values: FrozenValues;
    index:         string;
    reset:         boolean;
    u:             number;
    count:         string;

    constructor(data){
        this.CP = data['CP']
        this.Date = data['Date']
        this.HP = data['HP']
        this.LP = data['LP']
        this.OP = data['OP']
        this.bi = data['bi']
        this.bj = data['bj']
        this.bk = data['bk']
        this.frozen_values = data['frozen_values']
        this.index = data['index']
        this.reset = data['reset']
        this.u = data['u']
        this.count = data['count']
    }
}