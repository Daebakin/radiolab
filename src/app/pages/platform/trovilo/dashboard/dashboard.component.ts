import { Component, OnInit } from "@angular/core";
import { DashboardsService } from "src/providers/dashboard.service";
import { PopupNotificationsService } from "src/providers/popup-notifications.service";
import { UserService } from "src/providers/user.service";


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  loading: boolean = true;
  pendingLoans: any = [];
  outstandingLoans: any = [];
  dueTodayLoans: any = [];
  overdueLoans: any = [];
  startItem: number = 0;
  endItem: number = 5;
  overdueLoansLength: any = 0;
  todayDate = Date.now();
  pendingLoansLength: any = 0;
  conversion_rates: any = [];
  usersLength: any = 0;
  statusCount: any = 0;

  constructor(private userService: UserService, private dashboardsService: DashboardsService, private popupNotificationsService: PopupNotificationsService) {}

  ngOnInit(): void {
    this.getPendingLoans(this.startItem, this.endItem)
  }

  // Get all pending loans
  getPendingLoans(startItem, endItem) {
    this.loading = true;
    this.dashboardsService.getAllPendingLoans(startItem, endItem)
    .then((res: any) => {
      this.pendingLoans = res.data;
      this.getOustandingLoans(startItem, endItem);
    })
    .catch(err => {
      this.loading = false;
      this.getOustandingLoans(startItem, endItem);
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get all outstanding loans
  getOustandingLoans(startItem, endItem) {
    this.loading = true;
    this.dashboardsService.getAllOustandingLoans(startItem, endItem)
    .then((res: any) => {
      this.outstandingLoans = res.data;
      this.getLoansDueToday(startItem, endItem);
    })
    .catch(err => {
      this.loading = false;
      this.getLoansDueToday(startItem, endItem);
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Loans due today
  getLoansDueToday(startItem, endItem) {
    this.loading = true;
    this.dashboardsService.getAllLoansDueToday()
    .then((res: any) => {
      this.dueTodayLoans = res;
      this.getOverdueLoans(startItem, endItem);
    })
    .catch(err => {
      this.loading = false;
      this.getOverdueLoans(startItem, endItem);
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get loans overdued
  getOverdueLoans(startItem, endItem) {
    this.loading = true;
    this.dashboardsService.getAllOverdueLoans(startItem, endItem)
    .then((res: any) => {
      this.overdueLoans = res.data;
      this.overdueLoansLength = res.total_items;
      this.getConversionRates()
    })
    .catch(err => {
      this.loading = false;
      this.getConversionRates()
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get conversion rate
  getConversionRates() {
    this.dashboardsService.getConversionRates("NGN")
    .then((res: any) => {
      this.conversion_rates = res;
      this.getUsers(this.startItem, this.endItem)
    })
    .catch(err => {
      this.loading = false;
      this.getUsers(this.startItem, this.endItem)
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get users
  getUsers(startItem, endItem) {
    this.loading = true;
    this.userService.getUsers('TROVILO', startItem, endItem)
    .then((res: any) => {
      this.usersLength = res.total_items;
      this.getTroviloProfilesCount();
    })
    .catch(err => {
      this.loading = false;
      this.getTroviloProfilesCount();
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get trovilo profiles
  getTroviloProfilesCount() {
    this.loading = true;
    this.userService.getTroviloProfilesCount()
    .then((res: any) => {
      this.statusCount = res.count;
      this.loading = false;
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Load more items
  goNext(segment) {
    if (this.startItem >= 0) {
      this.startItem = this.startItem + 10;
      this.endItem = this.endItem + 10;
      if (segment == 'pendingLoans') {
        return this.getPendingLoans(this.startItem, this.endItem)
      }
      if (segment == 'overdueLoans') {
        return this.getOverdueLoans(this.startItem, this.endItem)
      }
      if (segment == 'outstandingLoans') {
        return this.getOustandingLoans(this.startItem, this.endItem)
      }
      if (segment == 'loanDueToday') {
        return this.getLoansDueToday(this.startItem, this.endItem)
      }
    }
  }

  // Load more items
  goBack(segment) {
    if (this.startItem > 0) {
      this.startItem = this.startItem - 10;
      this.endItem = this.endItem - 10;
      if (segment == 'pendingLoans') {
        return this.getPendingLoans(this.startItem, this.endItem)
      }
      if (segment == 'overdueLoans') {
        return this.getOverdueLoans(this.startItem, this.endItem)
      }
      if (segment == 'outstandingLoans') {
        return this.getOustandingLoans(this.startItem, this.endItem)
      }
      if (segment == 'loanDueToday') {
        return this.getLoansDueToday(this.startItem, this.endItem)
      }
    }
  }
}

