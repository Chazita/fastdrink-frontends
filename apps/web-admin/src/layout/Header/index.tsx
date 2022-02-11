import { Flex, FlexProps, HStack, IconButton, Text } from "@chakra-ui/react";
import { MdOutlineMenu } from "react-icons/md";
import UserMenu from "./UserMenu";

interface HeaderProps extends FlexProps {
	onOpen: () => void;
}

function Header({ onOpen, ...rest }: HeaderProps) {
	return (
		<Flex
			ml={{ base: 0, md: 60 }}
			px={{ base: 4, md: 4 }}
			height="20"
			alignItems="center"
			borderBottomWidth="1px"
			borderBottomColor="gray.700"
			justifyContent={{ base: "space-between", md: "flex-end" }}
			{...rest}
		>
			<IconButton
				display={{ base: "flex", md: "none" }}
				onClick={onOpen}
				variant="outline"
				aria-label="open menu"
				icon={<MdOutlineMenu />}
			/>
			<Text
				display={{ base: "flex", md: "none" }}
				fontSize="2xl"
				fontFamily="monospace"
				fontWeight="bold"
			>
				Fast Drink
			</Text>
			<HStack spacing={{ base: 0, md: 6 }}>
				<Flex alignItems="center">
					<UserMenu />
				</Flex>
			</HStack>
		</Flex>
	);
}

export default Header;
