import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import Chart from 'chart.js';
import { PopupNotificationsService } from 'src/providers/popup-notifications.service';
import { UserService } from 'src/providers/user.service';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.scss']
})
export class EditUsersComponent implements OnInit {

  year: Date = new Date();
  user_id: any;
  loading: boolean = true;
  loader: boolean = false;
  public user: any = {};
  public profile: any = {};
  transactions: any = [];
  total_transactions_daily: any;
  total_transactions_monthly: any;
  transactions_total_items: any = 0;
  public canvas : any;
  public ctx;
  public datasets: any;
  public data: any;
  public myChartData;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  public clicked2: boolean = false;
  startItem: number = 0;
  endItem: number = 10;
  profile_score: any;
  wallet: any = {};
  virtual_accounts: any = [];
  virtual_cards: any = [];
  loan_limits: any = {};
  loan_types: any = [];

  segment: any = 'pending';
  pendingLoans: any = [];
  completedLoans: any = [];
  pendingLoansLength: any = 0;
  completedLoansLength: any = 0;

  constructor(private location: Location, private route: ActivatedRoute, private userService: UserService, private popupNotificationsService: PopupNotificationsService) {
    this.route.params.subscribe(params => {
      this.user_id = params['user_id'];
      if (this.user_id) {
        this.getCompleteProfile(this.user_id)
      } else {
        this.goBackNavigation()
      }
    })
  }

  ngOnInit() {

  }

  // Go back
  goBackNavigation() {
    this.location.back()
  }

  // Change segment
  changeSegment(segment) {
    this.segment = segment;
    if (segment == 'pending') {
      this.getPendingLoans(this.user_id, this.startItem, this.endItem)
    } else {
      this.getCompletedLoans(this.user_id, this.startItem, this.endItem)
    }
  }

  // Load more items
  goLoansNext(segment) {
    if (this.startItem >= 0) {
      this.startItem = this.startItem + 10;
      this.endItem = this.endItem + 10;
      if (segment == 'pending') {
        this.getPendingLoans(this.user_id, this.startItem, this.endItem)
      } else {
        this.getCompletedLoans(this.user_id, this.startItem, this.endItem)
      }
    }
  }

  // Load more items
  goLoansBack(segment) {
    if (this.startItem > 0) {
      this.startItem = this.startItem - 10;
      this.endItem = this.endItem - 10;
      if (segment == 'pending') {
        this.getPendingLoans(this.user_id, this.startItem, this.endItem)
      } else {
        this.getCompletedLoans(this.user_id, this.startItem, this.endItem)
      }
    }
  }

  // Update options
  public updateOptions() {
    this.myChartData.data.datasets[0].data = this.data;
    this.myChartData.update();
  }

