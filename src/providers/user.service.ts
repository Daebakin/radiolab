import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { urls } from './system.constants';

@Injectable({
  providedIn: 'root'
})
export class UserService {

	constructor(private http: HttpService) { 

  }

  // Get users
  getUsers(platform: string, startItem: number, endItem: number) {
  	return new Promise((resolve, reject) => {
      this.http.get(urls.users + '/' + 'all' + '/' + platform + '/' + startItem + '/' + endItem, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Get all users
  getAllUsers(platform: string) {
  	return new Promise((resolve, reject) => {
      this.http.get(urls.users + '/' + 'all' + '/' + platform, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Get user transaction activity
  getTransactionsActivity(user_id: string) {
    return new Promise((resolve, reject) => {
      this.http.get(urls.transactions + '/' + 'activity' + '/' + user_id, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
        reject(err);
      })
    })
  }

  // Get user complete profile
  getUserProfile(user_id: string) {
  	return new Promise((resolve, reject) => {
      this.http.get(urls.profiles + '/' + 'complete' + '/' + user_id, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Get user transactions
  getUserTransactions(user_id: string, startItem: number, endItem: number) {
  	return new Promise((resolve, reject) => {
      this.http.get(urls.transactions + '/' + 'all' + '/' + user_id + '/' + startItem + '/' + endItem, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Get user wallet
  getWallet(user_id: string) {
	  return new Promise((resolve, reject) => {
      this.http.get(urls.wallets + "/" + user_id, '1.0.0')
        .then((res: any) => {
        resolve(res);
        },err => {
         reject(err);
        })
      })    
  }

  // Get loan limits
  getLoanLimits(user_id: string) {
  	return new Promise((resolve, reject) => {
      this.http.get(urls.loan_limits + '/' + user_id, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Get user pending loans
  getPendingLoans(user_id: string, startItem: string, endItem: string) {
  	return new Promise((resolve, reject) => {
      this.http.get(urls.loans + '/' + 'all' + '/' + 'pending' + '/' + user_id + '/' + startItem + '/' + endItem, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Get user completed loans
  getCompletedLoans(user_id: string, startItem: string, endItem: string) {
  	return new Promise((resolve, reject) => {
      this.http.get(urls.loans + '/' + 'all' + '/' + 'completed' + '/' + user_id + '/' + startItem + '/' + endItem, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Get Trovio profile
  getTroviloProfilesCount() {
    return new Promise((resolve, reject) => {
      this.http.get(urls.profiles + '/' + 'all' + '/' + 'status' + '/' + 'count', '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Update loan
  updateLoan(postData) {
    return new Promise((resolve, reject) => {
      this.http.put(urls.loans, '1.0.0', postData)
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Delete loan
  deleteLoan(loan_id: string) {
    return new Promise((resolve, reject) => {
      this.http.delete(urls.loans + '/' + loan_id, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }

  // Update complete user profile
  updateCompleteUserProfile(user_id: string, postData) {
    return new Promise((resolve, reject) => {
      this.http.put(urls.profiles + '/' + 'complete' + '/' + user_id, '1.0.0', postData)
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })
  }
  
}