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
    // this._socket.connectToServer();
    this.cardValues =  {'BI' : null, 'BJ': null, 'BK' : null, 'OP' : null};

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
