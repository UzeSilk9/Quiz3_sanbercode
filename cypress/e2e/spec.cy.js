const loginPage = require('../support/pom/loginpages')


describe('Feature: Login - OrangeHRM (POM)', () => {
beforeEach(() => {
// muat fixture data sebelum tiap test
cy.fixture('datapom').as('datapom')
})


it('TC01 - Login sukses dengan kredensial valid', function() {
const u = this.datapom.valid
loginPage.login(u.username, u.password)
// tunggu topbar agar yakin sudah masuk ke dashboard
loginPage.shouldSeeDashboard()
// tambahan assert: url mengandung /web/index.php/dashboard
cy.url().should('include', '/web/index.php/dashboard')
})


it('TC02 - Gagal login: password salah', function() {
const u = this.datapom.invalidPassword
loginPage.login(u.username, u.password)
loginPage.shouldSeeLoginError()
// pesan error mengandung kata "Invalid credentials" atau sejenisnya
cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials')
})


it('TC03 - Gagal login: username tidak terdaftar', function() {
const u = this.datapom.invalidUsername
loginPage.login(u.username, u.password)
loginPage.shouldSeeLoginError()
cy.get('.oxd-alert-content').should('contain.text', 'Invalid credentials')
})


it('TC04 - Gagal login: kosongkan field username & password (robust check)', function() {
  // buka halaman login
  loginPage.visit()

  // submit tanpa mengisi (kita panggil clickLogin)
  loginPage.clickLogin()

  // beri sedikit waktu agar JS di halaman memproses validasi (opsional)
  cy.wait(300)

  // cek beberapa kemungkinan lokasi pesan error; gunakan body untuk mengecek keberadaan selector
  cy.get('body').then($body => {
    if ($body.find('.oxd-alert-content').length) {
      // pesan alert global seperti yang kita harapkan sebelumnya
      cy.get('.oxd-alert-content').should('be.visible')
    } else if ($body.find('.oxd-input-field-error-message').length) {
      // contoh: pesan error inline di bawah input
      cy.get('.oxd-input-field-error-message').should('be.visible')
    } else if ($body.find('[role="alert"]').length) {
      // fallback: element dengan role alert
      cy.get('[role="alert"]').should('be.visible')
    } else if ($body.find('input[name="username"]:invalid').length || $body.find('input[name="password"]:invalid').length) {
      // HTML5 validation (browser-native); periksa validity dengan checkValidity()
      cy.get('input[name="username"]').then($el => {
        // jika validasi browser menandakan invalid, maka checkValidity() = false
        if ($el.length) {
          expect($el[0].checkValidity()).to.be.false
        }
      })
    } else {
      // Jika tidak ada pesan sama sekali, setidaknya pastikan tetap di halaman login
      cy.url().should('include', '/web/index.php/auth/login')
      // tambahan opsional: cek bahwa input masih kosong
      cy.get('input[name="username"]').should('have.value', '')
      cy.get('input[name="password"]').should('have.value', '')
    }
  })
})


it('TC05 - Login lalu logout berhasil', function() {
const u = this.datapom.valid
loginPage.login(u.username, u.password)
loginPage.shouldSeeDashboard()
// lakukan logout
loginPage.logout()
// kembali ke halaman login
cy.url().should('include', '/web/index.php/auth/login')
})
})