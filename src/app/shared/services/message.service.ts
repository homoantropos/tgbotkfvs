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

  sendMessage(
    body: {tgIds: Array<number>, text?: string, method: string, mediaUrl: string},
    image?: File): Observable<{ message: string }> {
    let fd = new FormData();
    Object.keys(body).map(
      key => fd.set(key, body[key])
    );
    if (image) {
      fd.append('image', image, image.name);
    }
    return this.http.post<{ message: string }>(`${environment.backURI}/sendMedia`, body);
  }

}
