import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class PopupNotificationsService {

	constructor(private toastr: ToastrService) { }

  // Show notification
  showNotification(position, align, message) {
    const color = Math.floor((Math.random() * 5) + 1);

    switch(color){
      case 1:
      this.toastr.info('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ' + message, '', {
         closeButton: true,
         enableHtml: true,
         timeOut: 5000,
         toastClass: "alert alert-info alert-with-icon",
         positionClass: 'toast-' + position + '-' +  align
       });
      break;
      case 2:
      this.toastr.success('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ' + message, '', {
         closeButton: true,
         enableHtml: true,
         timeOut: 5000,
         toastClass: "alert alert-success alert-with-icon",
         positionClass: 'toast-' + position + '-' +  align
       });
      break;
      case 3:
      this.toastr.warning('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ' + message, '', {
         closeButton: true,
         enableHtml: true,
         timeOut: 5000,
         toastClass: "alert alert-warning alert-with-icon",
         positionClass: 'toast-' + position + '-' +  align
       });
      break;
      case 4:
      this.toastr.error('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ' + message, '', {
         enableHtml: true,
         closeButton: true,
         timeOut: 5000,
         toastClass: "alert alert-danger alert-with-icon",
         positionClass: 'toast-' + position + '-' +  align
       });
       break;
       case 5:
       this.toastr.show('<span class="tim-icons icon-bell-55" [data-notify]="icon"></span> ' + message, '', {
          closeButton: true,
          enableHtml: true,
          timeOut: 5000,
          toastClass: "alert alert-primary alert-with-icon",
          positionClass: 'toast-' + position + '-' +  align
        });
      break;
      default:
      break;
    }
  }

}