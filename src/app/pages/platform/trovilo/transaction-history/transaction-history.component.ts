import { Component, OnInit } from '@angular/core';
import { PopupNotificationsService } from 'src/providers/popup-notifications.service';
import { DashboardsService } from '../../../../../providers/dashboard.service'
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  startItem: number = 0;
  endItem: number = 10;
  transactions: any = [];
  loading: boolean = true;

  constructor(private dashboardsService: DashboardsService, private popupNotificationsService: PopupNotificationsService) { }

  ngOnInit(): void {
    this.getTransactions(this.startItem, this.endItem)
  }

  // Get all transactions
  getTransactions(startItem, endItem) {
    this.loading = true;
    this.dashboardsService.getAllTransactions(startItem, endItem)
    .then((res: any) => {
      this.transactions = res.data;
      this.loading = false;
      console.log(res)
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Load more items
  goNext() {
    if (this.startItem >= 0) {
      this.startItem = this.startItem + 10;
      this.endItem = this.endItem + 10;
      this.getTransactions(this.startItem, this.endItem)
    }
  }

  // Load more items
  goBack() {
    if (this.startItem > 0) {
      this.startItem = this.startItem - 10;
      this.endItem = this.endItem - 10;
      this.getTransactions(this.startItem, this.endItem)
    }
  }

}
