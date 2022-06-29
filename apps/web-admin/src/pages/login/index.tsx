import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import {
	Button,
	Center,
	Container,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import { useMutation } from "react-query";
import axios from "axios";

import UserContext from "contexts/userContext";

import ErrorResponse from "shared/types/ErrorResponse";

type LoginForm = {
	email: string;
	password: string;
};

export default function Login() {
	const { userRefetch } = useContext(UserContext);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();

	const toast = useToast();

	const loginMutation = useMutation(
		"login",
		(data: LoginForm) => {
			return axios.post("/Auth/login", data, { withCredentials: true });
		},
		{
			onSuccess: () => {
				userRefetch();
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
	const [showPassword, setShowPassword] = useState(false);

	const loginSubmit = async (data: LoginForm) => {
		try {
			await loginMutation.mutateAsync(data);
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<Center h="100vh">
			<Container
				w={["90vw", "50vw"]}
				as="form"
				onSubmit={handleSubmit(loginSubmit)}
			>
				<Heading>Iniciar Sesión</Heading>
				<FormControl mt="2" isInvalid={errors.email ? true : false}>
					<FormLabel htmlFor="email">Correo Electronico</FormLabel>
					<Input
						{...register("email", {
							required: {
								value: true,
								message: "El Correo Electrónico es requerido.",
							},
							pattern: {
								value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
								message: "El Correo Electrónico no es valido.",
							},
						})}
						id="email"
						placeholder="Ex:email@email.com"
					/>
					<FormErrorMessage>
						{errors.email ? errors.email.message : ""}
					</FormErrorMessage>
				</FormControl>

				<FormControl mt="2" isInvalid={errors.password ? true : false}>
					<FormLabel htmlFor="password">Contraseña</FormLabel>
					<InputGroup>
						<Input
							type={showPassword ? "text" : "password"}
							{...register("password", {
								required: {
									value: true,
									message: "La Contraseña es requerida.",
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
							id="password"
							placeholder="Contraseña"
						/>
						<InputRightElement>
							<IconButton
								bg="transparent"
								aria-label="Show or hide password"
								onClick={() => setShowPassword((prev) => (prev = !prev))}
								icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
							/>
						</InputRightElement>
					</InputGroup>
					<FormErrorMessage>
						{errors.password ? errors.password.message : ""}
					</FormErrorMessage>
				</FormControl>
				<Button
					type="submit"
					colorScheme="blue"
					variant="solid"
					isFullWidth
					mt="2"
					isLoading={loginMutation.isLoading}
				>
					Iniciar Sesión
				</Button>
			</Container>
		</Center>
	);
}
