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
      cy.get(".url").should("have.length", 2);
    });

    it("should have a form with the correct input values", () => {
      cy.get("form").should("exist");
      cy.get('input[name="title"]').should("have.attr", "placeholder", "Title...");
      cy.get('input[name="urlToShorten"]').should("have.attr", "placeholder", "URL to Shorten...");
    });

    it("should reflect the information entered into the input fields", () => {
      cy.get('input[name="title"]').type("I am testing my tests");
      cy.get('input[name="urlToShorten"]').type("https://thisisatest.com");
      cy.get('input[name="title"]').should("have.value", "I am testing my tests");
      cy.get('input[name="urlToShorten"]').should("have.value", "https://thisisatest.com");
    });
    it("should show the new shortened URL rendered on the page", () => {
      cy.intercept("POST", "http://localhost:3001/api/v1/urls", {
        statusCode: 200,
        fixture: "post.json"
      }).as("post")
      cy.get('input[name="title"]').type("this is a post test");
      cy.get('input[name="urlToShorten"]').type("https://thisisatest.com");
      cy.get("button").click();
      cy.wait("@post");
      cy.get(".url").should("have.length", 3);
      cy.contains("h3", "this is a post test");
      cy.contains("a", "http://localhost:3001/useshorturl/9");
      cy.contains("p", "https://thisisatest.com");
    })
})
