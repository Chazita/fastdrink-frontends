import { useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";

import {
	Center,
	Container,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Text,
	useColorModeValue,
	useToast,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";

type RegisterForm = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

const Register = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);
	const toast = useToast();

	const registerMutation = useMutation(
		"register",
		(data: RegisterForm) => {
			return axios.post("/Auth/register-customer", data, {
				withCredentials: true,
			});
		},
		{
			onSuccess: () => {
				toast({
					title: "Cuenta creada.",
					description: "La cuenta ha sido creada exitosamente.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
				router.push("/login");
			},
		}
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>();

	const handleRegister = (data: RegisterForm) => {
		registerMutation.mutate(data);
	};

	return (
		<Center h={"90vh"}>
			<Container
				w={["90vw", "50vw"]}
				as="form"
				onSubmit={handleSubmit(handleRegister)}
			>
				<Heading>Registro</Heading>

				<FormControl mt="2" isInvalid={errors.firstName ? true : false}>
					<FormLabel htmlFor="firstName">Nombre</FormLabel>
					<Input
						{...register("firstName", {
							required: {
								value: true,
								message: "El Nombre es requerido.",
							},
						})}
						id="firstName"
					/>
					<FormErrorMessage>
						{errors.firstName ? errors.firstName.message : ""}
					</FormErrorMessage>
				</FormControl>

				<FormControl mt="2" isInvalid={errors.lastName ? true : false}>
					<FormLabel htmlFor="lastName">Apellido</FormLabel>
					<Input
						{...register("lastName", {
							required: {
								value: true,
								message: "El Apellido es requerido.",
							},
						})}
						id="lastName"
					/>
					<FormErrorMessage>
						{errors.lastName ? errors.lastName.message : ""}
					</FormErrorMessage>
				</FormControl>

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
						placeholder="Ej: email@email.com"
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
					isLoading={registerMutation.isLoading}
				>
					Registrarse
				</Button>

				<Text mt="5" color={useColorModeValue("gray.500", "gray.400")}>
					Al crear la cuenta estas aceptando los{" "}
					<Text
						as="span"
						textDecoration={"underline"}
						_hover={{ cursor: "pointer" }}
					>
						Terminos y condiciones
					</Text>
					{", "}
					<Text
						as="span"
						textDecoration={"underline"}
						_hover={{ cursor: "pointer" }}
					>
						Pólitica de privacidad
					</Text>
				</Text>
			</Container>
		</Center>
	);
};

export default Register;
