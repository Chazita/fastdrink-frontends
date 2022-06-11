import {
	MenuItem,
	MenuDivider,
	MenuList,
	MenuListProps,
} from "@chakra-ui/react";
import { useMutation } from "react-query";
import axios from "axios";
import { MdLogout, MdSettings } from "react-icons/md";
import { useRouter } from "next/router";

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
			<MenuItem icon={<MdSettings />}>Configuracion</MenuItem>
			<MenuDivider />
			<MenuItem onClick={() => logOutMutation.mutate()} icon={<MdLogout />}>
				Cerrar Sesion
			</MenuItem>
		</MenuList>
	);
};

export default UserMenuItems;
