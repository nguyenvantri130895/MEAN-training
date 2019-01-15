import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/auth.guard';
import { ManageAccountsComponent } from './manage-accounts/manage-accounts.component';
// import { TestComponent } from './manage-accounts/test/test.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { HeaderComponent } from './header/header.component';
// import { TestComponent } from './manage-accounts/test/test.component';
import { UserListComponent } from './user-list/user-list.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';
import { CreateChannelComponent } from './create-campaign/create-channel/create-channel.component';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'manage-account',
    component: ManageAccountsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-account',
    component: CreateAccountComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/contacts/create-contact',
    component: CreateContactComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/campaigns',
    component: CreateCampaignComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-user',
    component: CreateUserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/campaigns/create-campaign/setup',
    component: CreateChannelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/campaigns/create-campaign/content',
    component: CreateChannelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/campaigns/create-campaign/recipients',
    component: CreateChannelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/campaigns/create-campaign/schedule',
    component: CreateChannelComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/campaigns/create-campaign/confirm',
    component: CreateChannelComponent,
    canActivate: [AuthGuard],
  },
  // {
  //   path: '', redirectTo: '/login', pathMatch: 'full'
  // },
  // {
  //   path: '**', redirectTo: '/login', pathMatch: 'full'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
