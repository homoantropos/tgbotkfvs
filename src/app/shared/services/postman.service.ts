import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class PostmanService {
  constructor(
    private http: HttpClient
  ) {
  }

  sendMessage(message: any, file?: File): Observable<any> {
    const fd = new FormData();
    Object.keys(message).map(
      key => {
        fd.set(key, message[key]);
      }
    );
    if (file) {
      fd.append('video', file, file.name);
    }
    return this.http.post(`https://api.telegram.org/bot${environment.bot_token}/sendMessage`, fd);
  }

  sendVideo(message: any, file: File, thumb?: File): Observable<any> {
    const fd = new FormData();
    Object.keys(message).map(
      key => {
        fd.set(key, message[key]);
      }
    );
    fd.append('video', file, file.name);
    if (thumb) {
      fd.append('thumb', thumb, thumb.name);
    }
    return this.http.post(`https://api.telegram.org/bot${environment.bot_token}/sendVideo`, fd);
  }

  sendPhoto(message: any, photo: File): Observable<any> {
    const fd = new FormData();
    Object.keys(message).map(
      key => {
        fd.set(key, message[key]);
      }
    );
    fd.append('photo', photo, photo.name);
    return this.http.post(`https://api.telegram.org/bot${environment.bot_token}/sendPhoto`, fd);
  }

  sentPoll(pollOptions: any): Observable<any> {
    const fd = new FormData();
    Object.keys(pollOptions).map(
      key => {
        fd.set(key, pollOptions[key]);
      }
    );
    const options: Array<string> = [];
    pollOptions.options.map(
      // @ts-ignore
      option => options.push(option.text)
    );
    fd.delete('close_date');
    fd.set('close_date', new Date(pollOptions.close_date).valueOf().toString());
    fd.delete('options');
    fd.set('options', JSON.stringify(options));
    return this.http.post(`https://api.telegram.org/bot${environment.bot_token}/sendPoll`, fd);
  }

}
