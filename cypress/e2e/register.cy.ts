import cypress from "cypress";
describe("Register new account", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Correct registration", () => {
    cy.dataCy("signupButton").click();
    cy.dataCy("registerName").type("Test Login");
    cy.dataCy("registerEmail").type("kacper@test.com");
    cy.dataCy("registerPassword").type("secretPassword1!");
    cy.dataCy("registerButton").click();
    cy.get(".mb-4").should("contain", "Checkout apartaments to buy.");
  });

  // it("Check validation after typed incorrect password", () => {
  //   cy.dataCy("signupButton").click();
  //   cy.dataCy("registerName").type("Test Login");
  //   cy.dataCy("registerEmail").type("testLogin23@test.com");
  //   cy.dataCy("registerPassword").type("secret");
  //   cy.dataCy("registerButton").click();
  //   cy.contains(
  //     "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character."
  //   ).should("be.visible");
  // });
});
