import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { LoaderComponent } from './loader/loader.component';

import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { NoResultComponent } from './no-result/no-result.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@NgModule({
  imports: [CommonModule, MatChipsModule, MatProgressSpinnerModule, MatProgressBarModule, MatDatepickerModule, MatTabsModule, MatIconModule, RouterModule, NgbModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, LoaderComponent, NoResultComponent, ProgressBarComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent, LoaderComponent, ProgressBarComponent, NoResultComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class ComponentsModule {}
