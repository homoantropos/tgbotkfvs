import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Occasion} from "../../../../shared/interfaces";
import {TableSortService} from "../../../../shared/services/table-sort.service";
import {Router} from "@angular/router";
import {AlertService} from "../../../../shared/services/alert.-service";
import {OccasionService} from "../../../../shared/services/occasion.service";

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

  showDeleteConfirmation = false;
  option = 'подію';

  constructor(
    private router: Router,
    private sortService: TableSortService,
    private alert: AlertService,
    private occasionService: OccasionService
  ) {
  }

  ngOnInit(): void {
  }

  goToOccasionEditor(id: number): void {
    this.router.navigateByUrl(`main/occasions/edit/${id}`);
  }

  callDeletion(id: number): void {
    this.showDeleteConfirmation = true;
    this.occasionId = id;
  }

  onDelete(confirm: boolean): void {
    if (confirm) {
      this.occasionService.deleteOccasion(this.occasionId)
        .subscribe(
          (response: {message: string}) => {
            this.alert.success(response.message);
            this.showDeleteConfirmation = false;
            this.showButton.emit(false);
            this.occasions = this.occasions.filter(occasion => occasion.id !== this.occasionId);
          },
          error => {
            this.alert.danger(error.error.message ? error.error.message : error);
          }
        );
    } else {
      this.showDeleteConfirmation = false;
      this.alert.warning('Видалення скасованою');
    }
  }

  sortTable(sortOption: any): void {
    this.sortDirection = this.sortService.sortTableByStringValues(sortOption, this.occasions, this.sortDirection);
  }
}
