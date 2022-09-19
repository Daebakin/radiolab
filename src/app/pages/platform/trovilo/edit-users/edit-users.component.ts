import { Component, Inject, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import Chart from 'chart.js';
import { PopupNotificationsService } from 'src/providers/popup-notifications.service';
import { UserService } from 'src/providers/user.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  loan_limit
}

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  year: Date = new Date();
  user_id: any;
  loading: boolean = true;
  loader: boolean = false;
  public user: any = {};
  public profile: any = {};
  transactions: any = [];
  total_transactions_daily: any;
  total_transactions_monthly: any;
  transactions_total_items: any = 0;
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  startItem: number = 0;
  endItem: number = 10;
  profile_score: any;
  wallet: any = {};
  virtual_accounts: any = [];
  virtual_cards: any = [];
  loan_limits: any = {};
  loan_types: any = [];

  segment: any = 'pending';
  pendingLoans: any = [];
  completedLoans: any = [];
  pendingLoansLength: any = 0;
  completedLoansLength: any = 0;

  constructor(public dialog: MatDialog, private router: Router, private location: Location, private route: ActivatedRoute, private userService: UserService, private popupNotificationsService: PopupNotificationsService) {
    this.route.params.subscribe(params => {
      this.user_id = params['user_id'];
      if (this.user_id) {
        this.getCompleteProfile(this.user_id)
      } else {
        this.goBackNavigation()
      }
    })
  }

  ngOnInit() {

  }

  // Go back
  goBackNavigation() {
    this.location.back()
  }

  // Change segment
  changeSegment(segment) {
    this.segment = segment;
    if (segment == 'pending') {
      this.getPendingLoans(this.user_id, this.startItem, this.endItem)
    } else {
      this.getCompletedLoans(this.user_id, this.startItem, this.endItem)
    }
  }

  // Load more items
  goLoansNext(segment) {
    if (this.startItem >= 0) {
      this.startItem = this.startItem + 10;
      this.endItem = this.endItem + 10;
      if (segment == 'pending') {
        this.getPendingLoans(this.user_id, this.startItem, this.endItem)
      } else {
        this.getCompletedLoans(this.user_id, this.startItem, this.endItem)
      }
    }
  }

  // Load more items
  goLoansBack(segment) {
    if (this.startItem > 0) {
      this.startItem = this.startItem - 10;
      this.endItem = this.endItem - 10;
      if (segment == 'pending') {
        this.getPendingLoans(this.user_id, this.startItem, this.endItem)
      } else {
        this.getCompletedLoans(this.user_id, this.startItem, this.endItem)
      }
    }
  }

  // Get complete profile
  getCompleteProfile(user_id) {
    this.loading = true;
    this.userService.getUserProfile(user_id)
    .then((res: any) => {
      this.user = res.user;
      this.profile = res.profile;
      this.profile_score = res.profile_score;
      this.loading = false;
      localStorage.setItem('user_currency', this.profile.country_currency_short)
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }

  // Get transactions
  getTransactions(user_id, startItem, endItem) {
    this.loader = true;
    this.userService.getUserTransactions(user_id, startItem, endItem)
    .then((res: any) => {
      this.transactions = res.data;
      this.transactions_total_items = res.total_items;
      this.loader = false;
    })
    .catch(err => {
      this.loader = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }
  
  // Load more items
  goNext() {
    if (this.startItem >= 0) {
      this.startItem = this.startItem + 10;
      this.endItem = this.endItem + 10;
      this.getTransactions(this.user_id, this.startItem, this.endItem);
    }
  }

  // Load more items
  goBack() {
    if (this.startItem > 0) {
      this.startItem = this.startItem - 10;
      this.endItem = this.endItem - 10;
      this.getTransactions(this.user_id, this.startItem, this.endItem);
    }
  }

  // Tab is changed
  onTabChanged(index) {
    if (index == 0) {

    } 
    if (index == 1) {
      return this.getLimits(this.user_id, this.startItem, this.endItem);
    }
    if (index == 2) {
      return this.getTransactions(this.user_id, this.startItem, this.endItem);
    }
  }

  // Get loan limits
  getLimits(user_id, startItem, endItem) {
    this.loader = true;
    this.userService.getLoanLimits(user_id)
    .then((res: any) => {
      this.loan_limits = res;
      this.loan_types = res.types;
      this.loader = false;
      this.getPendingLoans(user_id, startItem, endItem);
    })
    .catch(err => {
      this.loader = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }

  // Get pending loans
  getPendingLoans(user_id, startItem, endItem) {
    this.loader = true;
    this.userService.getPendingLoans(user_id, startItem, endItem)
    .then((res: any) => {
      this.pendingLoans = res.data;
      this.pendingLoansLength = res.total_items;
      console.log(res)
      this.loader = false;
    })
    .catch(err => {
      this.loader = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }

  // Get completed loans
  getCompletedLoans(user_id, startItem, endItem) {
    this.loader = true;
    this.userService.getCompletedLoans(user_id, startItem, endItem)
    .then((res: any) => {
      this.completedLoans = res.data;
      this.completedLoansLength = res.total_items;
      console.log(res)
      this.loader = false;
    })
    .catch(err => {
      this.loader = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }

  // Calculate total transactions
  calculateTransactions(daily, monthly) {
    this.total_transactions_daily = Number(daily.sun || 0) + Number(daily.mon || 0) + Number(daily.tue || 0) + Number(daily.wed || 0) + Number(daily.thu || 0) + Number(daily.fri || 0) + Number(daily.sat || 0);
    this.total_transactions_monthly = Number(monthly.jan || 0) + Number(monthly.feb || 0) + Number(monthly.mar || 0) + Number(monthly.apr || 0) + Number(monthly.may || 0) + Number(monthly.jun || 0) + Number(monthly.jul || 0) + Number(monthly.aug || 0) + Number(monthly.sep || 0) + Number(monthly.oct || 0) + Number(monthly.nov || 0) + Number(monthly.dec || 0);
  }

  // Save user data
  save() {
    delete this.user["_id"];
    delete this.profile["_id"];
    delete this.user["user_id"];
    delete this.profile["user_id"];
    var postData = {
      ...this.user,
      ...this.profile
    };
    this.loading = true;
    this.userService.updateCompleteUserProfile(this.user_id, postData)
    .then((res: any) => {
      console.log(res)
      this.getCompleteProfile(this.user_id)
      this.popupNotificationsService.showNotification('top', 'center', "User updated successfully!");   
    })
    .catch(err => {
      this.getCompleteProfile(this.user_id)
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");   
    })
  }


  // Edit loan
  editLoan(loan_id) {
    this.router.navigate(['/trovilo/edit-loan', loan_id])
  }

  // Open loan limit dialog
  openLoanLimitDialog(loan_limit, item): void {
    var dialogRef = this.dialog.open(EditLoanLimitDialog, {
      width: '250px',
      data: { data: item },
    });
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (result.event == 'yes') {
          console.log(result.data)
          for (var i = 0; i <= loan_limit.types.length - 1; i++) {
            if (loan_limit.types[i].name == item.name) {
              loan_limit.types.splice(i, 1);
            }
          }
          loan_limit.types.push(result.data);
          return this.updateLoanLimit(loan_limit)
        }
      }
    });
  }

  // Update loan limit
  updateLoanLimit(data) {
    this.loader = true;
    this.userService.updateLoanLimit(this.user_id, data)
    .then((res: any) => {
      this.getLimits(this.user_id, this.startItem, this.endItem);
      this.popupNotificationsService.showNotification('top', 'center', "Loan limit updated successfully!");   
    })
    .catch(err => {
      this.getLimits(this.user_id, this.startItem, this.endItem);
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");   
    }) 
  }

}


@Component({
  selector: 'edit-loan-limit-dialog',
  templateUrl: '../../../../components/dialogs/edit-loan-limit-dialog.html',
})
export class EditLoanLimitDialog {
  constructor(
    public dialogRef: MatDialogRef<EditLoanLimitDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    console.log(data)
  }

  // Remove item from array
  removeItem(period: number, data) {
    var duration = data.data.duration;
    console.log(duration)
    for (var i = 0; i <= duration.length - 1; i ++) {
      if (duration[i].period == period) {
        duration.splice(i, 1);
      }
    }
  }

  // Period is selected
  periodIsSelected(period: number, data) {
    var duration = data.data.duration;
    for (var i = 0; i <= duration.length - 1; i ++) {
      if (duration[i].period == period) {
        duration.splice(i, 1);
      }
    }
    duration.push({ duration: "days", period: period })
  }

  // Close modal
  closeModal(event, data): void {
    this.dialogRef.close({
     event, data
    });
  }

}