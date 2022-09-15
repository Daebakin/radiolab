import { Routes } from "@angular/router";

//import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";
// import { RtlComponent } from "../../pages/rtl/rtl.component";

// Added Routes
import { UsersComponent } from "src/app/pages/platform/trovilo/users/users.component";
import { DashboardComponent } from "src/app/pages/platform/trovilo/dashboard/dashboard.component";
import { EditUsersComponent } from "src/app/pages/platform/trovilo/edit-users/edit-users.component";
import { AuthGuard } from "src/providers/authGuard.service";
import { ManageAdminComponent } from "src/app/pages/manage-admin/manage-admin.component";
import { TransactionHistoryComponent } from "src/app/pages/platform/trovilo/transaction-history/transaction-history.component";
import { ManageLoansComponent } from "src/app/pages/platform/trovilo/manage-loans/manage-loans.component";
import { EditLoansComponent } from "src/app/pages/platform/trovilo/edit-loans/edit-loans.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
  { path: "maps", component: MapComponent },
  { path: "notifications", component: NotificationsComponent },
  { path: "user", component: UserComponent },
  { path: "tables", component: TablesComponent },
  { path: "typography", component: TypographyComponent },

  //Added Routes

  { path: "trovilo/dashboard", canActivate: [AuthGuard], component: DashboardComponent },
  { path: "trovilo/users", canActivate: [AuthGuard], component: UsersComponent },
  { path: "trovilo/edit-users/:user_id", canActivate: [AuthGuard], component: EditUsersComponent },
  { path: "manage-admin", canActivate: [AuthGuard], component: ManageAdminComponent },
  { path: "trovilo/transaction-history", canActivate: [AuthGuard], component: TransactionHistoryComponent },
  { path: "trovilo/manage-loans", canActivate: [AuthGuard], component: ManageLoansComponent },
  { path: "trovilo/edit-loan/:loan_id", canActivate: [AuthGuard], component: EditLoansComponent },

  // { path: "rtl", component: RtlComponent }
];
