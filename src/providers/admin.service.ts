import { Injectable } from '@angular/core';
import { urls } from './system.constants';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class AdminService {

  constructor(private http: HttpService) { }

  // Get admin profile details
  getAdminProfileDetails(user_id: string) {
    const url = urls.admin + '/' + user_id;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
         resolve(res);
      }, err => {
         reject(err);
      })
    }) 	    
  }

  // Get all active admins
  getAllActiveAdmins() {
    const url = urls.admin + '/' + 'all' + '/' + 'active';
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
         resolve(res);
      }, err => {
         reject(err);
      })
    })
  }

  // Get all admins
  getAllAdmins(startItem: string, endItem: string) {
    const url = urls.admin + '/' + 'all' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
         resolve(res);
      }, err => {
         reject(err);
      })
    })
  }

}