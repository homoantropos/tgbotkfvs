import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../shared/interfaces";
import {TableSortService} from "../../../../shared/services/table-sort.service";

@Component({
  selector: 'app-user-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {

  @Input() users: Array<User> = [];
  paginatorStartPageNumber = 0;
  itemsPerPage = 10;

  sortDirection = true;

  userId = 0;

  @Output() showButton: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private sortService: TableSortService
  ) { }

  ngOnInit(): void {
  }

  sortTable(sortOption: any): void {
    this.sortDirection = this.sortService.sortTableByStringValues(sortOption, this.users, this.sortDirection);
  }
}

