class LoginPage {
// Selectors
usernameInput() { return cy.get('input[name="username"]') }
passwordInput() { return cy.get('input[name="password"]') }
loginButton() { return cy.get('button[type="submit"]') }
alertError() { return cy.get('.oxd-alert-content') }
topbarTitle() { return cy.get('.oxd-topbar-header-title') }
userDropdown() { return cy.get('.oxd-userdropdown-name') }
logoutButton() { return cy.contains('Logout') }


// Actions
visit() { cy.visit('/') }
fillUsername(username) { this.usernameInput().clear().type(username) }
fillPassword(password) { this.passwordInput().clear().type(password) }
clickLogin() { this.loginButton().click() }


// Combined action
login(username, password) {
this.visit()
this.fillUsername(username)
this.fillPassword(password)
this.clickLogin()
}


// Logout action (simple approach)
logout() {
this.userDropdown().click()
this.logoutButton().click()
}


// Assertions (helpers)
shouldSeeDashboard() { this.topbarTitle().should('be.visible') }
shouldSeeLoginError() { this.alertError().should('be.visible') }
}


module.exports = new LoginPage()