import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardsService } from 'src/providers/dashboard.service';
import { PopupNotificationsService } from 'src/providers/popup-notifications.service';

@Component({
  selector: 'app-manage-loans',
  templateUrl: './manage-loans.component.html',
  styleUrls: ['./manage-loans.component.scss']
})
export class ManageLoansComponent implements OnInit {

  startItem: number = 0;
  endItem: number = 10;
  pendingLoans: any = [];
  completedLoans: any = [];
  loading: any;
  segment: any = 'pending';

  constructor(private router: Router, private dashboardsService: DashboardsService, private popupNotificationsService: PopupNotificationsService) { }

  ngOnInit(): void {
    this.getPendingLoans(this.startItem, this.endItem)
  }

  // Edit loan
  editLoan(loan_id) {
    this.router.navigate(['/trovilo/edit-loan', loan_id])
  }

  // Get all pending loans
  getPendingLoans(startItem, endItem) {
    this.loading = true;
    this.dashboardsService.getPendingLoans(startItem, endItem)
    .then((res: any) => {
      this.pendingLoans = res.data;
      console.log(res)
      this.getCompletedLoans(startItem, endItem)
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get all completed loans
  getCompletedLoans(startItem, endItem) {
    this.loading = true;
    this.dashboardsService.getCompletedLoans(startItem, endItem)
    .then((res: any) => {
      this.completedLoans = res.data;
      console.log(res)
      this.loading = false;
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Change segment
  changeSegment(segment) {
    this.segment = segment;
  }
  
}
