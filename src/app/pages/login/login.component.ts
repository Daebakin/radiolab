import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/providers/auth.service';
import { PopupNotificationsService } from 'src/providers/popup-notifications.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: any;
  password: any;
  loading: boolean = false;

  constructor(private popupNotificationsService: PopupNotificationsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  validateForm() {
    if (!this.email || !this.password) {
      this.popupNotificationsService.showNotification('top', 'center', 'All fields are required!');
      return;
    }
    const postData = {
      email: this.email,
      password: this.password
    }
    this.proceed(postData)
  }

  proceed(postData) {
    this.loading = true;
    this.authService.signIn(postData)
    .then((res: any) => {
      this.loading = false;
      // Save to localStorag
      this.saveToLocalStorage(res)
      this.router.navigate(['/trovilo/dashboard'])
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Save to localStorage
  saveToLocalStorage(data) {
    localStorage.setItem('user_id', data.user.user_id);
    localStorage.setItem('level', data.user.level);
    localStorage.setItem('basic_token', data.user.basic_token)
  }

}
