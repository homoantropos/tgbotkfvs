import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Occasion} from "../interfaces";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class OccasionService {

  constructor(
    private http: HttpClient
  ) { }

  getAllOccasions(): Observable<Array<Occasion>> {
    return this.http.get<Array<Occasion>>(`${environment.backURI}/occasions`)
  }
}
