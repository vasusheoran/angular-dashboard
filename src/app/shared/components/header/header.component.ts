import { Component, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { Listing, IListing } from '../../models/listing';
import { ConfigService } from '../../services/config.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() toggleSideBarOutput: EventEmitter<any> = new EventEmitter();

  currentUrl:string;
  currentListing:Listing;

  constructor(private _router : Router,
    private _shared : SharedService,
    private _config : ConfigService,
    private _snack : MatSnackBar) {
      this.currentListing = null;
      this._shared.sharedListing.subscribe(res => {
        this.currentListing = new Listing(res);
      })
  }

  ngOnInit(): void { 
    this._router.events.subscribe((val:NavigationStart) => {
      this.currentUrl = this._router.url;  
    });  
  }

  toggleSideBar(){
    this.toggleSideBarOutput.emit(null);
  }

  resetIndex(){

    // this._shared.resetListing(true);
    if(this.currentListing.YahooSymbol){
      this._config.setListing(this.currentListing, true).subscribe(resp => {
        this._shared.resetListing(true);
        this._snack.open('Select the listing again for new data.');
      },(err) =>{
        this._snack.open('Error resetting listing.');
        this._router.navigate(['/']);
      });
    }else{
      this._snack.open('Please set the index first.');
      this._router.navigate(['/']);
    }
  }

}
