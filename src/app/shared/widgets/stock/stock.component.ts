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

        this._config.fetchIndexIfSet().subscribe((resp) => {
            if(resp['status'] == 'Success'){
                this._snack.open('Rendering chart. Please wait ...');
                var listing:IListing = resp['listing'];
                this._shared.nextListing(listing);

                let realTimeData:Array<IListingResponse> = resp['data'];
                let historicalData:Array<HistoricalResponse> = resp['historical_data'];

                this._stockHelper.initChart(realTimeData, historicalData, listing.CompanyName);
                
                // var options = this._stockHelper.getChartOptions();
                // this._chart = Highcharts.stockChart('canvas', options);
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
                var currentData = this._stockHelper.getCurrentValues();
                if(currentData)
                    this.updatedValueForCards.emit({'BI' : currentData['bi'], 'BJ': currentData['bj'], 'BK' : currentData['bk'], 'OP' : currentData['CP'], 'CP' : currentData['CP']});
            }
        });
    }

    emitUpdatedCardValues(currentData){
        this.updatedValueForCards.emit({'BI' : currentData['bi'], 'BJ': currentData['bj'], 'BK' : currentData['bk'], 'OP' : currentData['CP'], 'CP' : currentData['CP']});
    }

    ngOnDestroy(): void {
        this._stockHelper.destroyChart();
    }

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

        if (changes['listing'] && changes.listing.currentValue && changes.listing.currentValue['YahooSymbol'] !=null ) {

            if (this._stockHelper.isSet()) {
                this._stockHelper.destroyChart();
            }
            this._config.setListing(changes.listing.currentValue).subscribe(resp => {
                this._snack.open('Rendering chart. Please wait ...');
                let realTimeData:Array<IListingResponse> = resp['data'];
                let historicalData:Array<HistoricalResponse> = resp['historical_data'];
                this._stockHelper.initChart(realTimeData, historicalData,  changes.listing.currentValue.CompanyName);
            },(err) =>{
                this._snack.open('Error. Unbable to fetch data.');
            });
        }

        if(changes['buy'] && !changes.buy.isFirstChange()){
            this._stockHelper.toggleClickableFields("buy");
            this._snack.open('Please wait .. ');
        }

        if(changes['sell'] && !changes.sell.isFirstChange()){
            this._stockHelper.toggleClickableFields("sell");
            this._snack.open('Please wait .. ');
        }

        if(changes['support'] && !changes.support.isFirstChange()){
            this._stockHelper.toggleClickableFields("support");
            this._snack.open('Please wait .. ');
        }

        if(changes['open'] && !changes.open.isFirstChange()){
            this._stockHelper.toggleClickableFields("open");
            this._snack.open('Please wait .. ');
        }

    }

}
