import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Button,
	Center,
	Container,
	Flex,
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

import axios from "axios";

import { UserContext } from "contexts/userContext";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type SignInProps = {
	setLoginOrCreate: Dispatch<SetStateAction<boolean>>;
};

type LoginForm = {
	email: string;
	password: string;
};

const SignIn = ({ setLoginOrCreate }: SignInProps) => {
	const [showPassword, setShowPassword] = useState(false);
	const { userRefetch } = useContext(UserContext);
	const loginMutation = useMutation(
		"login-checkout",
		(data: LoginForm) => {
			return axios.post("/Auth/login", data, { withCredentials: true });
		},
		{
			onSuccess: () => {
				userRefetch();
			},
		}
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginForm>();

	const handleLogin = (data: LoginForm) => {
		loginMutation.mutate(data);
	};

	return (
		<Center>
			<Container
				w={["90vw", "50vw"]}
				as="form"
				onSubmit={handleSubmit(handleLogin)}
			>
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
				<Flex alignItems={"center"} mt={"2"} direction="column">
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
					<Text fontSize="xl" mt="3">
						¿No tienes Cuenta?{" "}
						<Text
							as="span"
							color="red.400"
							textDecoration={"underline"}
							_hover={{ cursor: "pointer" }}
							onClick={() => setLoginOrCreate((prev) => !prev)}
						>
							Registrate
						</Text>
					</Text>
				</Flex>
			</Container>
		</Center>
	);
};

export default SignIn;
