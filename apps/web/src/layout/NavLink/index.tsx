import Link from "next/link";
import { ReactNode } from "react";
import { Button } from "@chakra-ui/react";

type NavLinkProps = {
	children: ReactNode;
	path: string;
	onClick?: () => void;
};

const NavLink = ({ children, path, onClick }: NavLinkProps) => {
	return (
		<Link href={path} passHref>
			<Button size={"lg"} variant={"link"} onClick={onClick}>
				{children}
			</Button>
		</Link>
	);
};

export default NavLink;
