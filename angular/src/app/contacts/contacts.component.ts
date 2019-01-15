import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {

  contacts;
  searchControl = false;
  constructor(private contactService: ContactService, private router: Router) { }

  ngOnInit() {
    this.contactService.getContacts().subscribe(res => {
      this.contacts = res;
    });
  }

  onSearch() {
    this.searchControl = !this.searchControl;
  }

}
