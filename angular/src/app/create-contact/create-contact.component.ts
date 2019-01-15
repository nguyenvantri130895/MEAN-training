import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {

  createForm: FormGroup;

  constructor(
    private contactService: ContactService,
    private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      'firstName': ['', Validators.required],
      'sureName': ['', Validators.required],
      'email': ['', Validators.required],
      'mobile': ['', Validators.required],
      'birthday': ['', Validators.required],
      'gender': ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  submit(f: NgForm) {
    const d = new Date(f.value.birthday),
    year = d.getFullYear(),
    month = d.getMonth() + 1,
    day = d.getDate(),
    birthday = month + '/' + day + '/' + year;
    console.log(birthday);
    this.contactService.addContact(f.value, birthday).subscribe(() => {
      this.router.navigate(['/users/contacts']);
    });
  }

}
