import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ContactService } from '../../contact.service';
import { MatTableDataSource } from '@angular/material';
import { Contact } from '../../contact.model';
import { FormControl, FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
// import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-create-channel',
  templateUrl: './create-channel.component.html',
  styleUrls: ['./create-channel.component.scss']
})
export class CreateChannelComponent implements OnInit {
  // firstFormGroup: FormGroup;
  // secondFormGroup: FormGroup;
  mytime: Date = new Date();
  mydate: Date = new Date();
  object = { value: 'value', timestamp: new Date().getTime() };


  step: any = 'setup';

  // setup
  createFormSetup: FormGroup;
  // subject: string = JSON.parse(localStorage.getItem('subject'));
  // from: string = JSON.parse(localStorage.getItem('from'));
  // emailAddress: String = JSON.parse(localStorage.getItem('sendTime'));

  // recipients
  contacts;
  searchControl = false;
  displayedColumns: string[] = ['select', 'firstname', 'surename', 'email', 'mobile'];
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
  emailsRecipients: Number;

  // selection = new SelectionModel<Contact>(true, []);
  filteredContacts: any = [];
  selectedAll: any;
  selectedContacts: any = [];

  // schedule
  clickNow: Boolean = false;
  clickFuture: Boolean = false;

  // confirm
  updateFormConfirm: FormGroup;

  constructor(
    private router: Router,
    private contactService: ContactService,
    private formBuilder: FormBuilder) {
    this.createFormSetup = this.formBuilder.group({
      'subject': ['', Validators.required],
      'name': ['', Validators.required, Validators.email],
      'emailAddress': ['', Validators.required],
    });
    this.createFormConfirm();
  }

  // ngOnInit() {
  //   this.firstFormGroup = this._formBuilder.group({
  //     firstCtrl: ['', Validators.required]
  //   });
  //   this.secondFormGroup = this._formBuilder.group({
  //     secondCtrl: ['', Validators.required]
  //   });
  // }

  createFormConfirm() {
    this.updateFormConfirm = this.formBuilder.group({
      sendTime: ['', Validators.required],
      from: ['', Validators.required],
      subject: ['', Validators.required],
      recipients: ['', Validators.required],
    });
  }

  ngOnInit() {
    const a = window.location.href;
    this.step = a.substring(54);
    this.contactService.getContacts().subscribe(res => {
      this.contacts = res;
      this.dataSource = new MatTableDataSource(this.contacts);
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.connect().subscribe(d => {
        this.filteredContacts = d;
      });
    });

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

    localStorage.setItem('key', JSON.stringify(this.object));
    // localStorage.setItem('from', 'abc');
    // localStorage.setItem('subject', 'test');
    // localStorage.setItem('recipients', '10');

    console.log(JSON.parse(localStorage.getItem('sendTime')));
    this.updateFormConfirm.get('sendTime').setValue(JSON.parse(localStorage.getItem('sendTime')));
    this.updateFormConfirm.get('from').setValue(localStorage.getItem('from'));
    this.updateFormConfirm.get('subject').setValue(localStorage.getItem('subject'));
    this.updateFormConfirm.get('recipients').setValue(localStorage.getItem('recipients'));
  }

  changeStep(step) {
    this.step = step;
    this.router.navigateByUrl(`users/campaigns/create-campaign/${step}`);
    // console.log(this.subject, this.name, this.emailAddress);
  }

  saveRecipients() {
    console.log(this.selectedContacts.length);
    localStorage.setItem('recipients', JSON.stringify(this.selectedContacts.length));
    console.log(localStorage.getItem('recipients'));
  }

  submitSetup(f: NgForm, step) {
    console.log(f.value);
    localStorage.setItem('sendTime', JSON.stringify(this.mydate));
    // console.log(this.subject, this.name, this.emailAddress);
    localStorage.setItem('from', f.value.name + ' <' + f.value.emailAddress + '>');
    // // console.log(this.subject, this.name, this.emailAddress);
    localStorage.setItem('subject', f.value.subject);
    // console.log(this.subject, this.name, this.emailAddress);
    this.step = step;
    this.router.navigateByUrl(`users/campaigns/create-campaign/${step}`);
    console.log(this.mydate);
  }

  onSearch() {
    this.searchControl = !this.searchControl;
  }

  createFilter(): (data: any, filter: string) => boolean {
    const filterFunction = function (data, filter): boolean {
      const searchTerms = JSON.parse(filter);
      const result = data.email.toLowerCase().indexOf(searchTerms.email) !== -1
        && data.mobile.toLowerCase().indexOf(searchTerms.mobile) !== -1
        && data.firstName.toLowerCase().indexOf(searchTerms.firstname) !== -1
        && data.lastName.toLowerCase().indexOf(searchTerms.surename) !== -1;
      return result;
    };
    return filterFunction;
  }

  // isAllSelected() {
  //   const numSelected = this.selection.selected.length;
  //   const numRows = this.dataSource.data.length;
  //   // let numRows;
  //   // this.dataSource.connect().subscribe(d => {
  //   //   this.renderedData = d;
  //   //   numRows = this.renderedData.length;
  //   // });
  //   return numSelected === numRows;
  // }

  // /** Selects all rows if they are not all selected; otherwise clear selection. */
  // masterToggle() {

  //   this.isAllSelected() ?
  //     this.selection.clear() :
  //     // this.dataSource.data.forEach(row => this.selection.select(row));
  //     this.renderedData.forEach(row => this.selection.select(row));
  //   console.log(this.selection);
  //   console.log(this.selection.selected);
  // }

  selectAll() {
    // array after being filtered (if not filter, filteredContacts = contacts)
    this.filteredContacts.forEach(filteredContact => {
      // select or deselect all
      filteredContact.selected = this.selectedAll;
      // check filteredContact if contained in selectedContacts
      const index = this.selectedContacts.indexOf(filteredContact);
      // not contained => user is selecting all => push all into selectedContacts
      if (index === -1) {
        this.selectedContacts.push(filteredContact);
      }
      // contained => user is deselecting all => slice all out of selectedContacts
      // tslint:disable-next-line:one-line
      else {
        this.selectedContacts.splice(index, 1);
      }
    });
  }

  checkIfAllSelected(contact) {
    // check contact if contained in selectedContacts
    const index = this.selectedContacts.indexOf(contact);
    // not contained => user is selecting this contact => push this contact into selectedContacts
    if (index === -1) {
      this.selectedContacts.push(contact);
    }
    // contained => user is deselecting this contact => slice this contact out of selectedContacts
    // tslint:disable-next-line:one-line
    else {
      this.selectedContacts.splice(index, 1);
    }
    // if each contact is selected => the selectedAll checkbox is also selected
    this.selectedAll = this.filteredContacts.every(function (item: any) {
      return item.selected === true;
    });

  }

  onClickNow() {
    this.clickNow = true;
    this.clickFuture = false;
  }

  onClickFuture() {
    this.clickFuture = true;
    this.clickNow = false;
  }

  setToHappen() {
    this.mydate.setHours(this.mytime.getHours(), this.mytime.getMinutes(), this.mytime.getSeconds());
    const time = this.mydate.getTime() - (new Date()).getTime();
    console.log(this.mydate);
    localStorage.setItem('sendTime', JSON.stringify(this.mydate));
    return setTimeout(this.onSend, time);
  }

  onSend() {
    alert('Hello');
    // localStorage.setItem('sent', 'test');
  }
}
