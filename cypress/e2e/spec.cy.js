describe("URL Shortener User Flows", () => {
  context("when the API call is successful", () => {
    beforeEach(() => {
      cy.intercept("GET", "http://localhost:3001/api/v1/urls", {
        statusCode: 200,
        fixture: "urls.json",
      }).as("urls");

      cy.visit("localhost:3000");
      cy.wait(["@urls"])
    });

    it("should display urls", () => {
      cy.contains("h1", "URL Shortener")
      cy.get(".url").should("have.length", 1);
    });
  });
});
