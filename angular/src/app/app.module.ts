import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DatepickerModule, BsDatepickerModule, TimepickerModule  } from 'ngx-bootstrap';
import { DateValueAccessorModule } from 'angular-date-value-accessor';
import { DatetimePopupModule } from 'ngx-bootstrap-datetime-popup';

import { AppRoutingModule } from './app-routing.module';
import { UserRoutingModule } from './user-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { UserComponent } from './user-list/user/user.component';
import { UserService } from './user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
import { TestComponent } from './manage-accounts/test/test.component';
import { CreateAccountComponent } from './create-account/create-account.component';

import {
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatDividerModule,
  MatTableModule,
  MatCardModule,
  MatInputModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatSnackBarModule,
  MatDialogModule,
  MatStepperModule,
  MatButtonModule,
  // MatTreeModule,
  // MatIconModule,
  // MatTreeNode
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './user-list/user-list.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { AccountComponent } from './manage-accounts/account/account.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { ContactComponent } from './contacts/contact/contact.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';
import { CampaignComponent } from './campaigns/campaign/campaign.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CreateChannelComponent } from './create-campaign/create-channel/create-channel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UserComponent,
    ManageAccountsComponent,
    TestComponent,
    CreateAccountComponent,
    HeaderComponent,
    UserListComponent,
    AccountMenuComponent,
    CreateUserComponent,
    ContactsComponent,
    CampaignsComponent,
    CreateContactComponent,
    AccountComponent,
    AssignRoleComponent,
    ContactComponent,
    EditContactComponent,
    CampaignComponent,
    CreateCampaignComponent,
    CreateChannelComponent,
  ],
  imports: [
    BrowserModule,
    UserRoutingModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatDividerModule,
    MatTableModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatSnackBarModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    DateValueAccessorModule,
    MatDialogModule,
    MatButtonModule,
    MatStepperModule,
    DatetimePopupModule,
    // MatTreeModule,
    // MatIconModule,
    // MatTreeNode
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