  // Get complete profile
  getCompleteProfile(user_id) {
    this.loading = true;
    this.userService.getUserProfile(user_id)
    .then((res: any) => {
      this.user = res.user;
      this.profile = res.profile;
      this.profile_score = res.profile_score;
      this.getWallet(user_id)
      this.loading = false;
      localStorage.setItem('user_currency', this.profile.country_currency_short)
    })
    .catch(err => {
      this.loading = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }

  // Get transactions
  getTransactions(user_id, startItem, endItem) {
    this.loader = true;
    this.userService.getUserTransactions(user_id, startItem, endItem)
    .then((res: any) => {
      this.transactions = res.data;
      this.transactions_total_items = res.total_items;
      this.loader = false;
    })
    .catch(err => {
      this.loader = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }
  
  // Get user wallet
  getWallet(user_id) {
    this.loader = true;
    this.userService.getWallet(user_id)
    .then((res: any) => {
      this.wallet = res;
      this.virtual_accounts = res.virtual_accounts;
      this.virtual_cards = res.virtual_cards;
      this.loader = false;
      this.getChartData(user_id)
      console.log(res)
    })
    .catch(err => {
      this.loader = false;
      this.getChartData(user_id)
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    })
  }

  // Get chart data
  getChartData(user_id) {
    this.loading = true;
    this.userService.getTransactionsActivity(user_id)
    .then((res: any) => {
      setTimeout(() => {
        this.createChart(res);
      }, 100)
      this.loading = false;
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
      this.getTransactions(this.user_id, this.startItem, this.endItem);
    }
  }

  // Load more items
  goBack() {
    if (this.startItem > 0) {
      this.startItem = this.startItem - 10;
      this.endItem = this.endItem - 10;
      this.getTransactions(this.user_id, this.startItem, this.endItem);
    }
  }

  // Create charts
  createChart(data) {
    this.createChartOne(data.monthly || {});
    this.createChartTwo(data.daily || {});
    this.createChartThree(data.monthly || {});
    this.calculateTransactions(data.daily, data.monthly)
  }

  // Tab is changed
  onTabChanged(index) {
    if (index == 0) {

    } 
    if (index == 1) {
      
    }
    if (index == 2) {
      return this.getLimits(this.user_id, this.startItem, this.endItem);
    }
    if (index == 3) {
      return this.getTransactions(this.user_id, this.startItem, this.endItem);
    }
    if (index == 4) {
      
    }
  }

  // Get loan limits
  getLimits(user_id, startItem, endItem) {
    this.loader = true;
    this.userService.getLoanLimits(user_id)
    .then((res: any) => {
      this.loan_limits = res;
      this.loan_types = res.types;
      this.loader = false;
      this.getPendingLoans(user_id, startItem, endItem);
    })
    .catch(err => {
      this.loader = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }

  // Get pending loans
  getPendingLoans(user_id, startItem, endItem) {
    this.loader = true;
    this.userService.getPendingLoans(user_id, startItem, endItem)
    .then((res: any) => {
      this.pendingLoans = res.data;
      this.pendingLoansLength = res.total_items;
      console.log(res)
      this.loader = false;
    })
    .catch(err => {
      this.loader = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }

  // Get completed loans
  getCompletedLoans(user_id, startItem, endItem) {
    this.loader = true;
    this.userService.getCompletedLoans(user_id, startItem, endItem)
    .then((res: any) => {
      this.completedLoans = res.data;
      this.completedLoansLength = res.total_items;
      console.log(res)
      this.loader = false;
    })
    .catch(err => {
      this.loader = false;
      this.popupNotificationsService.showNotification('top', 'center', err.error.message || "Connection error!");
    }) 
  }

  // Calculate total transactions
  calculateTransactions(daily, monthly) {
    this.total_transactions_daily = Number(daily.sun || 0) + Number(daily.mon || 0) + Number(daily.tue || 0) + Number(daily.wed || 0) + Number(daily.thu || 0) + Number(daily.fri || 0) + Number(daily.sat || 0);
    this.total_transactions_monthly = Number(monthly.jan || 0) + Number(monthly.feb || 0) + Number(monthly.mar || 0) + Number(monthly.apr || 0) + Number(monthly.may || 0) + Number(monthly.jun || 0) + Number(monthly.jul || 0) + Number(monthly.aug || 0) + Number(monthly.sep || 0) + Number(monthly.oct || 0) + Number(monthly.nov || 0) + Number(monthly.dec || 0);
  }

  // Create chart one
  createChartOne(data) {
    var chart_labels = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    this.datasets = [
      [data.jan || 0, data.feb || 0, data.mar || 0, data.apr || 0, data.may || 0, data.jun || 0, data.jul || 0, data.aug || 0, data.sep || 0, data.oct || 0, data.nov || 0, data.dec || 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
    this.data = this.datasets[0];
    this.canvas = document.getElementById("chartBig1");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, 'rgba(233,32,16,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(233,32,16,0.0)');
    gradientStroke.addColorStop(0, 'rgba(233,32,16,0)');
    var config = {
      type: 'line',
      data: {
        labels: chart_labels,
        datasets: [{
          label: "Transactions (" + this.profile.country_currency_short + ")",
          fill: true,
          backgroundColor: gradientStroke,
          borderColor: '#ec250d',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          pointBackgroundColor: '#ec250d',
          pointBorderColor: 'rgba(255,255,255,0)',
          pointHoverBackgroundColor: '#ec250d',
          pointBorderWidth: 20,
          pointHoverRadius: 4,
          pointHoverBorderWidth: 15,
          pointRadius: 4,
          data: this.data,
        }]
      },
      options: gradientChartOptionsConfigurationWithTooltipRed
    };
    this.myChartData = new Chart(this.ctx, config);
  }

  // Create chart two
  createChartTwo(data) {
    this.canvas = document.getElementById("chartLineGreen");
    this.ctx = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, 'rgba(66,134,121,0.15)');
    gradientStroke.addColorStop(0.4, 'rgba(66,134,121,0.0)'); //green colors
    gradientStroke.addColorStop(0, 'rgba(66,134,121,0)');
    var chartData = {
      labels: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
      datasets: [{
        label: "Daily Transactions (" + this.profile.country_currency_short + ")",
        fill: true,
        backgroundColor: gradientStroke,
        borderColor: '#00d6b4',
        borderWidth: 2,
        borderDash: [],
        borderDashOffset: 0.0,
        pointBackgroundColor: '#00d6b4',
        pointBorderColor: 'rgba(255,255,255,0)',
        pointHoverBackgroundColor: '#00d6b4',
        pointBorderWidth: 20,
        pointHoverRadius: 4,
        pointHoverBorderWidth: 15,
        pointRadius: 4,
        data: [data.sun || 0, data.mon || 0, data.tue || 0, data.wed || 0, data.thu || 0, data.fri || 0, data.sat || 0],
      }]
    };
    var myChart = new Chart(this.ctx, {
      type: 'line',
      data: chartData,
      options: gradientChartOptionsConfigurationWithTooltipGreen
    });
  }

  createChartThree(data) {
    this.canvas = document.getElementById("CountryChart");
    this.ctx  = this.canvas.getContext("2d");
    var gradientStroke = this.ctx.createLinearGradient(0, 230, 0, 50);
    gradientStroke.addColorStop(1, 'rgba(29,140,248,0.2)');
    gradientStroke.addColorStop(0.4, 'rgba(29,140,248,0.0)');
    gradientStroke.addColorStop(0, 'rgba(29,140,248,0)');
    var myChart = new Chart(this.ctx, {
      type: 'bar',
      responsive: true,
      legend: {
        display: false
      },
      data: {
        labels: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
        datasets: [{
          label: "Yearly Transactions (" + this.profile.country_currency_short + ")",
          fill: true,
          backgroundColor: gradientStroke,
          hoverBackgroundColor: gradientStroke,
          borderColor: '#1f8ef1',
          borderWidth: 2,
          borderDash: [],
          borderDashOffset: 0.0,
          data: [data.jan || 0, data.feb || 0, data.mar || 0, data.apr || 0, data.may || 0, data.jun || 0, data.jul || 0, data.aug || 0, data.sep || 0, data.oct || 0, data.nov || 0, data.dec || 0],
        }]
      },
      options: gradientBarChartConfiguration
    });
  }

}



/* CHART JS CONFIGURATION STARTS */



// Gradient tooltip RED
export var gradientChartOptionsConfigurationWithTooltipRed: any = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#9a9a9a",
        callback: function(value, index, values) {
					return localStorage.getItem('user_currency') + ' ' + value.toLocaleString();
				}
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(233,32,16,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a"
      }
    }]
  }
};

// Gradient tooltip ORANGE
export var gradientChartOptionsConfigurationWithTooltipOrange: any = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 50,
        suggestedMax: 110,
        padding: 20,
        fontColor: "#ff8a76",
        callback: function(value, index, values) {
					return localStorage.getItem('user_currency') + ' ' + value.toLocaleString();
				}
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(220,53,69,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#ff8a76"
      }
    }]
  }
};

// Gradient tooltip PURPLE
export var gradientChartOptionsConfigurationWithTooltipPurple: any = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#9a9a9a",
        callback: function(value, index, values) {
					return localStorage.getItem('user_currency') + ' ' + value.toLocaleString();
				}
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(225,78,202,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9a9a9a"
      }
    }]
  }
};

