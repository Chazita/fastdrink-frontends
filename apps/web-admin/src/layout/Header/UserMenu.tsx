import { useContext } from "react";
import UserContext from "contexts/userContext";
import Link from "next/link";

import {
	Avatar,
	Box,
	HStack,
	Menu,
	MenuButton,
	VStack,
	Text,
	MenuList,
	MenuItem,
	MenuDivider,
} from "@chakra-ui/react";

import {
	MdExpandMore,
	MdOutlineSettings,
	MdOutlineAccountCircle,
	MdLogout,
} from "react-icons/md";
import { LinkItemsProps } from "types";

import { useMutation, useQueryClient } from "react-query";
import axios from "axios";

const userLinks: LinkItemsProps[] = [
	{
		name: "Configuracion",
		icon: MdOutlineSettings,
		path: "/user/configuration",
	},
];

const UserMenu = () => {
	const { userInfo } = useContext(UserContext);
	const queryClient = useQueryClient();

	const signOutMutation = useMutation(
		"sign-out",
		() => {
			return axios.get("/Auth/log-out", { withCredentials: true });
		},
		{
			onSuccess: () => {
				queryClient.refetchQueries("check-admin");
			},
		}
	);

	return (
		<Menu>
			<MenuButton py="2" transition="all 0.3s" _focus={{ boxShadow: "none" }}>
				<HStack>
					<Avatar
						size="md"
						name={
							userInfo !== undefined
								? `${userInfo.lastName} ${userInfo.firstName}`
								: "a"
						}
					/>
					<VStack
						display={{ base: "none", md: "flex" }}
						alignItems="flex-start"
						spacing="1px"
						ml="2px"
					>
						<Text fontSize="sm">
							{userInfo !== undefined
								? `${userInfo.lastName} ${userInfo.firstName}`
								: ""}
						</Text>
						<Text fontSize="xs" color="gray.600">
							Admin
						</Text>
					</VStack>
					<Box display={{ base: "none", md: "flex" }}>
						<MdExpandMore />
					</Box>
				</HStack>
			</MenuButton>
			<MenuList bg="gray.800">
				{userLinks.map((value) => (
					<Link key={value.name} href={value.path} passHref>
						<MenuItem icon={<value.icon size="16px" />}>{value.name}</MenuItem>
					</Link>
				))}
				<MenuDivider />
				<MenuItem
					onClick={() => signOutMutation.mutate()}
					icon={<MdLogout size="16px" />}
				>
					Sign out
				</MenuItem>
			</MenuList>
		</Menu>
	);
};

export default UserMenu;
