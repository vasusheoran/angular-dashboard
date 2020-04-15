import { Component, OnInit } from '@angular/core';
import { IListing } from 'src/app/shared/models/listing';
import { ListingResponse } from 'src/app/shared/models/listing-response';
import { WebSocketsService } from 'src/app/shared/services/web-sockets.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  listing:any;
  cardValues:any;
  isBuyEnabled:boolean = false;
  isSupportEnabled:boolean = false;
  isSellEnabled:boolean = false;
  isOpenEnabled:boolean = false;

  constructor(private _socket : WebSocketsService,
    private _shared : SharedService) { 
    this._socket.connectToServer();
    this.cardValues =  {'BI' : null, 'BJ': null, 'BK' : null, 'OP' : null};

  }

  subscribeSockets(){
    // this._socket.addMesage({
    //     "CP": 9000.0,
    //     "Date": new Date().toString(),
    //     "HP": 9000.0,
    //     "LP": 9000.0,
    //     "OP": 10000.0,
    //     "bi": 9050.026182280755,
    //     "bj": 6576.356671327663,
    //     "bk": 8030.542668531065,
    //     "frozen_values": {
    //         "CP": 100,
    //         "Date": "Tue, 14 Apr 2020 21:14:07 GMT",
    //         "HP": 10,
    //         "LP": 100,
    //         "bi": 5122.170674124261,
    //         "status": "Success"
    //     },
    //     "index": "nifty_50",
    //     "reset_freeze_value": false,
    //     "status": "Success",
    //     "u": 9005.142494430742
    // });
  }

  ngOnInit(): void { 
    this._shared.resetListing(resp => {
        if (resp){
            this.listing = null;
            // this.cardValues = {'BI' : null, 'BJ': null, 'BK' : null, 'OP' : null};
        }
    }); 
  }  

  setSelectedListing(event){
    this.listing = event;
  }

  setUpdatedCardValues(event){
    this.cardValues = event;
  }

}
