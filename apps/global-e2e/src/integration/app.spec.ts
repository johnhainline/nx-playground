
describe("angular-app site", () => {
  it("should visit page", () => {
    cy.visit("/");

    cy.get('h1').contains('Welcome!');
  });
});
