import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const TROVILOROUTES: RouteInfo[] = [
  {
    path: "/trovilo/dashboard",
    title: "Dashboard",
    rtlTitle: "",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/trovilo/users",
    title: "Users",
    rtlTitle: "",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/trovilo/manage-loans",
    title: "Manage Loans",
    rtlTitle: "",
    icon: "icon-money-coins",
    class: ""
  },
  {
    path: "/trovilo/transaction-history",
    title: "Transaction History",
    rtlTitle: "",
    icon: "icon-notes",
    class: ""
  },
  {
    path: "/manage-admin",
    title: "Manage Admin",
    rtlTitle: "",
    icon: "icon-settings-gear-63",
    class: ""
  },
];

export const TROVILOROUTES2: RouteInfo[] = [
  {
    path: "/trovilo/dashboard",
    title: "Dashboard",
    rtlTitle: "",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/trovilo/users",
    title: "Users",
    rtlTitle: "",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/my-tasks",
    title: "My Tasks",
    rtlTitle: "",
    icon: "icon-chart-pie-36",
    class: ""
  },
    {
      path: "/tables",
      title: "Table List",
      rtlTitle: "قائمة الجدول",
      icon: "icon-puzzle-10",
      class: ""
    },
  {
    path: "/dashboard",
    title: "Dashboard",
    rtlTitle: "لوحة القيادة",
    icon: "icon-chart-pie-36",
    class: ""
  },
  {
    path: "/icons",
    title: "Icons",
    rtlTitle: "الرموز",
    icon: "icon-atom",
    class: ""
  },
  {
    path: "/maps",
    title: "Maps",
    rtlTitle: "خرائط",
    icon: "icon-pin",
    class: "" },
  {
    path: "/notifications",
    title: "Notifications",
    rtlTitle: "إخطارات",
    icon: "icon-bell-55",
    class: ""
  },

  {
    path: "/user",
    title: "User Profile",
    rtlTitle: "ملف تعريفي للمستخدم",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/tables",
    title: "Table List",
    rtlTitle: "قائمة الجدول",
    icon: "icon-puzzle-10",
    class: ""
  },
  {
    path: "/typography",
    title: "Typography",
    rtlTitle: "طباعة",
    icon: "icon-align-center",
    class: ""
  },
  {
    path: "/rtl",
    title: "RTL Support",
    rtlTitle: "ار تي ال",
    icon: "icon-world",
    class: ""
  }
];
// export const ROUTES: RouteInfo[] = [
//   {
//     path: "/dashboard",
//     title: "Dashboard",
//     rtlTitle: "لوحة القيادة",
//     icon: "icon-chart-pie-36",
//     class: ""
//   },
//   {
//     path: "/icons",
//     title: "Icons",
//     rtlTitle: "الرموز",
//     icon: "icon-atom",
//     class: ""
//   },
//   {
//     path: "/maps",
//     title: "Maps",
//     rtlTitle: "خرائط",
//     icon: "icon-pin",
//     class: "" },
//   {
//     path: "/notifications",
//     title: "Notifications",
//     rtlTitle: "إخطارات",
//     icon: "icon-bell-55",
//     class: ""
//   },

//   {
//     path: "/user",
//     title: "User Profile",
//     rtlTitle: "ملف تعريفي للمستخدم",
//     icon: "icon-single-02",
//     class: ""
//   },
//   {
//     path: "/tables",
//     title: "Table List",
//     rtlTitle: "قائمة الجدول",
//     icon: "icon-puzzle-10",
//     class: ""
//   },
//   {
//     path: "/typography",
//     title: "Typography",
//     rtlTitle: "طباعة",
//     icon: "icon-align-center",
//     class: ""
//   },
//   {
//     path: "/rtl",
//     title: "RTL Support",
//     rtlTitle: "ار تي ال",
//     icon: "icon-world",
//     class: ""
//   }
// ];

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  troviloMenu: any[];

  constructor() {}

  ngOnInit() {
    this.troviloMenu = TROVILOROUTES.filter(menuItem => menuItem);
    // this.menuItems = TROVILOROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
