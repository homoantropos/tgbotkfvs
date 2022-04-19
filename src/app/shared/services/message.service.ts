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
  ) {
  }

  send(fd: FormData, method: string): Observable<any> {
    return this.http.post<any>(`https://api.telegram.org/bot${environment.bot_token}/${method}`, fd);
  }

  getDefaultText(): string {
    return `<b id="заголовок"></b>
<i title="стислий опис"></i>
<b title="дата"></b> <i title="примітка до дати (за потребою)"></i>
<b title="місце"></b> <i title="примітка до місця (за потребою)"></i>
<b title="організатор"></b> <i title="примітка до організатора (за потребою)"></i>

<a title="" href="">докладніше</a>
`
  }

  getDefaultReplyMarkup(): any {
    return {inline_keyboard:[[{text: '', url: ''}]]}
  }

  getMediaNameForMethod(method: string): string {
    switch (method) {
      case('sendMessage') :
        return 'text';
      case('sendPhoto') :
        return 'photo';
      case('sendVideo') :
        return 'video';
      case('sendDocument') :
        return 'document';
      case('sendAnimation') :
        return 'animation';
      case('sendAudio') :
        return 'audio';
      case('sendVoice') :
        return 'voice';
      case('sendVideoNote') :
        return 'video_note';
      default :
        return 'media';
    }
  }
}
