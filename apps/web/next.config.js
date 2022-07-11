const withTM = require("next-transpile-modules")(["ui", "shared"]);
/**
 * @type {import('next').NextConfig}
 */
module.exports = withTM({
	reactStrictMode: true,
	env: {
		API_URL: "https://localhost:7134/api",
	},
});
