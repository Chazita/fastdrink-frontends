import { useContext, useState } from "react";
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
	Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import Axios from "axios";

import { useRouter } from "next/router";
import UserContext from "contexts/userContext";

type LoginForm = {
	email: string;
	password: string;
};

type ErrorReceiver = {
	errors: string[];
};

export default function Login() {
	const { userRefetch } = useContext(UserContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();

	const [errorReceiver, setErrorReceiver] = useState<string[]>([]);
	const [showPassword, setShowPassword] = useState(false);

	const loginMutation = useMutation(
		(user: LoginForm) => {
			return Axios.post("/Auth/login", user, {
				withCredentials: true,
			});
		},
		{
			onSuccess: () => {
				userRefetch();
			},
			onError: (error: any) => {
				const data = error.response.data as ErrorReceiver;
				setErrorReceiver(data.errors);
			},
		}
	);

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
								message: "El Correo Electronico es requerida.",
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
							id="password"
							placeholder="Password"
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
				>
					Iniciar Sesión
				</Button>
				{loginMutation.isError ? (
					<Text mt="2" color="red">
						{errorReceiver[0]}
					</Text>
				) : (
					<></>
				)}
			</Container>
		</Center>
	);
}
