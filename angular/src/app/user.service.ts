import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environments/environment';
import { AssignRoleComponent } from './assign-role/assign-role.component';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  login(authCredentials) {
    return this.http.post(environment.apiBaseURL + '/authenticate', authCredentials);
  }

  getUserProfile() {
    return this.http.get(environment.apiBaseURL + '/userProfile');
  }

  getUserId(id) {
    return this.http.get(environment.apiBaseURL + `/user/${id}`);
  }

  getUsers() {
    return this.http.get(environment.apiBaseURL + '/users');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    return localStorage.removeItem('token');
  }

  getUserPayLoad() {
    const token = this.getToken();
    if (token) {
      const userPayLoad = atob(token.split('.')[1]);
      return JSON.parse(userPayLoad);
    }
    // tslint:disable-next-line:one-line
    else {
      return null;
    }
  }

  isLoggedIn() {
    const userPayLoad = this.getUserPayLoad();
    if (userPayLoad) {
      return userPayLoad.exp > Date.now() / 1000;
    }
    // tslint:disable-next-line:one-line
    else {
      return false;
    }
  }

  assignRole(id, roles) {
    const user = {
      roles: roles,
    };
    return this.http.post(environment.apiBaseURL + `/user/${id}/assign-role`, user);
  }
}
