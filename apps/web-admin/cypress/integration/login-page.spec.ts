describe("The Login Page", () => {
	beforeEach(() => {
		cy.visit("/");
	});

	it("successfully loads", () => {
		cy.contains("Iniciar Sesión");

		cy.get("form")
			.get('input[name="email"]')
			.get('input[name="password"]')
			.get('button[type="submit"]');
	});

	it("check validations", () => {
		cy.get('button[type="submit"]').click();

		cy.get('div[id="field-1-feedback"]').should(
			"contain",
			"El Correo Electrónico es requerido."
		);
		cy.get('div[id="field-2-feedback"]').should(
			"contain",
			"La Contraseña es requerida."
		);

		cy.get('input[name="email"]').type("nonvalid.com");
		cy.get('input[name="password"]').type("12");
		cy.get('button[type="submit"]').click();

		cy.get('div[id="field-1-feedback"]').should(
			"contain",
			"El Correo Electrónico no es valido."
		);
		cy.get('div[id="field-2-feedback"]').should(
			"contain",
			"El minimo de caracteres es 4."
		);

		cy.get('input[name="password"]')
			.clear()
			.type("asdlkñasjdasñlkdjañklsdjklñsadjñklaasdasdjñklsdjkñl");
		cy.get('button[type="submit"]').click();

		cy.get('div[id="field-2-feedback"]').should(
			"contain",
			"El maximo de caracteres es 24."
		);
		cy.get('input[name="email"]').clear().type("fake@fake.com");
		cy.get('input[name="password"]').clear().type("12342");
	});

	it("failed the login", () => {
		cy.get('input[name="email"]').type("fake@fake.com");

		cy.get('input[name="password"]').type("fake1234");

		cy.get('button[type="submit"]')
			.click()
			.then(() => {
				cy.get('div[id="chakra-toast-portal"]').should(
					"contain",
					"Correo/Contraseña"
				);

				cy.getCookie(".FastDrinkAuth").should("not.exist");
			});
	});

	it("successfully log in", () => {
		cy.get('input[name="email"]').type("admin@admin.com");

		cy.get('input[name="password"]').type("admin123");

		cy.get('button[type="submit"]')
			.click()
			.then(() => {
				cy.url().should("include", "/");

				cy.getCookie(".FastDrinkAuth").should("exist");
			});
	});

	after(() => {
		cy.clearCookies();
	});
});
