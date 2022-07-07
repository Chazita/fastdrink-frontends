import { Divider, Flex } from "@chakra-ui/react";
import { UserContext } from "contexts/userContext";
import { useContext } from "react";
import {
	ChangeName,
	ChangePassword,
	ChangeEmailAddress,
} from "ui/src/User/Configuration";

const UserConfiguration = () => {
	const { userInfo, userRefetch } = useContext(UserContext);
	return (
		<Flex ml={"2"} mr="2" direction={"column"}>
			<ChangeName userInfo={userInfo} userRefetch={userRefetch} />
			<Divider mt={"5"} mb={"5"} />
			<ChangePassword userRefetch={userRefetch} />
			<Divider mt={"5"} mb={"5"} />
			<ChangeEmailAddress userInfo={userInfo} userRefetch={userRefetch} />
			<Divider mt={"5"} mb={"5"} />
		</Flex>
	);
};

export default UserConfiguration;
