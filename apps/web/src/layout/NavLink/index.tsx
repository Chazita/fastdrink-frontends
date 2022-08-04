import Link from "next/link";
import { ReactNode } from "react";
import { Button, ButtonProps, Link as LinkChakra } from "@chakra-ui/react";

interface NavLinkProps extends ButtonProps {
	children: ReactNode;
	path: string;
	onClick?: () => void;
}

const NavLink = ({ children, path, onClick, ...props }: NavLinkProps) => {
	return (
		<Link href={path} passHref>
			<LinkChakra>
				<Button size={"lg"} variant={"link"} onClick={onClick} {...props}>
					{children}
				</Button>
			</LinkChakra>
		</Link>
	);
};

export default NavLink;
