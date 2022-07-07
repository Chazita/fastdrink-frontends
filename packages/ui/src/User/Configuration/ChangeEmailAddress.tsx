import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useMutation } from "react-query";

import {
	Flex,
	Text,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	FormErrorMessage,
	useToast,
} from "@chakra-ui/react";
import { UserInfo } from "shared/types/UserInfo";
import ErrorResponse from "shared/types/ErrorResponse";

type EmailForm = {
	newEmail: string;
	password: string;
};

type ChangeEmailAddressProps = {
	userInfo: UserInfo;
	userRefetch: () => any;
};

const ChangeEmailAddress = ({
	userInfo,
	userRefetch,
}: ChangeEmailAddressProps) => {
	const [edit, setEdit] = useState(false);
	const toast = useToast();

	const changeMutation = useMutation(
		"change-name",
		(data: EmailForm) => {
			return axios.post("/User/change-email", data, { withCredentials: true });
		},
		{
			onSuccess: () => {
				setEdit(false);
				userRefetch();
				toast({
					title: "Se ha cambiado exitosamente",
					description: "Necesitas inicar session de nuevo",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			},
			onError: (error: any) => {
				const data = error.response.data as ErrorResponse;

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
	} = useForm<EmailForm>();

	const submitChangePassword = (data: EmailForm) => {
		changeMutation.mutate(data);
	};

	if (userInfo === undefined) {
		return <>Loading...</>;
	}

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
					<FormControl isInvalid={errors.newEmail ? true : false}>
						<FormLabel>Nuevo Correo</FormLabel>
						<Input
							type="password"
							{...register("newEmail", {
								required: {
									value: true,
									message: "El correo es requerida.",
								},
							})}
						/>
						<FormErrorMessage>
							{errors.newEmail ? errors.newEmail.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.password ? true : false}>
						<FormLabel>Contraseña</FormLabel>
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
							Correo Electronico:
						</Text>
						{` ${userInfo.email}`}
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

export default ChangeEmailAddress;
