import {Injectable} from '@angular/core';
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
  ) {  }

  send(fd: FormData, method: string): Observable<any> {
    return this.http.post<any>(`https://api.telegram.org/bot${environment.bot_token}/${method}`, fd);
  }
}
