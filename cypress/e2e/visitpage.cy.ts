import cypress from "cypress";

describe("example to-do app", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/welcome");
  });

  it("displays two todo items by default", () => {
    cy.get('[data-cy="loginButton"]').click();
  });
});
