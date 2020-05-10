import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  // private baseUrl:string = "http://192.168.99.101:5000/";
  private baseUrl:string = "http://localhost:5000/";

  private fetchValuesUrl: string = this.baseUrl  + 'fetch/value';

  private fetchIndexUrl: string = this.baseUrl  + 'fetch/index';

  private fetchListingsUrl: string = this.baseUrl  + 'fetch/listings';

  private fetchHistoricalDataUrl: string = this.baseUrl  + 'fetch/';

  private freezeBIUrl: string = this.baseUrl  + 'freeze';

  private fetchFrozenUrl: string = this.baseUrl  + 'fetch/freeze';

  private addNewRowUrl: string = this.baseUrl  + 'add';

  private setIndexUrl: string = this.baseUrl  + 'set';
s
  private downloadLogUrl: string = this.baseUrl  + 'download/';

  private uploadSymbolsUrl: string = this.baseUrl  + 'upload';

  private deleteRowUrl: string = this.baseUrl  + 'delete';


  constructor(private _http: HttpClient) { }

  fetchValues() {
    return this._http.get(this.fetchValuesUrl).pipe(map(data => data));
  }

  fetchListings() {
    return this._http.get(this.fetchListingsUrl).pipe(map(data => data));
  }

  fetchHistoricalData(page, size) {
    // TODO: Implenent Paging here
    const url = this.fetchHistoricalDataUrl + page + '/' + size;
    return this._http.get(url).pipe(map(data => data));
  }

  freezeBI(data) {
    return this._http.post(this.freezeBIUrl, data).pipe(map(data => data));
  }

  fetchFrozenValues() {
    return this._http.get(this.fetchFrozenUrl).pipe(map(data => data));
  }

  addNewRow(ob) {
    return this._http.post(this.addNewRowUrl, ob).pipe(map(data => data));
  }

  setListing(selectedOption, reset = false) {
    let url = this.setIndexUrl;
    selectedOption['reset'] = reset;
    return this._http.post(url, selectedOption).pipe(map(data => data));
  }

  downloadLogs(num) {
    return this._http.get(this.downloadLogUrl + num).pipe(map(data => data));
  }

  uploadSymbols(file: File) {
    const fd = new FormData;
    fd.append('file', file, file.name);
    return this._http.post(this.uploadSymbolsUrl, fd).pipe(map(data => data));
  }

  deleteRow() {
    return this._http.post(this.deleteRowUrl, null).pipe(map(data => data));
  }

  fetchIndexIfSet(){
    return this._http.get(this.fetchIndexUrl).pipe(map(data => data));
  }
  
  checkCORS(url){
    return this._http.get(url).pipe(map(data => data));
  }
}
