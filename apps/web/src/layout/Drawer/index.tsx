import {
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	VStack,
} from "@chakra-ui/react";

import NavLink from "../NavLink";
import { LinkRoutes } from "utils/linkRoutes";

type DrawerAppProps = {
	isOpen: boolean;
	onClose: () => void;
};

const DrawerApp = ({ isOpen, onClose }: DrawerAppProps) => {
	return (
		<Drawer
			autoFocus={false}
			isOpen={isOpen}
			onClose={onClose}
			onOverlayClick={onClose}
			placement="left"
		>
			<DrawerContent>
				<DrawerCloseButton />
				<DrawerBody>
					<VStack mt={"10"} alignItems={"flex-start"}>
						{LinkRoutes.map((value) => (
							<NavLink key={value.path} path={value.path} onClick={onClose}>
								{value.name}
							</NavLink>
						))}
					</VStack>
				</DrawerBody>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerApp;
