import { Injectable } from '@angular/core';
import { urls } from './system.constants';
import { HttpService } from './http.service';

@Injectable({ providedIn: 'root' })
export class DashboardsService {

  constructor(private http: HttpService) { }

  // Create a new task
  createTask(postData) {
    const url = urls.tasks + '/' + 'task'
    return new Promise((resolve, reject) => {
      this.http.post(url, '2.0.0', postData)
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Change task status
  changeTaskStatus(task_id: string, postData) {
    const url = urls.tasks + '/' + 'task' + '/' + task_id;
    return new Promise((resolve, reject) => {
      this.http.put(url, '2.0.0', postData)
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Delete task
  deleteTask(task_id: string) {
    const url = urls.tasks + '/' + 'task' + '/' + task_id;
    return new Promise((resolve, reject) => {
      this.http.delete(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Upload a new task media
  uploadTaskMedia(postData) {
    const url = urls.tasks + '/' + 'media'
    return new Promise((resolve, reject) => {
      this.http.post(url, '2.0.0', postData)
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get all pending tasks
  loadAllPendingTasks(user_id: string, startItem: string, endItem: string) {
    const url = urls.tasks + '/' + user_id + '/' + 'pending' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get all completed tasks
  loadAllCompletedTasks(user_id: string, startItem: string, endItem: string) {
    const url = urls.tasks + '/' + user_id + '/' + 'completed' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get all tasks media
  loadAllTasksMedia(user_id: string, startItem: string, endItem: string) {
    const url = urls.tasks + '/' + user_id + '/' + 'media' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get all transactions
  getAllTransactions(startItem: number, endItem: number) {
    const url = urls.transactions + '/' + 'all' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get active loans
  getPendingLoans(startItem: number, endItem: number) {
    const url = urls.loans + '/' + 'all' + '/'  + 'pending' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get completed loans
  getCompletedLoans(startItem: number, endItem: number) {
    const url = urls.loans + '/' + 'all' + '/' + 'completed' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get all pending loans
  getAllPendingLoans(startItem: number, endItem: number) {
    const url = urls.loans + '/' + 'admin' + '/' + 'all' + '/' + 'pending' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get outstanding loans
  getAllOustandingLoans(startItem: number, endItem: number) {
    const url = urls.loans + '/' + 'admin' + '/' + 'all' + '/' + 'outstanding' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get loans due today
  getAllLoansDueToday() {
    const url = urls.loans + '/' + 'all' + '/' + 'due';
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get overdue loan
  getAllOverdueLoans(startItem: number, endItem: number) {
    const url = urls.loans + '/' + 'admin' + '/' + 'all' + '/' + 'overdue' + '/' + startItem + '/' + endItem;
    return new Promise((resolve, reject) => {
      this.http.get(url, '2.0.0')
      .then((res: any) => {
          resolve(res);
      }, err => {
          reject(err);
      })
    })
  }

  // Get conversion rates
  getConversionRates(currency: string) {
  	return new Promise((resolve, reject) => {
      this.http.get(urls.exchange_rates + '/' + 'conversion-rates' + '/' + currency, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })       
  }

  // Get loan details
  getLoanDetails(loan_id: string) {
  	return new Promise((resolve, reject) => {
      this.http.get(urls.loans + '/' + 'details' + '/' + loan_id, '1.0.0')
        .then((res: any) => {
        resolve(res);
        }, err => {
         reject(err);
      })
    })      
  }
  
}