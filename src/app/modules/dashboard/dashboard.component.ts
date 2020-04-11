import { Component, OnInit } from '@angular/core';
import { Listing } from 'src/app/shared/models/listing';
import { ListingResponse } from 'src/app/shared/models/listing-response';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  listing:any;
  cardValues:any;

  constructor() { 
    this.cardValues =  {'BI' : null, 'BJ': null, 'BK' : null, 'OP' : null};
   }

  ngOnInit(): void {
  }  

  setSelectedListing(event){
    this.listing = event;
  }

  setUpdatedCardValues(event){
    this.cardValues = event;
  }

}
