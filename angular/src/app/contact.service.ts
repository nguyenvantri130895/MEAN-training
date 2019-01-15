import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  getContacts() {
    return this.http.get(environment.apiBaseURL + '/contacts');
  }

  addContact(value, birthday) {
    console.log(birthday);
    const contact = {
      firstName: value.firstName,
      lastName: value.sureName,
      email: value.email,
      mobile: value.mobile,
      birthday: birthday,
      gender: value.gender,
    };
    return this.http.post(environment.apiBaseURL + '/contact/add', contact);
  }

  getContactId(id) {
    return this.http.get(environment.apiBaseURL + `/contact/${id}`);
  }

  updateContact(id, value, birthday) {
    const contact = {
      email: value.email,
      mobile: value.mobile,
      firstName: value.firstName,
      lastName: value.lastName,
      birthday: birthday,
      gender: value.gender,
    };
    return this.http.post(environment.apiBaseURL + `/contact/${id}/edit`, contact);
  }
}
