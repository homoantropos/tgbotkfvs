import { Component, OnInit } from '@angular/core';
import {Occasion} from "../../../../shared/interfaces";
import {OccasionService} from "../../../../shared/services/occasion.service";
import {AlertService} from "../../../../shared/services/alert.-service";

@Component({
  selector: 'app-occasions-admin-page',
  templateUrl: './occasions-admin-page.component.html',
  styleUrls: ['./occasions-admin-page.component.css']
})
export class OccasionsAdminPageComponent implements OnInit {

  occasions: Array<Occasion>;

  searchValue = '';
  searchField = ['name'];

  constructor(
    private occasionService: OccasionService,
    private alert: AlertService
  ) { }

  ngOnInit(): void {
    this.occasionService.getAllOccasions()
      .subscribe(
        occasions => {
          this.occasions = occasions.slice();
        }, error => this.alert.danger(
          error.erro.message ? error.erro.message : error)
      )
  }

}
