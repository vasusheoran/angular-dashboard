import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChange, Output } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import HC_exporting from 'highcharts/modules/exporting';
import { IListing } from '../../models/listing';
import { ConfigService } from '../../services/config.service';
import { ListingResponse } from '../../models/listing-response';

@Component({
    selector: 'app-widget-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnChanges {

    @Output() updatedValueForCards:EventEmitter<any> = new EventEmitter();
    @Input() listing: EventEmitter<IListing> = new EventEmitter();

    _chart: Highcharts.Chart;

    _plotLines:{bi:{enabled:boolean, value:number},bk:{enabled:boolean, value:number},bj:{enabled:boolean, value:number}};
    
    chartOptions: {};
    Highcharts: typeof Highcharts = Highcharts;
    interval: any;

    constructor(private _config:ConfigService) {        
        this._plotLines = {bi:{enabled:true, value:0},bk:{enabled:false, value:0},bj:{enabled:false, value:0}};
    }

    ngOnInit(): void { }

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

        if (changes.listing.currentValue != null && changes.listing.currentValue['YahooSymbol'] !=null ) {

            if (this._chart) {
                if (this.interval != null)
                    clearInterval(this.interval)
                this._chart.destroy();
            }
            this._config.setListing(changes.listing.currentValue).subscribe(resp => {
                let realTimeData:Array<ListingResponse> = resp['data'];
                this.initChart(this.parseData(realTimeData), changes.listing.currentValue);
            },(err) =>{
                console.error(err)
            });
        }

    }

    parseData(realTimeData: ListingResponse[]): any[] {
        realTimeData = realTimeData.filter(
            (thing, i, arr) => arr.findIndex(t => t.Date === thing.Date) === i
        );

        let data = [];
        realTimeData.forEach(element => {
            if(element.CP && element.Date){
                data.push([
                    new Date(element.Date).valueOf(),
                    element.CP
                ]);
            }
        });

        if(data.length==0){
            data.push([
                new Date().valueOf(),
                0
            ]);
        }

        this.updateCardsData(data[data.length-1]);
        return data;
    }

    updateCardsData(data){
        this.updatedValueForCards.emit({'BI' : data['bi'], 'BJ': data['bj'], 'BK' : data['bk'], 'OP' : data['OP'], 'CP' : data['CP']})
    }

    updateData(){

        this._config.fetchValues().subscribe((resp:ListingResponse) => {
            if(resp == null){
                clearInterval(this.interval);
                console.log("Server Busy. PLease try again after some time.")
            }

            var x;
            if(resp.Date == null || resp.Date == undefined){
                x = new Date().valueOf();
            }else{
                x = new Date(resp.Date).valueOf()
            }

            this._chart.series[0].addPoint([x, resp.CP], true, false);
            this.updateCardsData(resp);

            //TODO : Pending plot lines
            this.updatePlotLine(resp);
        });

    }

    updatePlotLine(resp: ListingResponse) {
        if(this._plotLines.bi.enabled){
            this._chart.yAxis
        }else{

        }
        if(this._plotLines.bj.enabled){
            
        }else{

        }
        if(this._plotLines.bk.enabled){
            
        }else{

        }
    }

    setScheduleForUpdatingChart(){
        let i = 2000;
        this.interval = setInterval(() => {
          this.updateData();
        }, i);
    }


    initChart(realTimeData=[], name:IListing) {
        this.chartOptions = {
            time: {
                useUTC: false
            },
            tooltip:{
                formatter: function() {
                    return '<b>' +  this.points[0].series.name+ ' : </b> ' +  Highcharts.numberFormat(this.y, 0);
                },
                shared: true
            },

            rangeSelector: {
                buttons: [{
                    count: 1,
                    type: 'minute',
                    text: '1M'
                }, {
                    count: 5,
                    type: 'minute',
                    text: '5M'
                },{
                    count: 60,
                    type: 'minute',
                    text: '1H'
                },{
                    count: 420,
                    type: 'minute',
                    text: '7H'
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false,
                selected: 0
            },

            title: {
                text: name.CompanyName
            },

            exporting: {
                enabled: false
            },

            // yAxis: {
            //     plotLines: [{
            //         color: 'red', // Color value
            //         dashStyle: 'longdashdot', // Style of the plot line. Default to solid
            //         value: 50, // Value of where the line will appear
            //         width: 1 // Width of the line    
            //     }]
            // },

            series: [{
                name: 'Close Price',
                data: Object.assign([], realTimeData)
            }]
        }
        this._chart = Highcharts.stockChart('canvas', this.chartOptions);

        // setTimeout(() => {
        //     window.dispatchEvent(
        //         new Event('resize')
        //     );
        // }, 300);

        this.setScheduleForUpdatingChart();

    }

}
