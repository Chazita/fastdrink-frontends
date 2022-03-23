import { MdTopic, MdHome, MdPersonAddAlt1 } from "react-icons/md";
import { LinkItemsProps } from "types/LinkItemsProps";
import { Box, Text, Flex, BoxProps, CloseButton } from "@chakra-ui/react";

import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

export const LinkItems: LinkItemsProps[] = [
	{ name: "Inicio", icon: MdHome, path: "/" },
	{ name: "Crear Admins", icon: MdPersonAddAlt1, path: "/create-admin" },
	{ name: "Productos", icon: MdTopic, path: "/products/1" },
	{ name: "Data Extra", icon: MdTopic, path: "/extra-data" },
];

function SidebarContent({ onClose, ...rest }: SidebarProps) {
	return (
		<Box
			transition="1s ease"
			borderRight="1px"
			borderRightColor="gray.700"
			w={{ base: "full", md: "60" }}
			pos="fixed"
			h="full"
			{...rest}
		>
			<Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
				<Text fontSize="2xl" fontWeight="bold">
					Fast Drink
				</Text>
				<CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
			</Flex>
			{LinkItems.map((link) => (
				<NavItem
					key={link.name}
					icon={link.icon}
					path={link.path}
					onClose={onClose}
				>
					{link.name}
				</NavItem>
			))}
		</Box>
	);
}

export default SidebarContent;
