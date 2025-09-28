// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// You can use this space to add custom commands
// or override existing ones.
//
// ***********************************************************

// Abaikan error JS dari aplikasi (contoh: OrangeHRM demo sering error API di dashboard)
// Abaikan error JS dari aplikasi OrangeHRM
Cypress.on('uncaught:exception', () => false);

// Custom command login
Cypress.Commands.add('login', (username, password) => {
  const usernameSel = 'input[name="username"], input[placeholder="Username"], input#txtUsername';
  const passwordSel = 'input[name="password"], input[placeholder="Password"], input#txtPassword';
  const submitSel   = 'button[type="submit"], button:contains("Login"), button:contains("Sign in")';

  cy.get(usernameSel, { timeout: 10000 }).clear().type(username);
  cy.get(passwordSel, { timeout: 10000 }).clear().type(password);
  cy.get(submitSel, { timeout: 10000 }).click();
});


// Kamu bisa tambahkan command custom di sini kalau perlu
// contoh:
// Cypress.Commands.add('login', (username, password) => {
//   cy.get('input[name="username"]').type(username);
//   cy.get('input[name="password"]').type(password);
//   cy.get('button[type="submit"]').click();
// });
