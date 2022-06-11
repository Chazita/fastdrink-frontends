import {
	Box,
	Button,
	Flex,
	FormControl,
	FormLabel,
	Input,
	SimpleGrid,
	Text,
	useColorModeValue,
} from "@chakra-ui/react";
import { SetStateAction, Dispatch, useState } from "react";
import { useForm } from "react-hook-form";

type CreateAccountPros = {
	setLoginOrCreate: Dispatch<SetStateAction<boolean>>;
};

const CreateAccount = ({ setLoginOrCreate }: CreateAccountPros) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const [showPassword, setShowPassword] = useState(false);

	return (
		<>
			<Box as="form">
				<SimpleGrid columns={2}>
					<FormControl w="90%">
						<FormLabel>Nombre</FormLabel>
						<Input />
					</FormControl>
					<FormControl w="90%">
						<FormLabel>Apellido</FormLabel>
						<Input />
					</FormControl>
					<FormControl w="90%">
						<FormLabel>Email</FormLabel>
						<Input />
					</FormControl>
					<FormControl w="90%">
						<FormLabel>Contraseña</FormLabel>
						<Input />
					</FormControl>
				</SimpleGrid>
				<Flex alignItems={"center"} mt={"10"} direction="column">
					<Button
						borderRadius={"full"}
						mb={"5"}
						type="submit"
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
