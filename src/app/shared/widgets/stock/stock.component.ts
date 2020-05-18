import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChange, Output, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import HC_exporting from 'highcharts/modules/exporting';
import { IListing } from '../../models/listing';
import { ConfigService } from '../../services/config.service';
import { IUpdateResponse, UpdateResponse } from '../../models/listing-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService, ListingResponse } from '../../services/shared.service';
import { CountdownTimerService } from '../../services/countdown-timer.service';
import { WebSocketsService } from '../../services/web-sockets.service';
import { StockService } from 'src/app/share/widgets/stock/stock.service';
import { IRealTimeDataResponse } from '../../models/reat-time-response';
import * as moment from 'moment';

export interface HistoricalResponse{
    CP:number;
    HP:number;
    LP:number;
    date:Date;
}

@Component({
    selector: 'app-widget-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnDestroy {

    cors:string;

    checkCORS(){
        // this.cors = "http://" + this.cors;
        this._config.checkCORS(this.cors).subscribe(resp => {
            console.log(resp);
        });
    }

    addDemoPoint(){
        var cp = 9800 + Math.floor(Math.random() * 101);
        var date = moment(). format("M:D:YYYY H:mm:ss");
        // this._stockHelper.addPoint({
        //     "CP": cp,
        //     "Date": date,
        //     "HP": "9889.05",
        //     "LP": "9731.5",
        //     "bi": 9724.632157821665,
        //     "bj": 9786.28884863854,
        //     "bk": 9847.945539455415
        // });
    }

    @Output() updatedValueForCards:EventEmitter<any> = new EventEmitter();
    
    _chart;
    currentValues:ListingResponse;
    listing;
    // @Input() buy:boolean;
    // @Input() support:boolean;
    // @Input() sell:boolean;
    // @Input() open:boolean;

    isReload:boolean = false;

    constructor(private _config:ConfigService,
        private _snack : MatSnackBar,
        private _shared : SharedService,
        private _socket : WebSocketsService,
        private _stockHelper : StockService ) { }

    ngOnInit(): void {         
        this._shared.resetListing(resp => {
            if (resp){
                this._stockHelper.destroyChart();
            }
        });
        this._socket.listen('updateui').subscribe((resp) =>{
            // this.options.fn._shared.ne
            this._stockHelper.addPoint(resp['stocks'], resp['dashboard']['cards']);
            this.updatedValueForCards.emit(resp['dashboard']);
        });

        // Subscribe to refresh
        this._config.fetchIndexIfSet().subscribe(resp => {
            this.listing = resp['chart']['listing'];
            this._stockHelper.setRealTimeData(resp['chart'], resp['data']['dashboard']['cards']); 
            this._shared.nextUpdateResponse(resp['data']['dashboard']);
        }, (err) => {            
            this._snack.open('Please set a Listing to view chart.');
            // this._stockHelper.enableLoading('Please set a Listing to view chart.');
        });

        // Subscribe to 
        this._shared.sharedListing.subscribe(resp => {
            if(typeof resp != 'function'){
                this.listing = resp;
                this._config.setListing(resp).subscribe(resp => {
                this._stockHelper.setRealTimeData(resp['chart'], resp['data']['dashboard']['cards']); 
                this._shared.nextUpdateResponse(resp['data']['dashboard']);
                },(err) =>{
                    this._snack.open('Unbable to fetch data. Please set a Listing to view chart.');
                });
            } 
         },(err) =>{
             this._snack.open('Error. Unbable to fetch data.');
         });
    }
    
    ngOnDestroy(): void {
        this._stockHelper.destroyChart();
    }

}
