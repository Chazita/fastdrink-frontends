import {
	Box,
	Flex,
	HStack,
	IconButton,
	useColorModeValue,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavLink from "../NavLink";

import { LinkRoutes } from "utils/linkRoutes";
import UserHeader from "./UserHeader";
import { ColorModeButton } from "ui";
import ShoppingCart from "./ShoppingCart";

type HeaderProps = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
};

const Header = ({ isOpen, onClose, onOpen }: HeaderProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	return (
		<Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
			<Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
				<IconButton
					variant={"ghost"}
					size={"md"}
					icon={<HamburgerIcon />}
					aria-label={"Open menus"}
					display={{ md: "none" }}
					onClick={isOpen ? onClose : onOpen}
				/>
				<HStack spacing={8} alignItems={"center"}>
					<Text fontSize={"2xl"}>Fast Drink</Text>
					<HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
						{LinkRoutes.map((value) => (
							<NavLink key={value.path} path={value.path}>
								{value.name}
							</NavLink>
						))}
					</HStack>
				</HStack>
				<Flex direction={"row"} gap={"2"}>
					<UserHeader />
					<ShoppingCart />
					<ColorModeButton
						colorMode={colorMode}
						onClick={toggleColorMode}
						variant="ghost"
						d={{ base: "none", md: "inline-flex" }}
					/>
				</Flex>
			</Flex>
		</Box>
	);
};

export default Header;
