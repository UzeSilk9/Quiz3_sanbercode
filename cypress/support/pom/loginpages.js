class LoginPage {
  // =====================
  // Selectors
  // =====================
  usernameInput() { return cy.get('input[name="username"]') }
  passwordInput() { return cy.get('input[name="password"]') }
  loginButton() { return cy.get('button[type="submit"]') }
  alertError() { return cy.get('.oxd-alert-content') }
  topbarTitle() { return cy.get('.oxd-topbar-header-title') }
  userDropdown() { return cy.get('.oxd-userdropdown-name') }
  logoutButton() { return cy.contains('Logout') }

  // Forgot/Reset Password selectors
  forgotPasswordLink() { return cy.get('.orangehrm-login-forgot-header') }
  resetUsernameInput() { return cy.get('input[name="username"]') }
  resetSubmitButton() { return cy.get('button[type="submit"]') }
  resetConfirmationMessage() { return cy.get('.oxd-alert-content-text') }

  // =====================
  // Actions
  // =====================

  // Visit login page
  visit() { cy.visit('/') }

  // Login actions
  fillUsername(username) { this.usernameInput().clear().type(username) }
  fillPassword(password) { this.passwordInput().clear().type(password) }
  clickLogin() { this.loginButton().click() }

  // Combined login
  login(username, password) {
    this.visit()
    this.fillUsername(username)
    this.fillPassword(password)
    this.clickLogin()
  }

  // Logout action
  logout() {
    this.userDropdown().should('be.visible').click({ force: true })
    this.logoutButton().should('be.visible').click({ force: true })
  }

  // Forgot / Reset Password actions
  clickForgotPassword() {
    this.forgotPasswordLink().should('be.visible').click({ force: true })
  }
  fillResetUsername(username) {
    this.resetUsernameInput().clear().type(username)
  }
  clickResetSubmit() {
    this.resetSubmitButton().click()
  }

  // =====================
  // Assertions / Helpers
  // =====================

  shouldSeeDashboard() {
    this.topbarTitle().should('be.visible')
  }

  shouldSeeLoginError() {
    this.alertError().should('be.visible')
  }

  shouldSeeResetPasswordPage() {
    this.resetUsernameInput().should('be.visible')
  }

 shouldSeeResetConfirmation() {
  // Cukup verifikasi bahwa URL sekarang ada di halaman sendPasswordReset
  cy.url().should('include', '/auth/sendPasswordReset')
}
}

module.exports = new LoginPage()
