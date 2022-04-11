import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  recipients: Array<number> = [];
  constructor(
    private http: HttpClient
  ) { }

  sendMessage(body: {tgIds: Array<number>, text: string, method: string}): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${environment.backURI}/send`, body);
  }

}
