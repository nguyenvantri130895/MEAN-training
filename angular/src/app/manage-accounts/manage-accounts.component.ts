import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../account.service';
import { Account } from '../account.model';

@Component({
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.scss']
})
export class ManageAccountsComponent implements OnInit {
  accounts: any;

  constructor(private userService: UserService,
    private router: Router,
    private accountService: AccountService,
    private http: HttpClient) {
  }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    this.accountService.getAccounts().subscribe(res => {
      this.accounts = res;
      console.log('Data requested ...');
      console.log(this.accounts);
    });
  }

  onLogout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  onCreateAccount() {
    this.router.navigate(['/create-account']);
  }

}
