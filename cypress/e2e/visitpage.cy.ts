import cypress from "cypress";

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("/welcome");
  });

  it("displays two todo items by default", () => {
    cy.get('[data-cy="loginButton"]').click();
  });
});
