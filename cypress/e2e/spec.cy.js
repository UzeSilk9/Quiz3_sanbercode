// 9 Test Case Login OrangeHRM - Final Version (tanpa TC_005)

describe('Feature: Login OrangeHRM (Final)', () => {
  // pakai baseUrl dari config
  const url = '/web/index.php/auth/login';

  // selector fleksibel
  const usernameSel = 'input[name="username"], input[placeholder="Username"], input#txtUsername';
  const passwordSel = 'input[name="password"], input[placeholder="Password"], input#txtPassword';
  const submitSel   = 'button[type="submit"], button:contains("Login"), button:contains("Sign in")';

  beforeEach(() => {
  cy.request('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'); 
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', {
    failOnStatusCode: false,
  });

  // langsung tunggu elemen form, bukan page load
  cy.get('input[name="username"]', { timeout: 30000 }).should('be.visible');
});


  it('TC_001 - Login valid', () => {
    cy.login('Admin', 'admin123'); // pakai custom command dari support/e2e.js
    cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
  });

  it('TC_002 - Username & password salah → gagal login', () => {
    cy.login('admim', 'admin122');
    cy.contains('Invalid credentials', { timeout: 10000 }).should('be.visible');
  });

  it('TC_003 - Field kosong → gagal login', () => {
    cy.get(submitSel).click();
    cy.contains('Required', { timeout: 10000 }).should('be.visible');
  });

  it('TC_004 - Password salah → gagal login', () => {
    cy.login('Admin', 'salahpassword');
    cy.contains('Invalid credentials', { timeout: 10000 }).should('be.visible');
  });

  it('TC_005 - Login berhasil lalu logout dan pastikan tidak bisa kembali ke dashboard', () => {
  const username = 'Admin';
  const password = 'admin123';
  const loginPath = '/web/index.php/auth/login';
  const dashboardPath = '/web/index.php/dashboard';

  // Step 1-4: Login
  cy.visit(loginPath, { timeout: 120000 });
  cy.get('input[name="username"]').clear().type(username);
  cy.get('input[name="password"]').clear().type(password);
  cy.get('button[type="submit"]').click();

  // Step 5: Pastikan di dashboard
  cy.url({ timeout: 20000 }).should('include', '/dashboard');
  cy.contains('Dashboard', { timeout: 20000 }).should('be.visible');

  // Step 6-7: Logout lewat dropdown profile
  cy.get('.oxd-userdropdown-name').click();
  cy.contains('Logout').click();

  // Step 8: Pastikan diarahkan ke login
  cy.url({ timeout: 20000 }).should('include', '/auth/login');
  cy.get('button[type="submit"]').should('be.visible');

  // Step 9: Tekan back, pastikan tidak bisa kembali ke dashboard
  cy.go('back');
  // aplikasi bisa menolak back atau mengarahkan lagi ke login — cek keduanya
  cy.location('pathname').then((path) => {
    // jika tetap di login atau redirect ke login -> valid
    expect(path).to.satisfy(p => p.includes('/auth/login') || !p.includes('/dashboard'));
  });

  // Step 10: Coba akses langsung ke dashboard, harus redirect ke login
  cy.visit(dashboardPath, { failOnStatusCode: false, timeout: 120000 });
  cy.location('pathname', { timeout: 20000 }).should('not.include', '/dashboard');
  cy.get('button[type="submit"]').should('be.visible');
});


  it('TC_006 - Username ada spasi → gagal login', () => {
    cy.login('  Admin  ', 'admin123');
    cy.contains('Invalid credentials', { timeout: 10000 }).should('be.visible');
  });

  it('TC_007 - Field password harus masked', () => {
    cy.get(passwordSel).should('have.attr', 'type', 'password');
  });

  it('TC_008 - Submit dengan tombol Enter', () => {
    cy.get(usernameSel).type('Admin');
    cy.get(passwordSel).type('admin123{enter}');
    cy.contains('Dashboard', { timeout: 15000 }).should('be.visible');
  });

  it("TC_009 - SQL injection → gagal login", () => {
    cy.login("' OR '1'='1", 'anything');
    cy.contains('Invalid credentials', { timeout: 10000 }).should('be.visible');
  });

  it('TC_010 - Input panjang tidak crash', () => {
    const longStr = 'a'.repeat(200);
    cy.login(longStr, longStr);
    cy.contains('Invalid credentials', { timeout: 10000 }).should('be.visible');
  });
});
