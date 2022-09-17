import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/providers/admin.service';
import { PopupNotificationsService } from 'src/providers/popup-notifications.service';

@Component({
  selector: 'app-manage-admin',
  templateUrl: './manage-admin.component.html',
  styleUrls: ['./manage-admin.component.scss']
})
export class ManageAdminComponent implements OnInit {

  loading: any = true;
  admin: any = {};
  user_id: any;
  admin_users: any = [];
  startItem: number = 0;
  endItem: number = 10;

  constructor(private adminService: AdminService, private popupNotificationsService: PopupNotificationsService) { 
    this.getDataFromStorage();
  }

  ngOnInit(): void {
    this.getAdminProfile();
  }
  
  // Get data from storage
  getDataFromStorage() {
    this.user_id = localStorage.getItem('user_id');
  }

  // Get admin profile
  getAdminProfile() {
    this.loading = true;
    this.adminService.getAdminProfileDetails(this.user_id)
    .then((res: any) => {
      this.admin = res;
      this.admin.password = atob(res.password);
      this.loading = false;
      console.log(res)
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }
  
  // Submit 
  submit() {
    return this.updateAdmin();
  }

  // Update admin
  updateAdmin() {
    this.loading = true;
    this.adminService.updateAdmin(this.user_id, this.admin)
    .then((res: any) => {
      this.loading = false;
      this.ngOnInit();
      this.popupNotificationsService.showNotification('top', 'center', "Admin updated successfully!");
      console.log(res)
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

}
