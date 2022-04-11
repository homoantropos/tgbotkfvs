import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Subscriber} from "../interfaces";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubscriberService {

  constructor(
    private http: HttpClient
  ) { }

  getAllSubscribers(id?: number): Observable<Array<Subscriber>> {
    if(id) {
      return this.http.get<Array<Subscriber>>(`${environment.backURI}/subscribers?occasionId=${id}`);
    } else {
      return this.http.get<Array<Subscriber>>(`${environment.backURI}/subscribers`);
    }
  }
}
