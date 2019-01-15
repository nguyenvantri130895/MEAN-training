import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccounts() {
    return this.http.get(environment.apiBaseURL + '/accounts');
  }

  addAccount(name, ownerEmail, country, timezone) {
    const account = {
      name: name,
      ownerEmail: ownerEmail,
      country: country,
      timezone: timezone,
    };
    return this.http.post(environment.apiBaseURL + '/account/add', account);
  }

  addUser(fullName, email, accountId) {
    const user = {
      fullName: fullName,
      email: email,
      accountId: accountId,
    };
    return this.http.post(environment.apiBaseURL + '/register', user);
  }
}
