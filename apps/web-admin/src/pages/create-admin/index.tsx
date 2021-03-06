import {
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type CreateAdminForm = {
	email: string;
	firstName: string;
	lastName: string;
	password: string;
	confirmPassword: string;
};

const CreateAdmin = () => {
	const {
		register,
		handleSubmit,
		reset,
		getValues,
		formState: { errors },
	} = useForm<CreateAdminForm>();
	const toast = useToast();

	const [showPassword, setShowPassword] = useState(false);

	const createAdminMutation = useMutation(
		"create-admin",
		(newAdmin: CreateAdminForm) => {
			return axios.post("/Auth/register-admin", newAdmin, {
				withCredentials: true,
			});
		},
		{
			onSuccess: () => {
				reset();
				toast({
					title: "Cuenta creada.",
					description: "El nuevo admin a sido creado.",
					status: "success",
					duration: 5000,
					isClosable: true,
				});
			},
			onError: (error: any) => {
				const data = error.response.data;
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

	const createNewAdmin = async (newAdmin: CreateAdminForm) => {
		await createAdminMutation.mutateAsync(newAdmin);
	};

	return (
		<>
			<Flex justify={"center"} h="calc(99vh - 80px)" w={"full"}>
				<Stack as="form" w="xl" onSubmit={handleSubmit(createNewAdmin)}>
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

					<FormControl mt="2" isInvalid={errors.confirmPassword ? true : false}>
						<FormLabel htmlFor="password">Confirmar Contraseña</FormLabel>
						<InputGroup>
							<Input
								type={showPassword ? "text" : "password"}
								{...register("confirmPassword", {
									required: {
										value: true,
										message: "La confirmacion de la Contraseña es requerida.",
									},
									maxLength: {
										value: 24,
										message: "El maximo de caracteres es 24.",
									},
									minLength: {
										value: 4,
										message: "El minimo de caracteres es 4.",
									},
									validate: {
										matchesPresviousPassword: (value) => {
											const { password } = getValues();
											return (
												value === password ||
												"Las Contraseñas no son identicas."
											);
										},
									},
								})}
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
							{errors.confirmPassword ? errors.confirmPassword.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl mt="2" isInvalid={errors.firstName ? true : false}>
						<FormLabel htmlFor="firstName">Nombre</FormLabel>
						<Input
							{...register("firstName", {
								required: {
									value: true,
									message: "El Nombre es requerido.",
								},
								maxLength: {
									value: 40,
									message: "El Nombre debe tener como maximo 40 caracteres.",
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
								maxLength: {
									value: 40,
									message: "El Apellido debe tener como maximo 40 caracteres.",
								},
							})}
							id="lastName"
						/>
						<FormErrorMessage>
							{errors.lastName ? errors.lastName.message : ""}
						</FormErrorMessage>
					</FormControl>

					<Button
						isLoading={createAdminMutation.isLoading}
						type="submit"
						colorScheme="green"
					>
						Crear Admin
					</Button>
				</Stack>
			</Flex>
		</>
	);
};

export default CreateAdmin;
