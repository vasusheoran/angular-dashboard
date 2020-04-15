import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output,  } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {IListing, Listing} from 'src/app/shared/models/listing';
import { ConfigService } from '../../services/config.service';
import { SharedService } from '../../services/shared.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-widget-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Output() selectedListing:EventEmitter<any> = new EventEmitter();

  
  myControl = new FormControl();

  options: IListing[] = [
    {CompanyName: 'Nifty 50', listing:'asdf', Series : 'Series', SASSymbol : 'nifty_50', YahooSymbol : '^nsei'}
  ];
  filteredOptions: Observable<IListing[]>;

  constructor(private _config: ConfigService, 
    private _shared : SharedService,
    private _snack : MatSnackBar){ }

  ngOnInit() {
    this._config.fetchListings().subscribe((resp:Array<IListing>) =>{
      this.options = resp;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => typeof value === 'string' ? value : value.CompanyName),
          map(CompanyName => CompanyName ? this._filter(CompanyName) : this.options.slice())
      );
    },(err) => {
      this._snack.open('Unable to fetch Listings. Please make sure server is running.')
    });
  }

  displayFn(listing: IListing): string {
    return listing && listing.CompanyName ? listing.CompanyName : '';
  }

  private _filter(CompanyName: string): IListing[] {
    const filterValue = CompanyName.toLowerCase();

    return this.options.filter(option => option.CompanyName.toLowerCase().indexOf(filterValue) === 0);
  }

  public getLisiting(option:typeof Listing){
    this.selectedListing.emit(option);
    this._shared.nextListing(option);
  }
}
