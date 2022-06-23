import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	SimpleGrid,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { SetStateAction, Dispatch, useState } from "react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "react-query";

type RegisterForm = {
	email: string;
	password: string;
	firstName: string;
	lastName: string;
};

type CreateAccountPros = {
	setLoginOrCreate: Dispatch<SetStateAction<boolean>>;
};

const CreateAccount = ({ setLoginOrCreate }: CreateAccountPros) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterForm>();

	const queryClient = useQueryClient();

	const handleRegister = (data: RegisterForm) => {
		queryClient.setQueryData("register", data);
	};

	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<Box as="form" onSubmit={handleSubmit(handleRegister)}>
				<SimpleGrid columns={{ base: 1, md: 2 }}>
					<FormControl
						w={{ base: "100%", md: "90%" }}
						isInvalid={errors.firstName ? true : false}
					>
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

					<FormControl
						w={{ base: "100%", md: "90%" }}
						isInvalid={errors.lastName ? true : false}
					>
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
					<FormControl
						w={{ base: "100%", md: "90%" }}
						isInvalid={errors.email ? true : false}
					>
						<FormLabel htmlFor="email">Email</FormLabel>
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
					<FormControl
						w={{ base: "100%", md: "90%" }}
						isInvalid={errors.password ? true : false}
					>
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
				</SimpleGrid>
				<Flex alignItems={"center"} mt={"10"} direction="column">
					<Button
						type="submit"
						borderRadius={"full"}
						mb={"5"}
						colorScheme={"blue"}
						pl="10"
						pr="10"
					>
						Crear Cuenta
					</Button>
					<Text mb="10" color={useColorModeValue("gray.500", "gray.400")}>
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
					<Text fontSize="xl">
						¿Ya tienes Cuenta?{" "}
						<Text
							as="span"
							color="red.400"
							textDecoration={"underline"}
							_hover={{ cursor: "pointer" }}
							onClick={() => setLoginOrCreate((prev) => !prev)}
						>
							Iniciar Sesion
						</Text>
					</Text>
				</Flex>
			</Box>
		</>
	);
};

export default CreateAccount;
