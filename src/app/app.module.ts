import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { MatNativeDateModule } from '@angular/material/core';

import {MatAutocompleteModule} from '@angular/material/autocomplete'; 
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { UsersComponent } from './pages/platform/trovilo/users/users.component';
import { DashboardComponent } from './pages/platform/trovilo/dashboard/dashboard.component';

import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MyTasksComponent } from './pages/my-tasks/my-tasks.component';
import { EditUsersComponent } from './pages/platform/trovilo/edit-users/edit-users.component';
import { LoginComponent } from './pages/login/login.component';
import {MatDialogModule} from '@angular/material/dialog'; 
import {MatButtonModule} from '@angular/material/button';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatExpansionModule} from '@angular/material/expansion';
import { AppSettingsComponent } from './pages/platform/trovilo/app-settings/app-settings.component';
import { ManageAdminComponent } from './pages/manage-admin/manage-admin.component';
import { TransactionHistoryComponent } from './pages/platform/trovilo/transaction-history/transaction-history.component';
import { ManageLoansComponent } from './pages/platform/trovilo/manage-loans/manage-loans.component';
import { EditLoansComponent } from './pages/platform/trovilo/edit-loans/edit-loans.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    MatChipsModule,
    MatIconModule,
    MatTabsModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatNativeDateModule,
    MatButtonModule,
    MatDialogModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, UsersComponent, DashboardComponent, MyTasksComponent, EditUsersComponent, LoginComponent, AppSettingsComponent, ManageAdminComponent, TransactionHistoryComponent, ManageLoansComponent, EditLoansComponent],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
