import { useState } from "react";
import { useMutation } from "react-query";

import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	Stack,
	Text,
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useForm } from "react-hook-form";

import { ApiErrorResponse } from "shared/types/ApiErrorResponse";

type PasswordForm = {
	password: string;
	newPassword: string;
	confirmNewPassword: string;
};

type ChangePasswordProps = {
	userRefetch: () => any;
};

const ChangePassword = ({ userRefetch }: ChangePasswordProps) => {
	const [edit, setEdit] = useState(false);
	const toast = useToast();
	const changeMutation = useMutation(
		"change-name",
		(data: PasswordForm) => {
			return axios.post("/User/change-password", data, {
				withCredentials: true,
			});
		},
		{
			onSuccess: () => {
				setEdit(false);
				userRefetch();
				toast({
					title: "Exito",
					description: "Se ha cambiado al contraseña.",
					duration: 5000,
					isClosable: true,
					status: "success",
				});
			},
			onError: (error: any) => {
				const data = error.response.data as ApiErrorResponse;

				for (let key in data.errors) {
					const value = data.errors[key];
					toast({
						title: key,
						description: value,
						status: "error",
						duration: 5000,
						isClosable: true,
					});
				}
			},
		}
	);

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
					<FormControl isInvalid={errors.password ? true : false}>
						<FormLabel>Antigua Contraseña</FormLabel>
						<Input
							type="password"
							{...register("password", {
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
						<FormErrorMessage>
							{errors.password ? errors.password.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.newPassword ? true : false}>
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
						<FormErrorMessage>
							{errors.newPassword ? errors.newPassword.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.confirmNewPassword ? true : false}>
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
						<FormErrorMessage>
							{errors.confirmNewPassword
								? errors.confirmNewPassword.message
								: ""}
						</FormErrorMessage>
					</FormControl>

					<Stack direction={"row"}>
						<Button
							colorScheme={"red"}
							w={"100%"}
							onClick={() => setEdit(false)}
						>
							Cancelar
						</Button>
						<Button
							isLoading={changeMutation.isLoading}
							type="submit"
							colorScheme={"green"}
							w={"100%"}
						>
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
