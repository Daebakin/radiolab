import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { EditLoanLimitDialog } from "src/app/pages/platform/trovilo/edit-users/edit-users.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import {MatChipsModule} from '@angular/material/chips';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatExpansionModule,
    MatButtonModule,
    MatChipsModule,
    NgbModule,
    MatAutocompleteModule,
  ],
  declarations: [
    EditLoanLimitDialog,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AdminLayoutModule {}
