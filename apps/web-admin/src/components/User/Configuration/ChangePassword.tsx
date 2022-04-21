import { useContext, useState } from "react";
import UserContext from "contexts/userContext";
import { useMutation } from "react-query";

import {
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";

type PasswordForm = {
	oldPassword: string;
	newPassword: string;
	confirmNewPassword: string;
};

const ChangePassword = () => {
	const [edit, setEdit] = useState(false);

	const changeMutation = useMutation("change-name", (data: PasswordForm) => {
		return axios.post("/User/change-password", data, { withCredentials: true });
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PasswordForm>();

	const submitChangePassword = (data: PasswordForm) => {
		changeMutation.mutate(data);
	};

	return (
		<Flex direction={"column"}>
			<Text fontSize={"3xl"} fontWeight="bold">
				Cambiar Contraseña
			</Text>
			{edit ? (
				<Flex
					as={"form"}
					direction={"column"}
					w={["100%", "90%", "80%", "60%", "40%"]}
					onSubmit={handleSubmit(submitChangePassword)}
				>
					<FormControl>
						<FormLabel>Antigua Contraseña</FormLabel>
						<Input
							type="password"
							{...register("oldPassword", {
								required: {
									value: true,
									message: "La contraseña es requerida.",
								},
								maxLength: {
									value: 24,
									message: "El maximo de caracteres es 24.",
								},
								minLength: {
									value: 4,
									message: "El minimo de caracteres es 4.",
								},
							})}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Nueva Contraseña</FormLabel>
						<Input
							type="password"
							{...register("newPassword", {
								required: {
									value: true,
									message: "La contraseña es requerida.",
								},
								maxLength: {
									value: 24,
									message: "El maximo de caracteres es 24.",
								},
								minLength: {
									value: 4,
									message: "El minimo de caracteres es 4.",
								},
							})}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Confirmar nueva contraseña</FormLabel>
						<Input
							type="password"
							{...register("confirmNewPassword", {
								required: {
									value: true,
									message: "La contraseña es requerida.",
								},
								maxLength: {
									value: 24,
									message: "El maximo de caracteres es 24.",
								},
								minLength: {
									value: 4,
									message: "El minimo de caracteres es 4.",
								},
							})}
						/>
					</FormControl>
					<Stack direction={"row"}>
						<Button
							colorScheme={"red"}
							w={"100%"}
							onClick={() => setEdit(false)}
						>
							Cancelar
						</Button>
						<Button type="submit" colorScheme={"green"} w={"100%"}>
							Guardar
						</Button>
					</Stack>
				</Flex>
			) : (
				<Flex
					direction={"row"}
					justifyContent={"space-between"}
					w={["100%", "70%"]}
				>
					<Text>
						<Text as="span" fontWeight={"bold"} color={"blue.300"}>
							Contraseña:
						</Text>
						{" ********"}
					</Text>
					<Button
						colorScheme={"blue"}
						variant={"link"}
						onClick={() => setEdit(true)}
					>
						Editar
					</Button>
				</Flex>
			)}
		</Flex>
	);
};
export default ChangePassword;
