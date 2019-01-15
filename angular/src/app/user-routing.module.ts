import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { UserListComponent } from './user-list/user-list.component';
import { AccountMenuComponent } from './account-menu/account-menu.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { AssignRoleComponent } from './assign-role/assign-role.component';
import { EditContactComponent } from './edit-contact/edit-contact.component';

const userRoutes: Routes = [
  {
    path: 'users',
    component: AccountMenuComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: UserListComponent,
      },
      {
        path: 'contacts',
        component: ContactsComponent,
      },
      {
        path: 'campaigns',
        component: CampaignsComponent,
      },
    ]
  },
  {
    path: 'user/:id/assign-role',
    component: AssignRoleComponent,
  },
  {
    path: 'contact/:id/edit',
    component: EditContactComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(userRoutes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
