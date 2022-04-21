describe("Product Page", () => {
	beforeEach(() => {
		cy.visit("/login");

		cy.wait(1000);

		cy.get('input[name="email"]').type("admin@admin.com");

		cy.get('input[name="password"]').type("admin123");

		cy.get('button[type="submit"]').click();

		cy.wait(1000);

		cy.url().should("include", "/");

		cy.visit("/products/1");
	});

	afterEach(() => {
		cy.clearCookies();
		cy.reload();
	});

	it("successfully load the page", () => {
		cy.get("table")
			.should("exist")
			.find("tbody tr")
			.should("have.lengthOf", 10);
	});

	it("can desactivate product", () => {});
});
