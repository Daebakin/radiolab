import { Component, OnInit, Pipe } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { DashboardsService } from 'src/providers/dashboard.service';
import { PopupNotificationsService } from 'src/providers/popup-notifications.service';
import { UserService } from 'src/providers/user.service';

@Component({
  selector: 'app-edit-loans',
  templateUrl: './edit-loans.component.html',
  styleUrls: ['./edit-loans.component.scss']
})
export class EditLoansComponent implements OnInit {

  loan_id: any;
  loading: boolean = true;
  loan: any = {};
  user: any = {};

  constructor(private router: Router, private userService: UserService, private popupNotificationsService: PopupNotificationsService, private dashboardsService: DashboardsService, private location: Location, private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.loan_id = params['loan_id'];
      console.log(this.loan_id)
      if (this.loan_id) {
        this.getLoanDetails(this.loan_id)
      } else {
        this.goBackNavigation()
      }
    })
   }

  ngOnInit(): void {
  }

  // Go back
  goBackNavigation() {
    this.location.back()
  }

  // Go to user profile
  goToUserProfile(user_id) {
    this.router.navigate(['/trovilo/edit-users', user_id])
  }

  // Get loan details
  getLoanDetails(loan_id) {
    this.loading = true;
    this.dashboardsService.getLoanDetails(loan_id)
    .then((res: any) => {
      this.loan = res;
      console.log(res)
      this.getUserProfile(res.user_id);
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get user profile
  getUserProfile(user_id) {
    this.loading = true;
    this.userService.getUserProfile(user_id)
    .then((res: any) => {
      this.user = res.user;
      console.log(res)
      this.loading = false;
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Update loan
  updateLoan() {
    this.loading = true;
    this.userService.updateLoan(this.loan_id, this.loan)
    .then((res: any) => {
      console.log(res)
      this.loading = false;
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Delete loan
  deleteLoan() {
    this.loading = true;
    this.userService.deleteLoan(this.loan_id)
    .then((res: any) => {
      console.log(res)
      this.loading = false;
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })  }

}
