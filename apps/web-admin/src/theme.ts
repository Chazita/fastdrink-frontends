import { extendTheme, ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
	initialColorMode: "system",
	useSystemColorMode: false,
};

const theme = extendTheme({
	config,
	styles: {
		global: {
			"*:focus": {
				outline: " none !important",
				boxShadow: "none !important",
			},
		},
	},
});

export default theme;
