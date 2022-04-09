import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Occasion, Subscriber} from "../../../../shared/interfaces";
import {TableSortService} from "../../../../shared/services/table-sort.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-occasions-list',
  templateUrl: './occasions-list.component.html',
  styleUrls: ['./occasions-list.component.css']
})
export class OccasionsListComponent implements OnInit {

  @Input() occasions: Array<Occasion> = [];

  paginatorStartPageNumber = 0;
  itemsPerPage = 10;

  sortDirection = true;

  occasionId = 0;

  @Output() showButton: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private router: Router,
    private sortService: TableSortService
  ) {
  }

  ngOnInit(): void {
  }

  goToOccasionEditor(id: number): void {
    this.router.navigateByUrl(`main/occasions/edit/${id}`);
  }

  callDeletion(id: number): void {

  }

  sortTable(sortOption: any): void {
    this.sortDirection = this.sortService.sortTableByStringValues(sortOption, this.occasions, this.sortDirection);
  }
}
