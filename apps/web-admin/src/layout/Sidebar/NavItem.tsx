import Link from "next/link";
import { Flex, FlexProps, Icon } from "@chakra-ui/react";
import { ReactText } from "react";
import { IconType } from "react-icons/lib";

interface NavItemProps extends FlexProps {
	icon: IconType;
	children: ReactText;
	path: string;
	onClose: () => void;
}

const NavItem = ({ icon, children, path, onClose, ...rest }: NavItemProps) => {
	return (
		<Link href={path} passHref>
			<Flex
				align="center"
				p="4"
				mx="4"
				borderRadius="lg"
				role="group"
				cursor="pointer"
				_hover={{
					bg: "blue.900",
					color: "white",
				}}
				{...rest}
				onClick={onClose}
			>
				{icon && (
					<Icon
						mr="4"
						fontSize="24"
						_groupHover={{ color: "white" }}
						as={icon}
					/>
				)}
				{children}
			</Flex>
		</Link>
	);
};

export default NavItem;
