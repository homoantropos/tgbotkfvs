import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Subscriber} from "../../../../shared/interfaces";
import {TableSortService} from "../../../../shared/services/table-sort.service";
import {MessageService} from "../../../../shared/services/message.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-subscribers-list',
  templateUrl: './subscribers-list.component.html',
  styleUrls: ['./subscribers-list.component.css']
})

export class SubscribersListComponent implements OnInit {

  @Input() subscribers: Array<Subscriber> = [];
  @Input() occasionTitle = '';

  @ViewChild('mainCheckBox') mainCheckBox: ElementRef<HTMLInputElement>;
  subsChecked = 0;

  paginatorStartPageNumber = 0;
  itemsPerPage = 10;

  sortDirection = true;

  userId = 0;

  showSendButton = false;

  constructor(
    private router: Router,
    private sortService: TableSortService,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void { }

  selectRecipients(tgId?: number): void {
    if (tgId) {
      ++this.subsChecked;
      if (this.mainCheckBox && this.subsChecked === this.subscribers.length) {
        this.mainCheckBox.nativeElement.checked = true;
      } else {
        this.mainCheckBox.nativeElement.indeterminate = true;
      }
      this.messageService.recipients.push(tgId);
    } else {
      this.subscribers.map(
        subscriber => {
          this.messageService.recipients.push(subscriber.tgId);
        }
      )
    }
    this.showSendButton = true;
  }

  sortTable(sortOption: any): void {
    if(sortOption[0] === 'subscribedAt') {
      this.sortDirection = this.sortService.sortTableByDates(sortOption, this.subscribers, this.sortDirection);
    } else {
      this.sortDirection = this.sortService.sortTableByStringValues(sortOption, this.subscribers, this.sortDirection);
    }
  }
}
