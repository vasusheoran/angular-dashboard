import { EventEmitter } from '@angular/core';
import { Component, OnInit, Output,  } from '@angular/core';
import { FormControl } from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {Listing} from 'src/app/shared/models/listing';

@Component({
  selector: 'app-widget-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css']
})
export class AutocompleteComponent implements OnInit {

  @Output() selectedListing:EventEmitter<any> = new EventEmitter();

  
  myControl = new FormControl();

  options: Listing[] = [
    {CompanyName: 'Nifty 50', listing:'asdf', Series : 'Series', SASSymbol : 'nifty_50', YahooSymbol : '^nsei'},
    {CompanyName: 'TCS', listing:'asdf', Series : 'Series', SASSymbol : 'tcs-eq', YahooSymbol : 'tcs.ns'},
    {CompanyName: 'Stuff', listing:'asdf', Series : 'Series', SASSymbol : 'stuff-eq', YahooSymbol : 'stuff'}
  ];
  filteredOptions: Observable<Listing[]>;

  constructor(){ }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.CompanyName),
        map(CompanyName => CompanyName ? this._filter(CompanyName) : this.options.slice())
      );
  }

  displayFn(listing: Listing): string {
    return listing && listing.CompanyName ? listing.CompanyName : '';
  }

  private _filter(CompanyName: string): Listing[] {
    const filterValue = CompanyName.toLowerCase();

    return this.options.filter(option => option.CompanyName.toLowerCase().indexOf(filterValue) === 0);
  }

  public getLisiting(option:Listing){
    this.selectedListing.emit(option);
  }
}
