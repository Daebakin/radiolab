import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { PopupNotificationsService } from './popup-notifications.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private headers;
  constructor(
    private http: HttpClient, 
    private popupNotificationsService: PopupNotificationsService,
    private router: Router,
    ) {
      this.headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('Accept-Version', '2.0.0')
      .set('Role', 'admin');
  }


  // API get method
  async get(url, version) {
    return new Promise((resolve, reject) => {
      if (!url) reject({ error: { message: "URL is missing" } });
      if (!version) reject({ error: { message: "URL is missing" } });
      this.headers.set('accept-version', version);
      var token = localStorage.getItem('basic_token');
      this.http.get(url, {'headers': this.headers.set('Authorization', `${token}`)})
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          if (err.status == 409) {
            return this.logOut()
          }
          reject(err)
        });
    });
  }

  // API post method
  async post(url, version, postdata) {
    return new Promise((resolve, reject) => {
      if (!url) reject({ error: { message: "URL is missing" } });
      if (!version) reject({ error: { message: "URL is missing" } });
      this.headers.set('accept-version', version);
      var token = localStorage.getItem('basic_token');
      this.http.post(url, postdata, {'headers': this.headers.set('Authorization', `${token}`)}) 
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          if (err.status == 409) {
            return this.logOut()
          }
          reject(err);
        })
    })
  }

  // API put method
  async put(url, version, postdata) {
    return new Promise((resolve, reject) => {
      if (!url) reject({ error: { message: "URL is missing" } });
      if (!version) reject({ error: { message: "URL is missing" } });
      this.headers.set('accept-version', version);
      var token = localStorage.getItem('basic_token');
      this.http.put(url, postdata, {'headers': this.headers.set('Authorization', `${token}`)}) 
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          if (err.status == 409) {
            return this.logOut()
          }
          reject(err);
        })
    })
  }

  // API delete method
  async delete(url, version) {
    return new Promise((resolve, reject) => {
      if (!url) reject({ error: { message: "URL is missing" } });
      if (!version) reject({ error: { message: "URL is missing" } });
      this.headers.set('accept-version', version);
      var token = localStorage.getItem('basic_token');
      this.http.delete(url, {'headers': this.headers.set('Authorization', `${token}`)}) 
        .subscribe((res: any) => {
          resolve(res);
        }, err => {
          if (err.status == 409) {
            return this.logOut()
          }
          reject(err);
        })
    })
  }
  
  // Auto-logout user
  logOut() {
    this.clearStorage();
    this.router.navigate(['/login']);
    this.popupNotificationsService.showNotification('top', 'center', "Session has expired, Try logging in again");
  }

  // Clear all storage
  clearStorage() {
    localStorage.clear();
  }

}
