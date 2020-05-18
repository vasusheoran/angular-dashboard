import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';
import { UpdateResponse } from '../models/listing-response';

@Injectable({
  providedIn: 'root'
})
export class WebSocketsService {
 
  constructor() { 
    this.socket = io(this.url);
  }

  socket:any;
  readonly url:string = "ws://localhost:5000";

  
  public listen(eventName:string){
    return new Observable(sub => {
      this.socket.on(eventName, (message) => {
        sub.next(message);
      });
    });
  }

  public emit(eventName: string, data:any){
    this.socket.emit(eventName, data)
  }
}
