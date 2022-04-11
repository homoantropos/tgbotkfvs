import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainPageComponent} from "./main/main-page/main-page.component";
import {LoginPageComponent} from "./main/login-page/login-page.component";
import {
  UserAdminPageComponent
} from "./main/admin_dashboards/users_dashboard/user-admin-page/user-admin-page.component";
import {AuthGuard} from "./shared/auth/auth-guard";
import {ResetPasswordComponent} from "./shared/components/reset-password/reset-password.component";
import {
  SubscribersAdminPageComponent
} from "./main/admin_dashboards/subscribers_dashboard/subscribers-admin-page/subscribers-admin-page.component";
import {
  OccasionsAdminPageComponent
} from "./main/admin_dashboards/occasions_dashboard/occasions-admin-page/occasions-admin-page.component";
import {
  OccasionsEditorComponent
} from "./main/admin_dashboards/occasions_dashboard/occasions-editor/occasions-editor.component";
import {MessengerComponent} from "./shared/components/messenger/messenger.component";

const routes: Routes = [
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {
    path: 'main', component: MainPageComponent, children: [
      {path: 'login', component: LoginPageComponent},
      {path: 'users', canActivate: [AuthGuard], component: UserAdminPageComponent},
      {path: 'updatepass', component: ResetPasswordComponent},
      {
        path: 'subscribers', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
          {path: '', component: SubscribersAdminPageComponent},
          {path: ':id', component: SubscribersAdminPageComponent},
        ]
      },
      {path: 'sendMessage', canActivate: [AuthGuard], component: MessengerComponent},
      {
        path: 'occasions', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
          {path: '', component: OccasionsAdminPageComponent},
          {path: 'create', component: OccasionsEditorComponent},
          {path: 'edit/:id', component: OccasionsEditorComponent}
        ]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
