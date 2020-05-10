import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChange, Output, OnDestroy } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import HC_exporting from 'highcharts/modules/exporting';
import { IListing } from '../../models/listing';
import { ConfigService } from '../../services/config.service';
import { IListingResponse, ListingResponse } from '../../models/listing-response';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedService } from '../../services/shared.service';
import { CountdownTimerService } from '../../services/countdown-timer.service';
import { WebSocketsService } from '../../services/web-sockets.service';
import { StockService } from 'src/app/share/widgets/stock/stock.service';
import { IRealTimeDataResponse } from '../../models/reat-time-response';

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
export class StockComponent implements OnInit, OnChanges, OnDestroy {

    cors:string;

    checkCORS(){
        // this.cors = "http://" + this.cors;
        this._config.checkCORS(this.cors).subscribe(resp => {
            console.log(resp);
        });
    }

    addDemoPoint(){
        var cp = 9800 + Math.floor(Math.random() * 101);
        this._stockHelper.addPoint({
            "BX": 9826.94698018356,
            "CP": cp,
            "Date": null,
            "HP": "9889.05",
            "LP": "9731.5",
            "OP": "9753.5",
            "ae": 9445.404689715057,
            "af": 9726.005726257332,
            "ai": 9720.511452514664,
            "bi": 9724.632157821665,
            "bj": 9786.28884863854,
            "bk": 9847.945539455415,
            "cj": 9410.761790324128,
            "frozen_values": {
                "bi": 9724.632157821665
            },
            "index": "Nifty 50",
            "q": 9951.153019816438,
            "reset_freeze_value": false,
            "status": "Success",
            "u": 9398.038990925872
        });
    }

    @Output() updatedValueForCards:EventEmitter<any> = new EventEmitter();
    
    _chart;
    @Input() listing:IListing;
    @Input() buy:boolean;
    @Input() support:boolean;
    @Input() sell:boolean;
    @Input() open:boolean;

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
        this._snack.open('Rendering chart. Please wait ...');

        this._config.fetchIndexIfSet().subscribe((resp) => {
            if(resp['status'] == 'Success'){
                var listing:IListing = resp['listing'];
                this._shared.nextListing(listing);

                let realTimeData:Array<IRealTimeDataResponse> = resp['data'];
                let historicalData:Array<HistoricalResponse> = resp['historical_data'];

                this._stockHelper.initChart(realTimeData, historicalData, listing.CompanyName);

                this.emitUpdatedCardValues()
            }else{
                this._snack.open('Please set a Listing to view chart.');
            }
        });

            
        this._socket.subsribeForUpdates().subscribe(res =>{
            var resp:ListingResponse = new ListingResponse(res);
            if (resp.CP){
                if(!this._stockHelper.addPoint(res)){
                    this._snack.open("Please set the listing. Updates from server have started.")
                };
                
                this.emitUpdatedCardValues()
            }
        });
    }

    emitUpdatedCardValues(){
        var currentData =  this._stockHelper.getCurrentValues()
        this.updatedValueForCards.emit({'BI' : currentData['bi'], 'BJ': currentData['bj'], 'BK' : currentData['bk'],
        'CP' : currentData['CP'], 'HP' : currentData['HP'], 'LP' : currentData['LP'], 'Date' : currentData['Date']});
    }
    
    ngOnDestroy(): void {
        this._stockHelper.destroyChart();
    }

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

        if (changes['listing'] && changes.listing.currentValue && changes.listing.currentValue['YahooSymbol'] !=null ) {

            this._snack.open('Rendering chart. Please wait ...');
            if (this._stockHelper.isSet()) {
                this._stockHelper.destroyChart();
            }
            this._config.setListing(changes.listing.currentValue).subscribe(resp => {
                let realTimeData:Array<IListingResponse> = resp['data'];
                let historicalData:Array<HistoricalResponse> = resp['historical_data'];
                this._stockHelper.initChart(realTimeData, historicalData,  changes.listing.currentValue.CompanyName);
                
                this.emitUpdatedCardValues()
            },(err) =>{
                this._snack.open('Error. Unbable to fetch data.');
            });
        }

        if(changes['buy'] && !changes.buy.isFirstChange()){
            this._stockHelper.toggleClickableFields("buy");
            // this._snack.open('Please wait .. ');
        }

        if(changes['sell'] && !changes.sell.isFirstChange()){
            this._stockHelper.toggleClickableFields("sell");
            // this._snack.open('Please wait .. ');
        }

        if(changes['support'] && !changes.support.isFirstChange()){
            this._stockHelper.toggleClickableFields("support");
            // this._snack.open('Please wait .. ');
        }

        if(changes['update'] && !changes.open.isFirstChange()){
            this._stockHelper.toggleClickableFields("update");
            // this._snack.open('Please wait .. ');
        }

    }

}
