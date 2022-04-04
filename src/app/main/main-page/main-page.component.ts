import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../shared/auth/auth.service";

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  constructor(
    private router: Router,
    public auth: AuthService
  ) {
  }

  ngOnInit(): void {}

  goToAdminPage(): void {
    this.router.navigate(['admin']);
  }

}
