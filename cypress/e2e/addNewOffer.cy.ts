import cypress from "cypress";
describe("Add new offer", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.fixture("user").then((user) => {
      cy.login(user.email, user.password);
    });
  });
  it("Create offer for rent", () => {
    cy.dataCy("settingsDropdown").click();
    cy.dataCy("createButton").click();
    cy.dataCy("nameInput").type("New flat for rent");
    cy.dataCy("metersInput").clear().type("65");
    cy.dataCy("bedsInput").clear().type("4");
    cy.dataCy("bathsInput").clear().type("2");
    cy.dataCy("parkingButtonYes").click();
    cy.dataCy("addressTextarea").type("Warsaw, ul. Aleje Jerozolimskie 188");
    cy.dataCy("descriptionTextarea").type("Test rent");
    cy.dataCy("priceInput").clear().type("4200");
    cy.dataCy("createListingButton").click();
    cy.dataCy("listingItem").should("be.visible").and("have.length", "1");
  });

  it("Create offer for sell", () => {
    cy.dataCy("settingsDropdown").click();
    cy.dataCy("createButton").click();
    cy.dataCy("nameInput").type("New flat for rent");
    cy.dataCy("metersInput").clear().type("65");
    cy.dataCy("bedsInput").clear().type("4");
    cy.dataCy("bathsInput").clear().type("2");
    cy.dataCy("parkingButtonYes").click();
    cy.dataCy("addressTextarea").type("Warsaw, ul. Aleje Jerozolimskie 188");
    cy.dataCy("descriptionTextarea").type("Test rent");
    cy.dataCy("priceInput").clear().type("4200");
    cy.dataCy("createListingButton").click();
    cy.dataCy("listingItem").should("be.visible").and("have.length", "1");
  });
});
