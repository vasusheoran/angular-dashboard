import { Injectable, EventEmitter } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';
import { LoggerService } from 'src/app/shared/services/logger.service';
import { IListingResponse, ListingResponse } from 'src/app/shared/models/listing-response';
import { HistoricalResponse } from 'src/app/shared/widgets/stock/stock.component';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  _chart: Highcharts.Chart;
  chartOptions = {};
  currentData: IListingResponse;

 buy:boolean;
 support:boolean;
 sell:boolean;
 open:boolean;
 data: any[];

  constructor(private logger : LoggerService,
    private _snack : MatSnackBar,
    private _logger : LoggerService) { }

  toggleClickableFields(field){
    if(field === "buy"){
      this.buy = !this.buy 
      this._logger.logInfo("Field : " + field + " : " + this.buy);
    }else if(field === "sell"){
        this.sell = !this.sell 
        this._logger.logInfo("Field : " + field + " : " + this.sell);
    }else if(field === "support"){
        this.support = !this.support 
        this._logger.logInfo("Field : " + field + " : " + this.support);
    }else if(field === "open"){
      this.open = !this.open 
      this._logger.logInfo("Field : " + field + " : " + this.open);
    }
  }

  setChartOptions(data:any, seriesName?:string){        
    this.logger.logInfo("Setting log options to default.");
    this.chartOptions = {
        time: {
            useUTC: false
        },
        // tooltip:{
        //     formatter: function() {
        //         var series = '<b>' +  this.points[0].series.name+ ' : </b> ' + '<span>' + Highcharts.numberFormat(this.y, 2, ",");
        //         var date = '</span><br/><br/><span><b>Time :</b></span><span>' + moment().utc(this.x).format('LLL') + '</span>' ;
        //         return series + date;
        //     }
        // },

        rangeSelector: {
            buttons: [{
                type: 'all',
                text: 'All'
            },{
                count: 1,
                type: 'minute',
                text: '1M'
            },{
                count: 5,
                type: 'minute',
                text: '5M'
            },{
                count: 30,
                type: 'minute',
                text: '30M'
            },{
                count: 1,
                type: 'hour',
                text: '1H'
            }],
            selected: 1,
            inputEnabled: true
        },
        
        plotOptions: {
          series: {
              dataLabels: {
                  enabled: true,
                  formatter: function(){
                      if(this.series.data.length>0){
                        var isLast = false;
                        if(this.point.x === this.series.data[this.series.data.length -1].x && this.point.y === this.series.data[this.series.data.length -1].y) isLast = true;
                          return isLast ? this.y : '';
                      }else{
                        return '';
                      }
                  }
              }
          }
        },

        title: {
            text: seriesName
        },

        exporting: {
            enabled: false
        },

        yAxis: {
            formatter: function() {
                return '<b>' +  this.points[0].series.name+ ' : </b> ' +  Highcharts.numberFormat(this.y, 0);
            },
            lineWidth: 1,
            opposite: true,
            labels: {
                align: 'left',
                x: 5
            }
        },

        series: [{
            name: 'Close Price',
            data: Object.assign([], data)

        }]
    }
  }

  getCurrentValues(){
    return this.currentData;
  }

  getChartOptions(){
    return this.chartOptions;
  }

  getChartData(){
    return this.data;
  }

  initChart(realTimeData, historicalData, name:string) {
    //TODO: Event Message for listing
    this.data = this.parseData(realTimeData, historicalData)
    this.setChartOptions(this.data, name);
    this._chart = Highcharts.stockChart('canvas', this.chartOptions);
  }

  destroyChart(){
    this._chart = null;
    //TODO::
    // clearInterval(this.openInterval);
  }

  isSet(){
    if(this._chart)
      return true;
    else
      return false;
  }

  updateChart(options, redraw?:boolean){
    this._chart.update(options, redraw);
  }

  addPoint(val){
    var resp = new ListingResponse(val);
    if(this._chart && this._chart.series && this._chart.series[0]){
                    
      var x;
      if(resp.Date == null || resp.Date == undefined){
          x = new Date().valueOf();
      }else{
          // x = new Date(resp.Date).valueOf();
          x = moment(resp.Date, "M:D:YYYY H:mm:ss").valueOf();
      }

      this._chart.series[0].addPoint([x, resp.CP], true, true);

      this.updatePlotLine(resp);
      
      this.currentData = resp;
      return true;  
    }else{
      return false;
    }
  }

  updatePlotLine(resp) {
    var plotLineWidth = 2;
    if(this._chart){
        var plotLines = [];
        if(this.buy && this.currentData.bi != resp.bi){
            plotLines.push({color: '#74992e', value: this.currentData.bi, width: plotLineWidth }); //Green
        }if(this.sell && this.currentData.bk != resp.bk){
            plotLines.push({color: '#ff0000b8', value: this.currentData.bk, width: plotLineWidth }); // Red
        }if(this.support && this.currentData.bj != resp.bj){
            plotLines.push({color: '#0000ff7a', value: this.currentData.bj, width: plotLineWidth }); //Voilet
        }if(this.open && this.currentData.OP != resp.OP){
            plotLines.push({color: '#554e2bbf', value: this.currentData.OP, width: plotLineWidth }) // Custom
        }

        // if(plotLines.length >0){
          this._logger.logInfo("Updating plot lines.");
          this._chart.update({yAxis: { plotLines: plotLines }}, true);
        // }
    }
  }

  

  parseData(realTimeData: IListingResponse[], historicalData:HistoricalResponse[]): any[] {
    realTimeData = realTimeData.filter(
        (thing, i, arr) => arr.findIndex(t => t.Date === thing.Date) === i
    );
    historicalData = historicalData.filter(
        (thing, i, arr) => arr.findIndex(t => t.date === thing.date) === i
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

    
    historicalData.forEach(element => {
        if(element.CP && element.date){
            data.push([
                new Date(element.date).valueOf(),
                element.CP
            ]);
        }
    });

    data.sort((a, b) => {
        return a[0] - b[0];

    });

    return data;
  }

}
