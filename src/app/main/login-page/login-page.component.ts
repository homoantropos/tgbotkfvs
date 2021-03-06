import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../shared/auth/auth.service";
import {Router} from "@angular/router";
import {User} from "../../shared/interfaces";
import {Subscription} from "rxjs";
import {AlertService} from "../../shared/services/alert.-service";

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  // @ts-ignore
  loginForm: FormGroup;
  submitted = false;
  message = ''

  private _inputPasswordType = 'password';

  public get inputPasswordType() {
    return this._inputPasswordType;
  }

  private _visibilityKind = 'visibility';
  get visibilityKind() {
    return this._visibilityKind;
  }

  // @ts-ignore
  @ViewChild('emailInput') emailInput: ElementRef<HTMLInputElement>
  aSub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private alert: AlertService
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
    if (this.loginForm.controls['email'] !== undefined) {
      setTimeout(() =>
        this.emailInput.nativeElement.focus(), 0
      );
    }
  }

  onSubmit(email: string, password: string): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.disable();
    this.submitted = true;
    const user: User = {
      email,
      password
    };
    this.aSub = this.auth.login(user)
      .subscribe(
        () => {
          this.router.navigate(['/'])
        },
        error => {
          this.message = error.error.message;
          this.auth.errorHandle(error);
          this.loginForm.enable();
        }
      );
    if (this.auth.error$) {
      this.auth.error$.subscribe(
        message => {
          this.alert.danger(message)
        }
      );
    }
    this.submitted = false;
  }

  goToMainPage(): void {
    this.router.navigate(['main']);
  }

  resetPassword(): void {
    this.router.navigate(['main', 'updatepass']);
  }

  changePasswordInputType(): void {
    this._inputPasswordType = this.inputPasswordType === 'password' ? 'text' : 'password';
    this._visibilityKind = this.visibilityKind === "visibility" ? 'visibility_off' : 'visibility';
  }

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe();
    }
  }

}

