import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(private userService: UserService, private accountService: AccountService) { }
  userDetails;
  accounts;

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        console.log(this.userDetails);
      },
      err => {
        console.log(err);
      }
    );
    this.accountService.getAccounts().subscribe(res => {
      this.accounts = res;
    });
  }


}
