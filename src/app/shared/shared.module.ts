import {NgModule} from "@angular/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxPaginationModule} from "ngx-pagination";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {AlertComponent} from "./components/alert/alert.component";
import {SearchPipe} from "./pipes/search.pipe";
import {ResetPasswordComponent} from "./components/reset-password/reset-password.component";
import {LoaderComponent} from "./components/loader/loader.component";
import {AuthInterceptor} from "./auth/auth.interceptor";
import {DeletionConfirmerComponent} from "./components/deletion-confirmer/deletion-confirmer.component";
import {MessengerComponent} from "./components/messenger/messenger.component";
import {PollComponent} from "./components/poll/poll.component";
import {ButtonStylingDirective} from "./directives/buttonStyling.directive";
import {ImageResizingDirective} from "./directives/imageResizing.directive";
import {VideoResizingDirective} from "./directives/videoResizing.directive";
import { SendMessageComponent } from './components/messageEditors/send-message/send-message.component';
import { SendPhotoComponent } from './components/messageEditors/send-photo/send-photo.component';
import { SendPollComponent } from './components/messageEditors/send-poll/send-poll.component';
import { SendVideoEditorComponent } from './components/messageEditors/send-video-editor/send-video-editor.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  declarations: [
    AlertComponent,
    ButtonStylingDirective,
    DeletionConfirmerComponent,
    ImageResizingDirective,
    LoaderComponent,
    MessengerComponent,
    PollComponent,
    ResetPasswordComponent,
    SearchPipe,
    VideoResizingDirective,
    SendMessageComponent,
    SendPhotoComponent,
    SendPollComponent,
    SendVideoEditorComponent,
    PageNotFoundComponent
  ],
  exports: [
    AlertComponent,
    ButtonStylingDirective,
    DeletionConfirmerComponent,
    ImageResizingDirective,
    LoaderComponent,
    MessengerComponent,
    PollComponent,
    ResetPasswordComponent,
    SendPollComponent,
    SearchPipe,
    VideoResizingDirective,

    MatIconModule,
    MatToolbarModule,
    MatMenuModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    NgxPaginationModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: AuthInterceptor
    },
    {provide: MAT_DATE_LOCALE, useValue: 'uk'}, {provide: MAT_DATE_LOCALE, useValue: 'uk'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}
  ]
})

export class SharedModule {}
