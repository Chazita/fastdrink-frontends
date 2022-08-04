import {
	Avatar,
	Button,
	Drawer,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	useColorMode,
	VStack,
	Text,
	Menu,
	MenuButton,
} from "@chakra-ui/react";

import { ColorModeButton } from "ui";

import NavLink from "../NavLink";
import { LinkRoutes } from "utils/linkRoutes";
import { MdLogin, MdOutlineKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";
import { useContext } from "react";
import { UserContext } from "contexts/userContext";
import UserMenuItems from "layout/UserMenuItems";

type DrawerAppProps = {
	isOpen: boolean;
	onClose: () => void;
};

const DrawerApp = ({ isOpen, onClose }: DrawerAppProps) => {
	const { colorMode, toggleColorMode } = useColorMode();
	const { userInfo } = useContext(UserContext);
	return (
		<Drawer
			autoFocus={false}
			isOpen={isOpen}
			onClose={onClose}
			onOverlayClick={onClose}
			placement="left"
		>
			<DrawerContent>
				<DrawerHeader>
					<ColorModeButton
						colorMode={colorMode}
						onClick={toggleColorMode}
						variant="unstyled"
					/>
				</DrawerHeader>
				<DrawerCloseButton />
				<DrawerBody>
					<VStack mt={"10"} alignItems={"flex-start"}>
						{LinkRoutes.map((value) => (
							<NavLink
								mb={"3"}
								key={value.path}
								path={value.path}
								onClick={onClose}
							>
								{value.name}
							</NavLink>
						))}
					</VStack>
				</DrawerBody>
				<DrawerFooter
					display={"flex"}
					justifyContent={userInfo !== undefined ? "space-between" : "center"}
				>
					{userInfo !== undefined ? (
						<>
							<Avatar
								size="md"
								name={
									userInfo ? `${userInfo.lastName} ${userInfo.firstName}` : ""
								}
							/>
							<VStack alignItems="flex-start" spacing="1px" ml="2px">
								<Text fontSize="lg">{`${userInfo.lastName} ${userInfo.firstName}`}</Text>
								<Text fontSize="sm" color="gray.600">
									{userInfo.email}
								</Text>
							</VStack>
							<Menu closeOnSelect>
								<MenuButton>
									<MdOutlineKeyboardArrowUp size={"30"} />
								</MenuButton>
								<UserMenuItems mb={"5"} />
							</Menu>
						</>
					) : (
						<Link href={"/login"} passHref>
							<Button
								leftIcon={<MdLogin size={"24"} />}
								variant="link"
								onClick={onClose}
								mb={"1"}
							>
								Iniciar Sesion
							</Button>
						</Link>
					)}
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
};

export default DrawerApp;
