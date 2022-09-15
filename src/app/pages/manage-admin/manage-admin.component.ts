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

  // Load more items
  goNext() {
    if (this.startItem >= 0) {
      this.startItem = this.startItem + 10;
      this.endItem = this.endItem + 10;
      this.getActiveAdmins(this.startItem, this.endItem)
    }
  }

  // Load more items
  goBack() {
    if (this.startItem > 0) {
      this.startItem = this.startItem - 10;
      this.endItem = this.endItem - 10;
      this.getActiveAdmins(this.startItem, this.endItem)
    }
  }
  // Get admin profile
  getAdminProfile() {
    this.loading = true;
    this.adminService.getAdminProfileDetails(this.user_id)
    .then((res: any) => {
      this.admin = res;
      this.getActiveAdmins(this.startItem, this.endItem);
      console.log(res)
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get all active admins
  getActiveAdmins(startItem, endItem) {
    this.loading = true;
    this.adminService.getAllAdmins(startItem, endItem)
    .then((res: any) => {
      this.admin_users = res.data;
      this.loading = false;
      console.log(res)
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

}
