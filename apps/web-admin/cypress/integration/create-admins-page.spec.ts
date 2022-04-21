describe("The Create Admin Page", () => {
	beforeEach(() => {
		cy.visit("/login");

		cy.wait(1000);

		cy.get('input[name="email"]').type("admin@admin.com");

		cy.get('input[name="password"]').type("admin123");

		cy.get('button[type="submit"]').click();

		cy.wait(1000);

		cy.url().should("include", "/");

		cy.visit("/create-admin");
	});

	afterEach(() => {
		cy.clearCookies();
		cy.reload();
	});

	it("successfully loads", () => {
		cy.get('input[name="email"]').should("exist");
		cy.get('input[name="password"]').should("exist");
		cy.get('input[name="confirmPassword"]').should("exist");
		cy.get('input[name="firstName"]').should("exist");
		cy.get('input[name="lastName"]').should("exist");
		cy.get('button[type="submit"]').should("exist");
	});

	it("check validations", () => {
		cy.get('button[type="submit"]').click();

		// first validation
		cy.get('div[id="field-6-feedback"]')
			.should("exist")
			.should("contain", "El Correo Electrónico es requerido.");
		cy.get('div[id="field-7-feedback"]')
			.should("exist")
			.should("contain", "La Contraseña es requerida.");
		cy.get('div[id="field-8-feedback"]')
			.should("exist")
			.should("contain", "La confirmacion de la Contraseña es requerida.");
		cy.get('div[id="field-9-feedback"]')
			.should("exist")
			.should("contain", "El Nombre es requerido.");
		cy.get('div[id="field-10-feedback"]')
			.should("exist")
			.should("contain", "El Apellido es requerido.");

		// second validation
		cy.get('input[name="email"]').type("asd@.com");
		cy.get('input[name="password"]').type(
			"asdklñjasklñjdasjklñdasjlkdñasjkldkasdklñjasjkldas"
		);
		cy.get('input[name="confirmPassword"]').type(
			"asdklñjasklñjdasjklñdasjlkdñasjkldkasdklñjasjkldas"
		);
		cy.get('input[name="firstName"]').type(
			"sñadklfjsdañlkjasdfñlkasdjfñalksdfjasdñfkljasdfñlksdjfñklasjdfasdkflj"
		);
		cy.get('input[name="lastName"]').type(
			"sñadklfjsdañlkjasdfñlkasdjfñalksdfjasdñfkljasdfñlksdjfñklasjdfasdkflj"
		);
		cy.get('button[type="submit"]').click();

		cy.get('div[id="field-6-feedback"]').should(
			"contain",
			"El Correo Electrónico no es valido."
		);
		cy.get('div[id="field-7-feedback"]').should(
			"contain",
			"El maximo de caracteres es 24."
		);
		cy.get('div[id="field-8-feedback"]').should(
			"contain",
			"El maximo de caracteres es 24."
		);
		cy.get('div[id="field-9-feedback"]').should(
			"contain",
			"El Nombre debe tener como maximo 40 caracteres."
		);
		cy.get('div[id="field-10-feedback"]').should(
			"contain",
			"El Apellido debe tener como maximo 40 caracteres."
		);

		// third validation

		cy.get('input[name="password"]').clear().type("asd");
		cy.get('input[name="confirmPassword"]').clear().type("asd");

		cy.get('div[id="field-7-feedback"]').should(
			"contain",
			"El minimo de caracteres es 4."
		);
		cy.get('div[id="field-8-feedback"]').should(
			"contain",
			"El minimo de caracteres es 4."
		);

		// four validation

		cy.get('input[name="password"]').clear().type("password1234");
		cy.get('input[name="confirmPassword"]').clear().type("password1235");

		cy.get('div[id="field-8-feedback"]').should(
			"contain",
			"Las Contraseñas no son identicas."
		);
	});

	it("successfully create a new admin", () => {
		cy.get('input[name="email"]').type("newAdmin@admin.com");
		cy.get('input[name="password"]').type("admin123");
		cy.get('input[name="confirmPassword"]').type("admin123");
		cy.get('input[name="firstName"]').type("newAdmin");
		cy.get('input[name="lastName"]').type("Admin");
		cy.get('button[type="submit"]')
			.click()
			.then(() => {
				cy.get('div[id="chakra-toast-portal"]').should(
					"contain.text",
					"Cuenta creada."
				);
			});
	});

	// it("failed to create a new admin", () => {
	// 	cy.get('input[name="email"]').type("admin@admin.com");
	// 	cy.get('input[name="password"]').type("admin123");
	// 	cy.get('input[name="confirmPassword"]').type("admin123");
	// 	cy.get('input[name="firstName"]').type("admin");
	// 	cy.get('input[name="lastName"]').type("admin");
	// 	cy.get('button[type="submit"]').click();

	// 	cy.wait(500);

	// 	cy.get('div[id="chakra-toast-portal"]').should(
	// 		"contain.text",
	// 		"Cuenta creada."
	// 	);
	// });
});
