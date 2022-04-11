import {Component, OnInit} from '@angular/core';
import {SubscriberService} from "../../../../shared/services/subscriber.service";
import {Subscriber} from "../../../../shared/interfaces";
import {AlertService} from "../../../../shared/services/alert.-service";
import {ActivatedRoute, Params} from "@angular/router";
import {switchMap} from "rxjs";

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
    private route: ActivatedRoute,
    private subsService: SubscriberService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.subsService.getAllSubscribers(params['id'])
          }
        )
      ).subscribe(
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
