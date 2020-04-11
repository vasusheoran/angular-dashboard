import { FrozenValues } from './frozen-values';

export interface ListingResponse {
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
}