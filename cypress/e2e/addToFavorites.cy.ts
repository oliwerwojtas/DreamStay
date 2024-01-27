import cypress from "cypress";
describe("Favorites", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("user").then((user) => {
      cy.login(user.email, user.password);
    });
  });
  it("Add to favorites", () => {

    cy.get(
      ".#root > div:nth-child(2) > div:nth-child(2) > div:nth-child(2) > div > div:nth-child(1) > li > button"
    ).click();
  });
});
