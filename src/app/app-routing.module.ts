import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainPageComponent} from "./main/main-page/main-page.component";
import {LoginPageComponent} from "./main/login-page/login-page.component";
import {
  UserAdminPageComponent
} from "./main/admin_dashboards/users_dashboard/user-admin-page/user-admin-page.component";
import {AuthGuard} from "./shared/auth/auth-guard";
import {ResetPasswordComponent} from "./shared/components/reset-password/reset-password.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: 'main', component: MainPageComponent, children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'users', canActivate: [AuthGuard], component: UserAdminPageComponent},
      {path: 'updatepass', component: ResetPasswordComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
