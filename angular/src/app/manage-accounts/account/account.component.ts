import { Component, OnInit, Input } from '@angular/core';
import { AccountService } from '../../account.service';
import { HttpClient } from '@angular/common/http';
import { Account } from '../../account.model';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  accounts: any[];
  // tslint:disable-next-line:no-input-rename
  @Input('accounts') accountsInput: any[];

  constructor(private accountService: AccountService, private http: HttpClient) { }

  ngOnInit() {
  }

  ngOnChanges() {
    this.accounts = this.accountsInput;
  }

}
