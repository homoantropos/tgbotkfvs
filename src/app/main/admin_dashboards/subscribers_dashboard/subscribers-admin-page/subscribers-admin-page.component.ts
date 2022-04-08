import { Component, OnInit } from '@angular/core';
import {SubscriberService} from "../../../../shared/services/subscriber.service";
import {Subscriber} from "../../../../shared/interfaces";
import {AlertService} from "../../../../shared/services/alert.-service";

@Component({
  selector: 'app-subscribers-admin-page',
  templateUrl: './subscribers-admin-page.component.html',
  styleUrls: ['./subscribers-admin-page.component.css']
})
export class SubscribersAdminPageComponent implements OnInit {

  subscribers: Array<Subscriber>;

  searchValue = '';
  searchField = ['tgId'];

  constructor(
    private subsService: SubscriberService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.subsService.getAllSubscribers()
      .subscribe(
        subscribers => {
          this.subscribers = subscribers.slice();
        },
          error => this.alert.danger(error.error.message)
      )
  }

}

/*TODO
1. Функціонал блокування та деблокування підписників;
2. Функціональ надсилання текстових повідомлень;
3. Функціонал надсилання картинок;
4. Функціонал надсилання аудіозаписів;
5. Функціонал надсилання стікерів;
6. Функціонал надсилання відео.
*/
