import { useContext } from "react";
import DataContext from "contexts/dataContext";
import { useRouter } from "next/router";

import {
	Flex,
	VStack,
	Text,
	Heading,
	HStack,
	IconButton,
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalOverlay,
	ModalCloseButton,
	ModalFooter,
	Button,
	Divider,
	FormControl,
	FormLabel,
	Select,
	Input,
	FormErrorMessage,
} from "@chakra-ui/react";
import { MdDelete, MdAdd } from "react-icons/md";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { capitalizeStringUnderscore } from "shared/utils/capitalizeString";

type ExtraDataCreateForm = {
	type: string;
	name: string;
};

const ExtraData = () => {
	const { data, refetchData } = useContext(DataContext);
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<ExtraDataCreateForm>();
	const router = useRouter();

	const createMutation = useMutation(
		"create",
		({ type, name }: ExtraDataCreateForm) => {
			return axios.post(`/${type}`, { name }, { withCredentials: true });
		},
		{
			onSuccess: async () => {
				await refetchData();
			},
		}
	);

	const deleteMutation = useMutation(
		"delete",
		({ type, id }: any) => {
			return axios.delete(`/${type}/${id}`, { withCredentials: true });
		},
		{
			onSuccess: async () => {
				await refetchData();
			},
		}
	);

	const deleleteHandle = async ({ type, id }) => {
		reset();
		await deleteMutation.mutateAsync({ type, id });
		router.back();
	};

	const createSubmit = async (data: ExtraDataCreateForm) => {
		reset();
		console.log(data);
		await createMutation.mutateAsync(data);
		router.back();
	};

	return (
		<>
			<Link href={`/extra-data?create=true`} passHref>
				<IconButton
					bottom="5"
					right="5"
					position="fixed"
					aria-label="add"
					borderRadius="full"
					colorScheme="green"
					size="lg"
					icon={<MdAdd />}
					zIndex="1"
				/>
			</Link>
			<Flex direction={{ base: "column", md: "row" }} gap="5" pb="20">
				<VStack w="100%">
					<Heading>Marcas</Heading>
					{data.brands.length > 0 ? (
						<></>
					) : (
						<Text color="red.400">No hay Marcas</Text>
					)}
					{data.brands.map((brand) => {
						return (
							<HStack key={brand.id} justifyContent="space-between" w="100%">
								<Text>{capitalizeStringUnderscore(brand.name)}</Text>
								<Link
									href={`/extra-data?type=brand&removeId=${brand.id}&name=${brand.name}`}
									passHref
								>
									<IconButton
										aria-label="delete-brand"
										icon={<MdDelete />}
										colorScheme="red"
									/>
								</Link>
							</HStack>
						);
					})}
				</VStack>

				<Divider d={["block", "none"]} />

				<VStack w="100%">
					<Heading>Contenedores</Heading>
					{data.containers.length > 0 ? (
						<></>
					) : (
						<Text color="red.400">No hay Contenedores</Text>
					)}
					{data.containers.map((container) => {
						return (
							<HStack
								key={container.id}
								justifyContent="space-between"
								w="100%"
							>
								<Text>{capitalizeStringUnderscore(container.name)}</Text>
								<Link
									href={`/extra-data?type=container&removeId=${container.id}&name=${container.name}`}
									passHref
								>
									<IconButton
										aria-label="delete-container"
										icon={<MdDelete />}
										colorScheme="red"
									/>
								</Link>
							</HStack>
						);
					})}
				</VStack>

				<Divider d={["block", "none"]} />

				<VStack w="100%">
					<Heading>Categorias</Heading>
					{data.categories.length > 0 ? (
						<></>
					) : (
						<Text color="red.400">No hay Categorias</Text>
					)}
					{data.categories.map((category) => {
						return (
							<HStack key={category.id} justifyContent="space-between" w="100%">
								<Text>{capitalizeStringUnderscore(category.name)}</Text>
							</HStack>
						);
					})}
				</VStack>
			</Flex>

			<Modal
				isOpen={
					!!router.query.type && !!router.query.removeId && !!router.query.name
				}
				onClose={() => router.back()}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>ADVERTENCIA</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Text color="red.400">
							¿Estas seguro que desea eliminar {router.query.name}?
						</Text>
						Al eliminar esto puede afectar a la base de datos recuerde modificar
						los productos afectados.
					</ModalBody>
					<ModalFooter gap="2">
						<Button onClick={() => router.back()}>Rechazar</Button>
						<Button
							colorScheme="red"
							onClick={() =>
								deleleteHandle({
									type: router.query.type,
									id: router.query.removeId,
								})
							}
							isLoading={deleteMutation.isLoading}
						>
							Aceptar
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
			<Modal isOpen={!!router.query.create} onClose={() => router.back()}>
				<ModalOverlay />
				<ModalContent as="form" onSubmit={handleSubmit(createSubmit)}>
					<ModalHeader>Crear</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<FormControl isInvalid={errors.type ? true : false}>
							<FormLabel>Tipo:</FormLabel>
							<Select
								{...register("type", {
									required: {
										value: true,
										message: "Tipo es un campo necesario.",
									},
								})}
							>
								<option value="Brand">Marca</option>
								<option value="Container">Contenedor</option>
							</Select>
							<FormErrorMessage>
								{errors.type ? errors.type.message : ""}
							</FormErrorMessage>
						</FormControl>
						<FormControl isInvalid={errors.name ? true : false}>
							<FormLabel>Nombre:</FormLabel>
							<Input
								{...register("name", {
									required: {
										value: true,
										message: "Nombre es un campo necesario.",
									},
									maxLength: {
										value: 50,
										message: "Nombre tiene que tener menos de 50 caracteres.",
									},
								})}
							/>
							<FormErrorMessage>
								{errors.name ? errors.name.message : ""}
							</FormErrorMessage>
						</FormControl>
					</ModalBody>
					<ModalFooter gap="2">
						<Button
							colorScheme="red"
							onClick={() => {
								router.back();
								reset();
							}}
						>
							Cancelar
						</Button>
						<Button
							type="submit"
							colorScheme="green"
							isLoading={createMutation.isLoading}
						>
							Crear
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ExtraData;
