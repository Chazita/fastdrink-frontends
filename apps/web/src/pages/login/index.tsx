import { useState } from "react";
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
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type LoginForm = {
	email: string;
	password: string;
};

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const {
		register,

		formState: { errors },
	} = useForm<LoginForm>();
	return (
		<Center h="100vh">
			<Container w={["90vw", "50vw"]} as="form">
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
				>
					Iniciar Sesión
				</Button>
			</Container>
		</Center>
	);
};

export default Login;
