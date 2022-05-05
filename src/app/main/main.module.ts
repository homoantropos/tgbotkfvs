import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {SharedModule} from "../shared/shared.module";
import {MainPageComponent} from "./main-page/main-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {UserAdminPageComponent} from "./admin_dashboards/users_dashboard/user-admin-page/user-admin-page.component";
import {UsersListComponent} from "./admin_dashboards/users_dashboard/users-list/users-list.component";
import {
  SubscribersAdminPageComponent
} from "./admin_dashboards/subscribers_dashboard/subscribers-admin-page/subscribers-admin-page.component";
import {
  SubscribersListComponent
} from "./admin_dashboards/subscribers_dashboard/subscribers-list/subscribers-list.component";
import {
  OccasionsAdminPageComponent
} from "./admin_dashboards/occasions_dashboard/occasions-admin-page/occasions-admin-page.component";
import {OccasionsListComponent} from "./admin_dashboards/occasions_dashboard/occasions-list/occasions-list.component";
import {
  OccasionsEditorComponent
} from "./admin_dashboards/occasions_dashboard/occasions-editor/occasions-editor.component";
import {MainRoutingModule} from "./main.routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MainRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginPageComponent,
    MainPageComponent,
    OccasionsAdminPageComponent,
    OccasionsEditorComponent,
    OccasionsListComponent,
    SubscribersAdminPageComponent,
    SubscribersListComponent,
    UserAdminPageComponent,
    UsersListComponent
  ],
  exports: [
    LoginPageComponent,
    MainPageComponent,
    OccasionsAdminPageComponent,
    OccasionsEditorComponent,
    OccasionsListComponent,
    SubscribersAdminPageComponent,
    SubscribersListComponent,
    UserAdminPageComponent,
    UsersListComponent
  ],
  providers: []
})

export class MainModule {}
