import { Box, useDisclosure } from "@chakra-ui/react";
import { ReactNode } from "react";
import DrawerApp from "./Drawer";
import Header from "./Header";

type LayoutProps = {
	children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	return (
		<Box>
			<Header isOpen={isOpen} onClose={onClose} onOpen={onOpen} />
			<DrawerApp isOpen={isOpen} onClose={onClose} />
			<>{children}</>
		</Box>
	);
};

export default Layout;
