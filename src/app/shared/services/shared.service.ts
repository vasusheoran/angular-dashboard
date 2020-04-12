import { Injectable } from '@angular/core';
import { Listing } from '../models/listing';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private listing = new BehaviorSubject(Object);
  sharedListing = this.listing.asObservable();

  nextListing(listing){
    this.listing.next(listing);
  }

  constructor() { }
}
