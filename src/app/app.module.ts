import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertComponent } from './shared/components/alert/alert.component';
import { MainPageComponent } from './main/main-page/main-page.component';
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import { LoginPageComponent } from './main/login-page/login-page.component';
import { LoaderComponent } from './shared/components/loader/loader.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./shared/auth/auth.interceptor";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { UserAdminPageComponent } from './main/admin_dashboards/users_dashboard/user-admin-page/user-admin-page.component';
import { ResetPasswordComponent } from './shared/components/reset-password/reset-password.component';
import { UsersListComponent } from './main/admin_dashboards/users_dashboard/users-list/users-list.component';
import { SearchPipe } from './shared/pipes/search.pipe';
import {NgxPaginationModule} from "ngx-pagination";
import {MatSelectModule} from "@angular/material/select";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { SubscribersAdminPageComponent } from './main/admin_dashboards/subscribers_dashboard/subscribers-admin-page/subscribers-admin-page.component';
import { SubscribersListComponent } from './main/admin_dashboards/subscribers_dashboard/subscribers-list/subscribers-list.component';
import { OccasionsAdminPageComponent } from './main/admin_dashboards/occasions_dashboard/occasions-admin-page/occasions-admin-page.component';
import { OccasionsListComponent } from './main/admin_dashboards/occasions_dashboard/occasions-list/occasions-list.component';
import { OccasionsEditorComponent } from './main/admin_dashboards/occasions_dashboard/occasions-editor/occasions-editor.component';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from "@angular/material/core";
import { DeletionConfirmerComponent } from './shared/components/deletion-confirmer/deletion-confirmer.component';
import { MessengerComponent } from './shared/components/messenger/messenger.component';

@NgModule({
  declarations: [
    AppComponent,
    AlertComponent,
    MainPageComponent,
    LoginPageComponent,
    LoaderComponent,
    UserAdminPageComponent,
    ResetPasswordComponent,
    UsersListComponent,
    SearchPipe,
    SubscribersAdminPageComponent,
    SubscribersListComponent,
    OccasionsAdminPageComponent,
    OccasionsListComponent,
    OccasionsEditorComponent,
    DeletionConfirmerComponent,
    MessengerComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
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
  providers: [    {
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: AuthInterceptor
  },
    {provide: MAT_DATE_LOCALE, useValue: 'uk'}, {provide: MAT_DATE_LOCALE, useValue: 'uk'},
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS},
    {provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: {useUtc: true}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
