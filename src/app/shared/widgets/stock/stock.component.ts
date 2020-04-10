import { Component, OnInit, Input, EventEmitter, OnChanges, SimpleChange } from '@angular/core';
import * as Highcharts from 'highcharts/highstock';

import HC_exporting from 'highcharts/modules/exporting';
import { Listing } from '../../models/listing';

@Component({
    selector: 'app-widget-stock',
    templateUrl: './stock.component.html',
    styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit, OnChanges {


    @Input() listing: EventEmitter<Listing> = new EventEmitter();

    _chart: Highcharts.Chart;
    chartOptions: {};
    Highcharts: typeof Highcharts = Highcharts;

    constructor() { }

    ngOnChanges(changes: import("@angular/core").SimpleChanges): void {

        console.log(changes.listing.currentValue);

        if (changes.listing.currentValue != null) {

            if (this._chart) {
                if (this._chart['interval'] != null)
                    clearInterval(this._chart['interval'])
                this._chart.destroy();
            }
            this.initChart();
        }
        // else{
        //     this.initChart()
        // }

    }

    initChart() {
        this.chartOptions = {
            chart: {
                events: {
                    type: 'selector',
                    load: function () {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        this.interval = setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = Math.round(Math.random() * 100);
                            series.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },

            time: {
                useUTC: false
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
                }, {
                    type: 'all',
                    text: 'All'
                }],
                inputEnabled: false,
                selected: 0
            },

            title: {
                text: 'Live random data'
            },

            exporting: {
                enabled: false
            },

            yAxis: {
                plotLines: [{
                    color: 'red', // Color value
                    dashStyle: 'longdashdot', // Style of the plot line. Default to solid
                    value: 50, // Value of where the line will appear
                    width: 2 // Width of the line    
                }]
            },

            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -999; i <= 0; i += 1) {
                        data.push([
                            time + i * 1000,
                            Math.round(Math.random() * 100)
                        ]);
                    }
                    return data;
                }())
            }]
        }
        this._chart = Highcharts.stockChart('canvas', this.chartOptions);

    }

    ngOnInit(): void {
    }

    data = [
        [
            1523367000000,
            173.25
        ],
        [
            1523453400000,
            172.44
        ],
        [
            1523539800000,
            174.14
        ],
        [
            1523626200000,
            174.73
        ],
        [
            1523885400000,
            175.82
        ],
        [
            1523971800000,
            178.24
        ],
        [
            1524058200000,
            177.84
        ],
        [
            1524144600000,
            172.8
        ],
        [
            1524231000000,
            165.72
        ],
        [
            1524490200000,
            165.24
        ],
        [
            1524576600000,
            162.94
        ],
        [
            1524663000000,
            163.65
        ],
        [
            1524749400000,
            164.22
        ],
        [
            1524835800000,
            162.32
        ],
        [
            1525095000000,
            165.26
        ],
        [
            1525181400000,
            169.1
        ],
        [
            1525267800000,
            176.57
        ],
        [
            1525354200000,
            176.89
        ],
        [
            1525440600000,
            183.83
        ],
        [
            1525699800000,
            185.16
        ],
        [
            1525786200000,
            186.05
        ],
        [
            1525872600000,
            187.36
        ],
        [
            1525959000000,
            190.04
        ],
        [
            1526045400000,
            188.59
        ],
        [
            1526304600000,
            188.15
        ],
        [
            1526391000000,
            186.44
        ],
        [
            1526477400000,
            188.18
        ],
        [
            1526563800000,
            186.99
        ],
        [
            1526650200000,
            186.31
        ],
        [
            1526909400000,
            187.63
        ],
        [
            1526995800000,
            187.16
        ],
        [
            1527082200000,
            188.36
        ],
        [
            1527168600000,
            188.15
        ],
        [
            1527255000000,
            188.58
        ],
        [
            1527600600000,
            187.9
        ],
        [
            1527687000000,
            187.5
        ],
        [
            1527773400000,
            186.87
        ],
        [
            1527859800000,
            190.24
        ],
        [
            1528119000000,
            191.83
        ],
        [
            1528205400000,
            193.31
        ],
        [
            1528291800000,
            193.98
        ],
        [
            1528378200000,
            193.46
        ],
        [
            1528464600000,
            191.7
        ],
        [
            1528723800000,
            191.23
        ],
        [
            1528810200000,
            192.28
        ],
        [
            1528896600000,
            190.7
        ],
        [
            1528983000000,
            190.8
        ],
        [
            1529069400000,
            188.84
        ],
        [
            1529328600000,
            188.74
        ],
        [
            1529415000000,
            185.69
        ],
        [
            1529501400000,
            186.5
        ],
        [
            1529587800000,
            185.46
        ],
        [
            1529674200000,
            184.92
        ],
        [
            1529933400000,
            182.17
        ],
        [
            1530019800000,
            184.43
        ],
        [
            1530106200000,
            184.16
        ],
        [
            1530192600000,
            185.5
        ],
        [
            1530279000000,
            185.11
        ],
        [
            1530538200000,
            187.18
        ],
        [
            1530624600000,
            183.92
        ],
        [
            1530797400000,
            185.4
        ],
        [
            1530883800000,
            187.97
        ],
        [
            1531143000000,
            190.58
        ],
        [
            1531229400000,
            190.35
        ],
        [
            1531315800000,
            187.88
        ],
        [
            1531402200000,
            191.03
        ],
        [
            1531488600000,
            191.33
        ],
        [
            1531747800000,
            190.91
        ],
        [
            1531834200000,
            191.45
        ],
        [
            1531920600000,
            190.4
        ],
        [
            1532007000000,
            191.88
        ],
        [
            1532093400000,
            191.44
        ],
        [
            1532352600000,
            191.61
        ],
        [
            1532439000000,
            193
        ],
        [
            1532525400000,
            194.82
        ],
        [
            1532611800000,
            194.21
        ],
        [
            1532698200000,
            190.98
        ],
        [
            1532957400000,
            189.91
        ],
        [
            1533043800000,
            190.29
        ],
        [
            1533130200000,
            201.5
        ],
        [
            1533216600000,
            207.39
        ],
        [
            1533303000000,
            207.99
        ],
        [
            1533562200000,
            209.07
        ],
        [
            1533648600000,
            207.11
        ],
        [
            1533735000000,
            207.25
        ],
        [
            1533821400000,
            208.88
        ],
        [
            1533907800000,
            207.53
        ],
        [
            1534167000000,
            208.87
        ],
        [
            1534253400000,
            209.75
        ],
        [
            1534339800000,
            210.24
        ],
        [
            1534426200000,
            213.32
        ],
        [
            1534512600000,
            217.58
        ],
        [
            1534771800000,
            215.46
        ],
        [
            1534858200000,
            215.04
        ],
        [
            1534944600000,
            215.05
        ],
        [
            1535031000000,
            215.49
        ],
        [
            1535117400000,
            216.16
        ],
        [
            1535376600000,
            217.94
        ],
        [
            1535463000000,
            219.7
        ],
        [
            1535549400000,
            222.98
        ],
        [
            1535635800000,
            225.03
        ],
        [
            1535722200000,
            227.63
        ],
        [
            1536067800000,
            228.36
        ],
        [
            1536154200000,
            226.87
        ],
        [
            1536240600000,
            223.1
        ],
        [
            1536327000000,
            221.3
        ],
        [
            1536586200000,
            218.33
        ],
        [
            1536672600000,
            223.85
        ],
        [
            1536759000000,
            221.07
        ],
        [
            1536845400000,
            226.41
        ],
        [
            1536931800000,
            223.84
        ],
        [
            1537191000000,
            217.88
        ],
        [
            1537277400000,
            218.24
        ],
        [
            1537363800000,
            218.37
        ],
        [
            1537450200000,
            220.03
        ],
        [
            1537536600000,
            217.66
        ],
        [
            1537795800000,
            220.79
        ],
        [
            1537882200000,
            222.19
        ],
        [
            1537968600000,
            220.42
        ],
        [
            1538055000000,
            224.95
        ],
        [
            1538141400000,
            225.74
        ],
        [
            1538400600000,
            227.26
        ],
        [
            1538487000000,
            229.28
        ],
        [
            1538573400000,
            232.07
        ],
        [
            1538659800000,
            227.99
        ],
        [
            1538746200000,
            224.29
        ],
        [
            1539005400000,
            223.77
        ],
        [
            1539091800000,
            226.87
        ],
        [
            1539178200000,
            216.36
        ],
        [
            1539264600000,
            214.45
        ],
        [
            1539351000000,
            222.11
        ],
        [
            1539610200000,
            217.36
        ],
        [
            1539696600000,
            222.15
        ],
        [
            1539783000000,
            221.19
        ],
        [
            1539869400000,
            216.02
        ],
        [
            1539955800000,
            219.31
        ],
        [
            1540215000000,
            220.65
        ],
        [
            1540301400000,
            222.73
        ],
        [
            1540387800000,
            215.09
        ],
        [
            1540474200000,
            219.8
        ],
        [
            1540560600000,
            216.3
        ],
        [
            1540819800000,
            212.24
        ],
        [
            1540906200000,
            213.3
        ],
        [
            1540992600000,
            218.86
        ],
        [
            1541079000000,
            222.22
        ],
        [
            1541165400000,
            207.48
        ],
        [
            1541428200000,
            201.59
        ],
        [
            1541514600000,
            203.77
        ],
        [
            1541601000000,
            209.95
        ],
        [
            1541687400000,
            208.49
        ],
        [
            1541773800000,
            204.47
        ],
        [
            1542033000000,
            194.17
        ],
        [
            1542119400000,
            192.23
        ],
        [
            1542205800000,
            186.8
        ],
        [
            1542292200000,
            191.41
        ],
        [
            1542378600000,
            193.53
        ],
        [
            1542637800000,
            185.86
        ],
        [
            1542724200000,
            176.98
        ],
        [
            1542810600000,
            176.78
        ],
        [
            1542983400000,
            172.29
        ],
        [
            1543242600000,
            174.62
        ],
        [
            1543329000000,
            174.24
        ],
        [
            1543415400000,
            180.94
        ],
        [
            1543501800000,
            179.55
        ],
        [
            1543588200000,
            178.58
        ],
        [
            1543847400000,
            184.82
        ],
        [
            1543933800000,
            176.69
        ],
        [
            1544106600000,
            174.72
        ],
        [
            1544193000000,
            168.49
        ],
        [
            1544452200000,
            169.6
        ],
        [
            1544538600000,
            168.63
        ],
        [
            1544625000000,
            169.1
        ],
        [
            1544711400000,
            170.95
        ],
        [
            1544797800000,
            165.48
        ],
        [
            1545057000000,
            163.94
        ],
        [
            1545143400000,
            166.07
        ],
        [
            1545229800000,
            160.89
        ],
        [
            1545316200000,
            156.83
        ],
        [
            1545402600000,
            150.73
        ],
        [
            1545661800000,
            146.83
        ],
        [
            1545834600000,
            157.17
        ],
        [
            1545921000000,
            156.15
        ],
        [
            1546007400000,
            156.23
        ],
        [
            1546266600000,
            157.74
        ],
        [
            1546439400000,
            157.92
        ],
        [
            1546525800000,
            142.19
        ],
        [
            1546612200000,
            148.26
        ],
        [
            1546871400000,
            147.93
        ],
        [
            1546957800000,
            150.75
        ],
        [
            1547044200000,
            153.31
        ],
        [
            1547130600000,
            153.8
        ],
        [
            1547217000000,
            152.29
        ],
        [
            1547476200000,
            150
        ],
        [
            1547562600000,
            153.07
        ],
        [
            1547649000000,
            154.94
        ],
        [
            1547735400000,
            155.86
        ],
        [
            1547821800000,
            156.82
        ],
        [
            1548167400000,
            153.3
        ],
        [
            1548253800000,
            153.92
        ],
        [
            1548340200000,
            152.7
        ],
        [
            1548426600000,
            157.76
        ],
        [
            1548685800000,
            156.3
        ],
        [
            1548772200000,
            154.68
        ],
        [
            1548858600000,
            165.25
        ],
        [
            1548945000000,
            166.44
        ],
        [
            1549031400000,
            166.52
        ],
        [
            1549290600000,
            171.25
        ],
        [
            1549377000000,
            174.18
        ],
        [
            1549463400000,
            174.24
        ],
        [
            1549549800000,
            170.94
        ],
        [
            1549636200000,
            170.41
        ],
        [
            1549895400000,
            169.43
        ],
        [
            1549981800000,
            170.89
        ],
        [
            1550068200000,
            170.18
        ],
        [
            1550154600000,
            170.8
        ],
        [
            1550241000000,
            170.42
        ],
        [
            1550586600000,
            170.93
        ],
        [
            1550673000000,
            172.03
        ],
        [
            1550759400000,
            171.06
        ],
        [
            1550845800000,
            172.97
        ],
        [
            1551105000000,
            174.23
        ],
        [
            1551191400000,
            174.33
        ],
        [
            1551277800000,
            174.87
        ],
        [
            1551364200000,
            173.15
        ],
        [
            1551450600000,
            174.97
        ],
        [
            1551709800000,
            175.85
        ],
        [
            1551796200000,
            175.53
        ],
        [
            1551882600000,
            174.52
        ],
        [
            1551969000000,
            172.5
        ],
        [
            1552055400000,
            172.91
        ],
        [
            1552311000000,
            178.9
        ],
        [
            1552397400000,
            180.91
        ],
        [
            1552483800000,
            181.71
        ],
        [
            1552570200000,
            183.73
        ],
        [
            1552656600000,
            186.12
        ],
        [
            1552915800000,
            188.02
        ],
        [
            1553002200000,
            186.53
        ],
        [
            1553088600000,
            188.16
        ],
        [
            1553175000000,
            195.09
        ],
        [
            1553261400000,
            191.05
        ],
        [
            1553520600000,
            188.74
        ],
        [
            1553607000000,
            186.79
        ],
        [
            1553693400000,
            188.47
        ],
        [
            1553779800000,
            188.72
        ],
        [
            1553866200000,
            189.95
        ],
        [
            1554125400000,
            191.24
        ],
        [
            1554211800000,
            194.02
        ],
        [
            1554298200000,
            195.35
        ],
        [
            1554384600000,
            195.69
        ],
        [
            1554471000000,
            197
        ],
        [
            1554730200000,
            200.1
        ],
        [
            1554816600000,
            199.5
        ],
        [
            1554903000000,
            200.62
        ],
        [
            1554989400000,
            198.95
        ],
        [
            1555075800000,
            198.87
        ],
        [
            1555335000000,
            199.23
        ],
        [
            1555421400000,
            199.25
        ],
        [
            1555507800000,
            203.13
        ],
        [
            1555594200000,
            203.86
        ],
        [
            1555939800000,
            204.53
        ],
        [
            1556026200000,
            207.48
        ],
        [
            1556112600000,
            207.16
        ],
    ]

}
