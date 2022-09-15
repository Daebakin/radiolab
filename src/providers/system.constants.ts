// Export current api version
export const version = 'v2/';

// Current App Version
export const appVersion = '0.1.8';

// URI API Environments
export const apiUrls = {
	localhost: "http://localhost:8000/",
	development: "https://172.105.97.224:8100/",
	production: "https://172.105.97.224:3100/",
}

// API Base URL
export const baseUrl = apiUrls.localhost;

// API Routes
export const urls = {
	admin: baseUrl + version + "admin",
	users: baseUrl + version + "users",
	logout: baseUrl + version + "logout",
	change_password: baseUrl + version + "change-password",
	forgot_password: baseUrl + version + "forgot-password",
	verification: baseUrl + version + "verification",
	admin_login: baseUrl + version + "admin-login",
	tasks: baseUrl + version + "platform/flame/tasks",
	transactions: baseUrl + version + "platform/trovilo/transactions",
	profiles: baseUrl + version + "platform/trovilo/profiles",
	wallets: baseUrl + version + "platform/trovilo/wallets",
	loan_limits: baseUrl + version + "platform/trovilo/loan-limits",
	loans: baseUrl + version + "platform/trovilo/loans",
	exchange_rates: baseUrl + version + "platform/trovilo/exchange-rates",
}
