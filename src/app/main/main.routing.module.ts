import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainPageComponent} from "./main-page/main-page.component";
import {LoginPageComponent} from "./login-page/login-page.component";
import {AuthGuard} from "../shared/auth/auth-guard";
import {UserAdminPageComponent} from "./admin_dashboards/users_dashboard/user-admin-page/user-admin-page.component";
import {ResetPasswordComponent} from "../shared/components/reset-password/reset-password.component";
import {
  SubscribersAdminPageComponent
} from "./admin_dashboards/subscribers_dashboard/subscribers-admin-page/subscribers-admin-page.component";
import {MessengerComponent} from "../shared/components/messenger/messenger.component";
import {PollComponent} from "../shared/components/poll/poll.component";
import {
  OccasionsAdminPageComponent
} from "./admin_dashboards/occasions_dashboard/occasions-admin-page/occasions-admin-page.component";
import {
  OccasionsEditorComponent
} from "./admin_dashboards/occasions_dashboard/occasions-editor/occasions-editor.component";
import {SendPhotoComponent} from "../shared/components/messageEditors/send-photo/send-photo.component";
import {
  SendVideoEditorComponent
} from "../shared/components/messageEditors/send-video-editor/send-video-editor.component";
import {SendPollComponent} from "../shared/components/messageEditors/send-poll/send-poll.component";
import {SendMessageComponent} from "../shared/components/messageEditors/send-message/send-message.component";
import {PageNotFoundComponent} from "../shared/components/page-not-found/page-not-found.component";

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
          {path: 'sendMessage', component: SendMessageComponent},
          {path: 'sendPhoto', component: SendPhotoComponent},
          {path: 'sendVideo', component: SendVideoEditorComponent},
          {path: 'sendPoll', component: SendPollComponent},
          {path: ':id', component: SubscribersAdminPageComponent},
        ]
      },
      {path: 'sendMessage', canActivate: [AuthGuard], component: MessengerComponent},
      {path: 'polls', canActivate: [AuthGuard], component: PollComponent},
      {
        path: 'occasions', canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
          {path: '', component: OccasionsAdminPageComponent},
          {path: 'create', component: OccasionsEditorComponent},
          {path: 'edit/:id', component: OccasionsEditorComponent}
        ]
      }
    ]
  },
  {path: '**', component: PageNotFoundComponent}
]
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: [],
  providers: []
})

export class MainRoutingModule {}
