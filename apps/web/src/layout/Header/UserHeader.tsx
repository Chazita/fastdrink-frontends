import Link from "next/link";
import { Avatar, IconButton, Menu, MenuButton } from "@chakra-ui/react";
import { UserContext } from "contexts/userContext";
import UserMenuItems from "layout/UserMenuItems";
import { useContext } from "react";
import { MdPerson } from "react-icons/md";

const UserHeader = () => {
	const { userInfo, userRefetch } = useContext(UserContext);
	if (userInfo !== undefined) {
		return (
			<Menu closeOnSelect>
				<MenuButton d={{ base: "none", md: "block" }}>
					<Avatar
						size={"sm"}
						name={`${userInfo.lastName} ${userInfo.firstName}`}
					/>
				</MenuButton>

				<UserMenuItems />
			</Menu>
		);
	}

	return (
		<Link href={"/login"} passHref>
			<IconButton
				variant={"ghost"}
				size={"md"}
				icon={<MdPerson size={"24"} />}
				aria-label="signIn"
				display={{ base: "none", md: "flex" }}
			/>
		</Link>
	);
};

export default UserHeader;
