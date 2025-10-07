class loginpom {
    visit(){
        cy.visit('https://www.saucedemo.com')
    }
    inputusername(username){
        cy.get('#user-name').type(username)
    }
    inputpassword(password){
        cy.get('#password').type(password)
    }
    clicklgnbtn(){
        cy.get('.btn_action').should('be.visible')
        cy.get('.btn_action').click()
    }
    assertionlogin(){
        cy.url().should('include','inventory')
    }
}
export default new loginpom()