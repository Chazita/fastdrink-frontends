import { MdTopic, MdHome } from "react-icons/md";
import { LinkItemsProps } from "types/LinkItemsProps";
import { Box, Text, Flex, BoxProps, CloseButton } from "@chakra-ui/react";

import NavItem from "./NavItem";

interface SidebarProps extends BoxProps {
	onClose: () => void;
}

export const LinkItems: LinkItemsProps[] = [
	{ name: "Inicio", icon: MdHome, path: "/" },
	{ name: "Productos", icon: MdTopic, path: "/products/1" },
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
