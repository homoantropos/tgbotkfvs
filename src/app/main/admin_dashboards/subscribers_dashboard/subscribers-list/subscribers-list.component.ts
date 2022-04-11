import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Subscriber} from "../../../../shared/interfaces";
import {TableSortService} from "../../../../shared/services/table-sort.service";

  @Component({
    selector: 'app-subscribers-list',
    templateUrl: './subscribers-list.component.html',
    styleUrls: ['./subscribers-list.component.css']
  })

  export class SubscribersListComponent implements OnInit {

  @Input() subscribers: Array<Subscriber> = [];

  paginatorStartPageNumber = 0;
  itemsPerPage = 10;

  sortDirection = true;

  userId = 0;

  @Output() showButton: EventEmitter<boolean> = new EventEmitter<boolean>();

    recipients: Array<number> = [];
    showMessenger = false;
    showSendButton = false;

    constructor(
    private sortService: TableSortService
  ) { }

  ngOnInit(): void {
  }

  selectRecipients(tgId?: number): void {
      if(tgId) {
        this.recipients.push(tgId);
      } else {
        this.subscribers.map(
          subscriber => this.recipients.push(subscriber.tgId)
        )
      }
      this.showSendButton = true;
  }

  showOrHideMessenger(condition: boolean): void {
    this.showMessenger = condition;
    this.showSendButton = condition;
  }

  sortTable(sortOption: any): void {
    this.sortDirection = this.sortService.sortTableByStringValues(sortOption, this.subscribers, this.sortDirection);
  }
}

