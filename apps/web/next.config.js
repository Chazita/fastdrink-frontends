const withTM = require("next-transpile-modules")(["ui", "shared"]);

module.exports = withTM({
	reactStrictMode: true,
});
