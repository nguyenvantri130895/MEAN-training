import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { UserService } from '../user.service';

import { Router } from '@angular/router';
@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  createForm: FormGroup;
  userDetails;

  constructor(
    private accountService: AccountService,
    private fb: FormBuilder, private router: Router,
    private userService: UserService) {
    this.createForm = this.fb.group({
      'name': ['', Validators.required],
      'ownerEmail': ['', Validators.required, Validators.email],
      'country': ['', Validators.required],
      'timezone': ['', Validators.required],
    });
  }

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
  }

  addAccount(name, ownerEmail, country, timezone) {
    this.accountService.addAccount(name, ownerEmail, country, timezone).subscribe(() => {
      this.accountService.addUser(name, ownerEmail, this.userDetails._id).subscribe(() => {
        this.router.navigate(['/users']);
      });
    });
  }
}
