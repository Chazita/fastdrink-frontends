import {
	MenuItem,
	MenuDivider,
	MenuList,
	MenuListProps,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import axios from "axios";
import { MdLogout, MdSettings, MdShoppingCart } from "react-icons/md";
import { useRouter } from "next/router";
import Link from "next/link";

const UserMenuItems = (props: MenuListProps) => {
	const router = useRouter();
	const logOutMutation = useMutation(
		"log-out",
		() => {
			return axios.get("/Auth/log-out", { withCredentials: true });
		},
		{
			onSuccess: () => {
				router.reload();
			},
		}
	);
	return (
		<MenuList {...props}>
			<Link href="/user/configuration" passHref>
				<MenuItem icon={<MdSettings />}>Configuracion</MenuItem>
			</Link>
			<Link href="/user/my-orders/1" passHref>
				<MenuItem icon={<MdShoppingCart />}>Mis ordernes</MenuItem>
			</Link>
			<MenuDivider />
			<MenuItem onClick={() => logOutMutation.mutate()} icon={<MdLogout />}>
				Cerrar Sesion
			</MenuItem>
		</MenuList>
	);
};

export default UserMenuItems;
