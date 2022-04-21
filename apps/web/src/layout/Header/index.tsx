import {
	Box,
	Flex,
	HStack,
	IconButton,
	useColorModeValue,
	Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import NavLink from "../NavLink";
import Link from "next/link";

import { MdPerson, MdShoppingCart, MdSearch } from "react-icons/md";
import { LinkRoutes } from "utils/linkRoutes";

type HeaderProps = {
	isOpen: boolean;
	onClose: () => void;
	onOpen: () => void;
};

const Header = ({ isOpen, onClose, onOpen }: HeaderProps) => {
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
				<HStack>
					<Link href={"#"} passHref>
						<IconButton
							variant={"ghost"}
							size={"md"}
							icon={<MdSearch size={"24"} />}
							aria-label="signIn"
						/>
					</Link>
					{/* Here should be change if the user is loged */}
					<Link href={"/login"} passHref>
						<IconButton
							variant={"ghost"}
							size={"md"}
							icon={<MdPerson size={"24"} />}
							aria-label="signIn"
						/>
					</Link>
					<Link href={"#"} passHref>
						<IconButton
							variant={"ghost"}
							size={"md"}
							icon={<MdShoppingCart size={"24"} />}
							aria-label="signIn"
						/>
					</Link>
				</HStack>
			</Flex>
		</Box>
	);
};

export default Header;
