import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PopupNotificationsService } from 'src/providers/popup-notifications.service';
import { UserService } from 'src/providers/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  closeResult: string;
  users: any = [];
  all_users: any = [];
  startItem: number = 0;
  endItem: number = 10;
  loading: boolean = true;
  search: any;

  constructor(private popupNotificationsService: PopupNotificationsService, private router: Router, private userService: UserService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getAllUsers()
    this.getUsers(this.startItem, this.endItem)
  }

  // Open searchbar
  open(content) {
    this.modalService.open(content, {windowClass: 'modal-search'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  // Get dismiss event
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

  // Get users
  getUsers(startItem, endItem) {
    this.loading = true;
    this.userService.getUsers('TROVILO', startItem, endItem)
    .then((res: any) => {
      this.users = res.data;
      this.loading = false;
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get all users (BACKGROUND RUN)
  getAllUsers() {
    this.userService.getAllUsers('TROVILO')
    .then((res: any) => {
      this.all_users = res.data;
    })
  }

  // Load more items
  goNext() {
    if (this.startItem >= 0) {
      this.startItem = this.startItem + 10;
      this.endItem = this.endItem + 10;
      this.getUsers(this.startItem, this.endItem)
    }
  }

  // Load more items
  goBack() {
    if (this.startItem > 0) {
      this.startItem = this.startItem - 10;
      this.endItem = this.endItem - 10;
      this.getUsers(this.startItem, this.endItem)
    }
  }

  // Search for items
  searchItem(searchTerm) {
    this.modalService.dismissAll()
    this.users = this.all_users.filter(result => {
      if (result.first_name && result.last_name && result.email && searchTerm) {
          return (result.first_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || result.last_name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1 || result.email.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
      }
    });
  }

  // Refresh table
  refresh() {
    this.users = this.all_users.slice(this.startItem, this.endItem)
  }

  // Manage user
  manageUser(user) {
    this.router.navigate(['trovilo/edit-users', user.user_id])
  }


}
