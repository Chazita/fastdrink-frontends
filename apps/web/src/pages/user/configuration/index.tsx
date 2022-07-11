import { Divider, Flex } from "@chakra-ui/react";
import { UserContext } from "contexts/userContext";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import {
	ChangeName,
	ChangePassword,
	ChangeEmailAddress,
} from "components/UserConfiguration";

const UserConfiguration = () => {
	const router = useRouter();
	const { userInfo, userRefetch, isLoading } = useContext(UserContext);

	useEffect(() => {
		if (userInfo === undefined && !isLoading) {
			router.push("/login");
		}
	});

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
