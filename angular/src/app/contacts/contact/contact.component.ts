import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../../contact.model';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router } from '@angular/router';
import { ContactService } from '../../contact.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts: Contact[];
  displayedColumns: string[] = ['email', 'mobile', 'firstname', 'surename', 'more'];
  dataSource: MatTableDataSource<Contact>;

  emailFilter = new FormControl();
  mobileFilter = new FormControl();
  firstNameFilter = new FormControl();
  lastNameFilter = new FormControl();
  filterValues = {
    email: '',
    mobile: '',
    firstname: '',
    surename: ''
  };

  // tslint:disable-next-line:no-input-rename
  @Input('contacts') contactsInput: Contact[];
  // tslint:disable-next-line:no-input-rename
  @Input('searchControl') searchControlInput: Boolean;

  constructor(private contactService: ContactService, private http: HttpClient, private router: Router) {

  }

  ngOnInit() {
    this.emailFilter.valueChanges
      .subscribe(
        email => {
          this.filterValues.email = email;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.mobileFilter.valueChanges
      .subscribe(
        mobile => {
          this.filterValues.mobile = mobile;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.firstNameFilter.valueChanges
      .subscribe(
        firstname => {
          this.filterValues.firstname = firstname;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
    this.lastNameFilter.valueChanges
      .subscribe(
        surename => {
          this.filterValues.surename = surename;
          this.dataSource.filter = JSON.stringify(this.filterValues);
        }
      );
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnChanges() {
    this.contacts = this.contactsInput;
    this.dataSource = new MatTableDataSource(this.contacts);
    this.dataSource.filterPredicate = this.createFilter();
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      return data.email.toLowerCase().indexOf(searchTerms.email) !== -1
        && data.mobile.toLowerCase().indexOf(searchTerms.mobile) !== -1
        && data.firstName.toLowerCase().indexOf(searchTerms.firstname) !== -1
        && data.lastName.toLowerCase().indexOf(searchTerms.surename) !== -1;
    };
    return filterFunction;
  }

  onEditContact(id) {
    this.router.navigateByUrl(`contact/${id}/edit`);
  }

}
