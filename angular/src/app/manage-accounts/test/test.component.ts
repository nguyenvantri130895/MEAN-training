import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AccountService } from '../../account.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  accounts: any;
  debugger;
  abc: any = [
    {
      name: 'Tri',
      country: 'Vietnam',
      timezone: 'Ha noi',
    },
    {
      name: 'Jason',
      country: 'Australia',
      timezone: 'Victoria',
    }
  ];
  constructor(private accountService: AccountService, private http: HttpClient) { }

  ngOnInit() {
    this.getAccounts();
  }

  getAccounts() {
    // this.accountService.getAccounts().subscribe(res => {
    //   this.accounts = res;
    //   console.log('Data requested ...');
    //   console.log(this.accounts);
    // });
  }

}