// Gradient tooltip BLUE
export var gradientChartOptionsConfigurationWithTooltipBlue: any = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#2380f7",
        callback: function(value, index, values) {
					return localStorage.getItem('user_currency') + ' ' + value.toLocaleString();
				}
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#2380f7"
      }
    }]
  }
};

// Gradient tooltip GREEN
export var gradientChartOptionsConfigurationWithTooltipGreen: any = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.0)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 50,
        suggestedMax: 125,
        padding: 20,
        fontColor: "#9e9e9e",
        callback: function(value, index, values) {
					return localStorage.getItem('user_currency') + ' ' + value.toLocaleString();
				}
      }
    }],

    xAxes: [{
      barPercentage: 1.6,
      gridLines: {
        drawBorder: false,
        color: 'rgba(0,242,195,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9e9e9e"
      }
    }]
  }
};

// Gradient bar chart configuration
export var gradientBarChartConfiguration: any = {
  maintainAspectRatio: false,
  legend: {
    display: false
  },

  tooltips: {
    backgroundColor: '#f5f5f5',
    titleFontColor: '#333',
    bodyFontColor: '#666',
    bodySpacing: 4,
    xPadding: 12,
    mode: "nearest",
    intersect: 0,
    position: "nearest"
  },
  responsive: true,
  scales: {
    yAxes: [{

      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        suggestedMin: 60,
        suggestedMax: 120,
        padding: 20,
        fontColor: "#9e9e9e",
        callback: function(value, index, values) {
					return localStorage.getItem('user_currency') + ' ' + value.toLocaleString();
				}
      }
    }],

    xAxes: [{

      gridLines: {
        drawBorder: false,
        color: 'rgba(29,140,248,0.1)',
        zeroLineColor: "transparent",
      },
      ticks: {
        padding: 20,
        fontColor: "#9e9e9e"
      }
    }]
  }
};

/* CHART JS CONFIGURATION ENDS */