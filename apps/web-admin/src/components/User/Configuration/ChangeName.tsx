import {
	Button,
	Flex,
	FormControl,
	FormHelperText,
	FormLabel,
	Input,
	Stack,
	Text,
} from "@chakra-ui/react";
import axios from "axios";
import UserContext from "contexts/userContext";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";

type NameForm = {
	lastName: string;
	firstName: string;
	password: string;
};

const ChangeName = () => {
	const [edit, setEdit] = useState(false);
	const { userInfo, userRefetch } = useContext(UserContext);

	const changeMutation = useMutation("change-name", (data: NameForm) => {
		return axios.post("/User/change-name", data, { withCredentials: true });
	});

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<NameForm>();

	if (userInfo === undefined) {
		return <>loading..</>;
	}

	setValue("firstName", userInfo.firstName);
	setValue("lastName", userInfo.lastName);

	const submitChangeName = (data: NameForm) => {
		changeMutation.mutate(data);
	};

	return (
		<Flex direction={"column"}>
			<Text fontSize={"3xl"} fontWeight="bold">
				Cambiar Nombre
			</Text>
			{edit && userInfo.lastName !== null ? (
				<Flex
					as={"form"}
					direction={"column"}
					w={["100%", "90%", "80%", "60%", "40%"]}
					onSubmit={handleSubmit(submitChangeName)}
				>
					<FormControl>
						<FormLabel>Apellido</FormLabel>
						<Input
							{...register("lastName", {
								required: {
									value: true,
									message: "El apellido es requerido.",
								},
								maxLength: {
									value: 40,
									message: "El apellido debe tener como maximo 40 caracteres.",
								},
							})}
						/>
						<FormHelperText></FormHelperText>
					</FormControl>
					<FormControl>
						<FormLabel>Nombre</FormLabel>
						<Input
							{...register("firstName", {
								required: {
									value: true,
									message: "El nombre es requerido.",
								},
								maxLength: {
									value: 40,
									message: "El nombre debe tener como maximo 40 caracteres.",
								},
							})}
						/>
						<FormHelperText></FormHelperText>
					</FormControl>
					<FormControl>
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
						<FormHelperText></FormHelperText>
					</FormControl>
					<Stack direction={"row"}>
						<Button
							colorScheme={"red"}
							w={"100%"}
							onClick={() => setEdit(false)}
						>
							Cancelar
						</Button>
						<Button type="submit" colorScheme={"green"} w={"100%"}>
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
							Nombre de usuario:
						</Text>
						{` ${userInfo.lastName} ${userInfo.firstName}`}
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

export default ChangeName;
