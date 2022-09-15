import { Injectable } from '@angular/core';
import { urls } from '../providers/system.constants';
import { HttpService } from '../providers/http.service';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpService) { }

  // Sign in
  signIn(credentials) {
    const url = urls.admin_login;
    return new Promise((resolve, reject) => {
      this.http.post(url, '2.0.0', credentials)
      .then((res: any) => {
         resolve(res);
      }, err => {
         reject(err);
      })
    })
  }

  // Sign out
  signOut(user_id: string) {
    const url = urls.logout + '/' + user_id;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
        .then((res: any) => {
          resolve(res);
        }, err => {
          resolve(err);
      })
    })
  }

  // Reset password
  resetPassword(user_id: string, postData) {
    const url = urls.change_password + '/' + user_id;
    return new Promise((resolve, reject) => {
      this.http.post(url, '2.0.0', postData)
        .then((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
      })
    })
  }

  // Request verification code
  requestSMSVerificationCode(postData) {
    var email = postData.email;
    const url = urls.verification + '/' + email;
    return new Promise((resolve, reject) => {
      this.http.post(url, '2.0.0', postData)
        .then((res: any) => {
          resolve(res);
        }, err => {
          reject(err);
      })
    })
  }

  // Get device token
  getToken() {
    return !!localStorage.getItem('basic_token')
  }


}