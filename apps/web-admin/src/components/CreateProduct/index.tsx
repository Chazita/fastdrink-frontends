import { useRouter } from "next/router";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
	useMutation,
} from "react-query";
import DataContext from "contexts/dataContext";

import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
} from "@chakra-ui/react";

import axios, { AxiosResponse } from "axios";

import { capitalizeStringUnderscore } from "shared/utils/capitalizeString";
import { ProductPaginatedList } from "shared/types/Product/ProductPaginatedList";

type CreateProductForm = {
	name: string;
	price: number;
	volumen: number;
	stock: number;
	category: number;
	brand: number;
	container: number;
	photos: File[];
};

type CreateProductProps = {
	refetch: (
		options?: RefetchOptions & RefetchQueryFilters<unknown>
	) => Promise<
		QueryObserverResult<AxiosResponse<ProductPaginatedList, any>, unknown>
	>;
};

const CreateProduct = ({ refetch }: CreateProductProps) => {
	const router = useRouter();
	const createMutation = useMutation(
		"createProduct",
		(data: CreateProductForm) => {
			const productData = new FormData();
			productData.append("name", data.name);
			productData.append("price", data.price.toString());
			productData.append("volumen", data.volumen.toString());
			productData.append("stock", data.stock.toString());
			productData.append("categoryId", data.category.toString());
			productData.append("brandId", data.brand.toString());
			productData.append("containerId", data.container.toString());
			Array.from(data.photos).map((photo) => {
				productData.append("photos", photo);
			});
			return axios.post("/Product", productData, {
				withCredentials: true,
			});
		},
		{
			onSuccess: () => {
				refetch();
				router.back();
			},
		}
	);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<CreateProductForm>();

	const { data } = useContext(DataContext);

	const createSubmit = async (data: CreateProductForm) => {
		await createMutation.mutateAsync(data);
	};

	return (
		<>
			<ModalContent as="form" onSubmit={handleSubmit(createSubmit)}>
				<ModalHeader>Crear Producto</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<FormControl isInvalid={errors.name ? true : false}>
						<FormLabel>Nombre</FormLabel>
						<Input
							{...register("name", {
								required: {
									value: true,
									message: "El nombre es necesario.",
								},
								maxLength: {
									value: 50,
									message: "El nombre debe tener menos de 50 caracteres.",
								},
							})}
						/>
						<FormErrorMessage>
							{errors.name ? errors.name.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.price ? true : false}>
						<FormLabel htmlFor="price">Precio</FormLabel>
						<NumberInput min={0}>
							<NumberInputField
								id="price"
								{...register("price", {
									required: {
										value: true,
										message: "El precio es necesario.",
									},
								})}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<FormErrorMessage>
							{errors.price ? errors.price.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.volumen ? true : false}>
						<FormLabel htmlFor="volumen">Volumen</FormLabel>
						<NumberInput min={0}>
							<NumberInputField
								id="volumen"
								{...register("volumen", {
									required: {
										value: true,
										message: "El volumen es necesario.",
									},
								})}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<FormErrorMessage>
							{errors.volumen ? errors.volumen.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.stock ? true : false}>
						<FormLabel htmlFor="stock">Stock</FormLabel>
						<NumberInput min={0}>
							<NumberInputField
								id="stock"
								{...register("stock", {
									required: {
										value: true,
										message: "El stock es necesario.",
									},
								})}
							/>
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
						<FormErrorMessage>
							{errors.stock ? errors.stock.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.category ? true : false}>
						<FormLabel>Categoria</FormLabel>
						<Select
							{...register("category", {
								required: {
									value: true,
									message: "Selecionar una categoria es necesario.",
								},
							})}
						>
							{data.categories.map((category) => {
								return (
									<option key={category.id} value={category.id}>
										{capitalizeStringUnderscore(category.name)}
									</option>
								);
							})}
						</Select>
						<FormErrorMessage>
							{errors.category ? errors.category.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.container ? true : false}>
						<FormLabel>Contenedor</FormLabel>
						<Select
							{...register("container", {
								required: {
									value: true,
									message: "Selecionar un contenedor es necesario.",
								},
							})}
						>
							{data.containers.map((container) => (
								<option key={container.id} value={container.id}>
									{capitalizeStringUnderscore(container.name)}
								</option>
							))}
						</Select>
						<FormErrorMessage>
							{errors.container ? errors.container.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl isInvalid={errors.brand ? true : false}>
						<FormLabel>Marca</FormLabel>
						<Select
							{...register("brand", {
								required: {
									value: true,
									message: "Selecionar una marca es necesario.",
								},
							})}
						>
							{data.brands.map((brand) => (
								<option key={brand.id} value={brand.id}>
									{capitalizeStringUnderscore(brand.name)}
								</option>
							))}
						</Select>
						<FormErrorMessage>
							{errors.brand ? errors.brand.message : ""}
						</FormErrorMessage>
					</FormControl>

					<FormControl>
						<FormLabel>Agregar photos</FormLabel>
						<input type="file" multiple {...register("photos")} />
					</FormControl>
				</ModalBody>

				<ModalFooter>
					<Button colorScheme="red" mr="2" onClick={() => router.back()}>
						Cerrar
					</Button>
					<Button
						isLoading={createMutation.isLoading}
						colorScheme="green"
						type="submit"
					>
						Crear
					</Button>
				</ModalFooter>
			</ModalContent>
		</>
	);
};

export default CreateProduct;
