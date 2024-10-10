describe('Home page', () => {
  it('should display the home page', () => {
    cy.visit('/')
    cy.get('li').should('contain', 'Save and see your changes instantly.')
  })
})
