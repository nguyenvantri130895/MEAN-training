import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../contact.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  id: String;
  contact: any = {};
  createContactForm: FormGroup;

  constructor(private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.createContactForm = this.fb.group({
      email: ['', Validators],
      mobile: ['', Validators],
      firstName: ['', Validators],
      lastName: ['', Validators],
      birthday: ['', Validators],
      gender: ['', Validators],
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.contactService.getContactId(this.id).subscribe(res => {
        this.contact = res['contact'];
        console.log(this.contact);
        this.createContactForm.get('email').setValue(this.contact.email);
        this.createContactForm.get('mobile').setValue(this.contact.mobile);
        this.createContactForm.get('firstName').setValue(this.contact.firstName);
        this.createContactForm.get('lastName').setValue(this.contact.lastName);
        this.createContactForm.get('birthday').setValue(this.contact.birthday);
        this.createContactForm.get('gender').setValue(this.contact.gender);
      });
    });
  }

  submit(f: NgForm) {
    const d = new Date(f.value.birthday),
    year = d.getFullYear(),
    month = d.getMonth() + 1,
    day = d.getDate(),
    birthday = month + '/' + day + '/' + year;
    this.contactService.updateContact(this.id, f.value, birthday).subscribe(() => {
      this.router.navigate(['users/contacts']);
      this.snackBar.open('Contact ' + this.contact.firstName + ' has been updated successfully', 'OK', {
        duration: 5000
      });
    });
  }

}
