import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { BehaviorSubject } from 'rxjs';
import { ListingResponse } from '../models/listing-response';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {

  private message = new BehaviorSubject(ListingResponse);
  sharedMessage = this.message.asObservable();
 
  constructor(private socket: Socket) { }

  // public getMessages(){
  // }

  // public connectToServer(){
  //   this.socket.on('connect', () => { });
  // }

  public addMesage(message){
    this.message.next(message);
  }

  public subsribeForUpdates(){
    this.socket.on('updateui', (message) => {
      this.message.next(message);
        // observer.next(message);
    });
    return this.sharedMessage;
  }

// public getMessages = () => {
//   return Observable.create((observer) => {
//           this.socket.on('rts', (message) => {
//             this.message.next(message);
//               // observer.next(message);
//           });
//   });
// }
}
