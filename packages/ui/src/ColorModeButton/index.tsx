import { ButtonProps, Button, ColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface ColorModeButtonProps extends ButtonProps {
	colorMode: ColorMode;
}

const ColorModeButton = ({ colorMode, ...props }: ColorModeButtonProps) => {
	return <Button {...props}>{colorMode ? <MoonIcon /> : <SunIcon />}</Button>;
};

export default ColorModeButton;
