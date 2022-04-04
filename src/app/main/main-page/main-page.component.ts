import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})

export class MainPageComponent implements OnInit {

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {}

  goToRegisterForm(): void {
    this.router.navigateByUrl('/main/register');
  }

  goToAdminPage(): void {
    this.router.navigate(['admin']);
  }

}
