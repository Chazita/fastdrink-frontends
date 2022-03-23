import { Box, Drawer, DrawerContent, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";

import Header from "./Header";
import SidebarContent from "./Sidebar";

type Props = {
	children: ReactNode;
};

export default function Layout({ children }: Props) {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box minH="100vh">
			<SidebarContent
				onClose={() => onClose}
				display={{ base: "none", md: "block" }}
			/>
			<Drawer
				autoFocus={false}
				isOpen={isOpen}
				placement="left"
				onClose={onClose}
				returnFocusOnClose={false}
				onOverlayClick={onClose}
				size="full"
			>
				<DrawerContent bg="gray.800">
					<SidebarContent onClose={onClose} />
				</DrawerContent>
			</Drawer>
			<Header onOpen={onOpen} />
			<Box ml={{ base: 0, md: 60 }} p="4" h="100%">
				{children}
			</Box>
		</Box>
	);
}
