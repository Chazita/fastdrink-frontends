import { Divider, Flex } from "@chakra-ui/react";
import {
	ChangeName,
	ChangePassword,
	ChangeEmailAddress,
} from "components/User/Configuration";
const UserConfiguration = () => {
	return (
		<Flex direction={"column"}>
			<ChangeName />
			<Divider mt={"5"} mb={"5"} />
			<ChangePassword />
			<Divider mt={"5"} mb={"5"} />
			<ChangeEmailAddress />
			<Divider mt={"5"} mb={"5"} />
		</Flex>
	);
};

export default UserConfiguration;
