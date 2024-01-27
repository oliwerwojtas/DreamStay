import cypress from "cypress";
describe("Login to", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Correct login", () => {
    cy.dataCy("loginButton").click();
    cy.fixture("user").then((user) => {
      cy.dataCy("emailLogin").type(user.email);
      cy.dataCy("passwordLogin").type(user.password);
    });
    cy.dataCy("login-submit").click();
    cy.get(".mb-4").should("contain", "Checkout apartaments to buy.");
    cy.contains("Login successful!").should("be.visible");
  });

  it("Incorrect login data", () => {
    cy.dataCy("loginButton").click();
    cy.dataCy("emailLogin").type("Login");
    cy.dataCy("passwordLogin").type("Password");
    cy.dataCy("login-submit").click();
    cy.contains("Invalid email address").should("be.visible");
  });

  it("Login without password", () => {
    cy.dataCy("loginButton").click();
    cy.dataCy("emailLogin").type("login@login.pl");
    cy.dataCy("login-submit").click();
    cy.contains("Password is required").should("be.visible");
  });
});
