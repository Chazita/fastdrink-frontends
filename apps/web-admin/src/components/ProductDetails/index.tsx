import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

import {
	Box,
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Image,
	Input,
	List,
	ListItem,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	Select,
	Stack,
	Text,
} from "@chakra-ui/react";

import axios from "axios";
import { useMutation, useQuery } from "react-query";

import { ProductDetails } from "shared/types/Product/ProductDetails";
import ShowExtraDetails from "./ShowExtraDetails";
import DataContext from "contexts/dataContext";

import {
	capitalizeString,
	capitalizeStringUnderscore,
} from "shared/utils/capitalizeString";
import hasExtraDetails from "utils/hasExtraDetails";
import ShowExtraDataContext from "contexts/showExtraDataContext";

const getProductDetails = (id: string) => {
	return axios.get<ProductDetails>(`/Product/get-details/${id} `);
};

type DetailsForm = {
	id: string;
	name: string;
	price: number;
	volume: number;
	stock: number;
	discount?: number;
	categoryId: number;
	containerId: number;
	brandId: number;
};

const ProductDetails = () => {
	const [showFormDetails, setShowFormDetails] = useState(false);
	const [showFormExtra, setShowFormExtra] = useState(false);

	const {
		data: { brands, categories, containers },
	} = useContext(DataContext);

	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<DetailsForm>();

	const { data, refetch } = useQuery("/Product/details", () =>
		getProductDetails(router.query.productId as string)
	);

	const updateProductMutation = useMutation(
		"update-product",
		(data: DetailsForm) => {
			return axios.put("/Product", data, { withCredentials: true });
		},
		{
			onSuccess: () => {
				refetch();
				setShowFormDetails(false);
			},
		}
	);

	const updateProductHandle = async (data: DetailsForm) => {
		if (data.discount === 0) {
			data.discount = null;
		}
		await updateProductMutation.mutateAsync(data);
	};

	if (data !== undefined) {
		const product = data.data;
		const hasExtras = hasExtraDetails(product);

		setValue("id", product.id);
		setValue("name", product.name);
		setValue("price", product.price);
		setValue("stock", product.stock);
		setValue("volume", product.volume);
		setValue("brandId", product.brand.id);
		setValue("categoryId", product.category.id);
		setValue("containerId", product.container.id);
		setValue("discount", product.discount ? product.discount : 0);

		return (
			<ModalContent>
				<ModalCloseButton />
				<ModalBody>
					<Image src={product.photo.photoUrl} alt="" />
					{showFormDetails ? (
						<Stack as="form" onSubmit={handleSubmit(updateProductHandle)}>
							<FormControl isInvalid={errors.name ? true : false}>
								<FormLabel>Nombre</FormLabel>
								<Input
									{...register("name", {
										required: {
											value: true,
											message: "El nombre es necesario.",
										},
										maxLength: {
											value: 100,
											message:
												"El nombre debe contener menos de 100 caracteres.",
										},
									})}
								/>
								<FormErrorMessage>{errors.name?.message}</FormErrorMessage>
							</FormControl>

							<FormControl isInvalid={errors.price ? true : false}>
								<FormLabel>Price</FormLabel>
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
								<FormErrorMessage>{errors.price?.message}</FormErrorMessage>
							</FormControl>

							<FormControl inValid={errors.volume ? true : false}>
								<FormLabel>Volumen</FormLabel>
								<NumberInput min={0}>
									<NumberInputField
										id="volume"
										{...register("volume", {
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
								<FormErrorMessage> {errors.volume?.message} </FormErrorMessage>
							</FormControl>

							<FormControl isInvalid={errors.stock ? true : false}>
								<FormLabel>Stock</FormLabel>
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
								<FormErrorMessage>{errors.stock?.message}</FormErrorMessage>
							</FormControl>

							<FormControl isInvalid={errors.discount ? true : false}>
								<FormLabel>Descuento</FormLabel>
								<NumberInput min={0}>
									<NumberInputField
										id="discount"
										{...register("discount", {
											required: {
												value: true,
												message: "El descuento es necesario.",
											},
										})}
									/>
									<NumberInputStepper>
										<NumberIncrementStepper />
										<NumberDecrementStepper />
									</NumberInputStepper>
								</NumberInput>
								<FormErrorMessage>{errors.discount?.message}</FormErrorMessage>
							</FormControl>

							<FormControl>
								<FormLabel>Categoria</FormLabel>
								<Select {...register("categoryId")}>
									{categories.map((category) => (
										<option key={category.id} value={category.id}>
											{capitalizeStringUnderscore(category.name)}
										</option>
									))}
								</Select>
							</FormControl>

							<FormControl>
								<FormLabel>Contenedor</FormLabel>
								<Select {...register("containerId")}>
									{containers.map((container) => (
										<option key={container.id} value={container.id}>
											{capitalizeString(container.name)}
										</option>
									))}
								</Select>
							</FormControl>

							<FormControl>
								<FormLabel>Marca</FormLabel>
								<Select {...register("brandId")}>
									{brands.map((brand) => (
										<option key={brand.id} value={brand.id}>
											{capitalizeString(brand.name)}
										</option>
									))}
								</Select>
							</FormControl>

							<Stack
								w="100%"
								direction="row"
								justifyContent="space-between"
								display={showFormDetails ? "flex" : "none"}
							>
								<Button
									onClick={() => setShowFormDetails(false)}
									colorScheme="red"
								>
									Cancelar
								</Button>
								<Button
									isLoading={updateProductMutation.isLoading}
									type="submit"
									colorScheme="blue"
								>
									Actualizar
								</Button>
							</Stack>
						</Stack>
					) : (
						<Stack>
							{/* Show Details */}
							<Box as="header">
								<Heading>{product.name}</Heading>
								<Text color="gray.400">${product.price}</Text>
							</Box>
							<Box>
								<Text
									fontSize="18px"
									color="yellow.300"
									fontWeight="500"
									textTransform="uppercase"
									mb={4}
								>
									Detalles del Producto
								</Text>
								<List spacing={2}>
									<ListItem>
										<Text as="span" fontWeight="bold">
											Volumen:
										</Text>{" "}
										{product.volume}
									</ListItem>

									<ListItem>
										<Text as="span" fontWeight="bold">
											Stock:
										</Text>{" "}
										{product.stock}
									</ListItem>

									<ListItem>
										<Text as="span" fontWeight="bold">
											Descuento:
										</Text>{" "}
										{product.discount ? product.discount : 0}%
									</ListItem>

									<ListItem>
										<Text as="span" fontWeight="bold">
											Categoria:
										</Text>{" "}
										<Text as="span">
											{capitalizeStringUnderscore(product.category.name)}
										</Text>
									</ListItem>

									<ListItem>
										<Text as="span" fontWeight="bold">
											Contenedor:
										</Text>{" "}
										<Text as="span">
											{capitalizeStringUnderscore(product.container.name)}
										</Text>
									</ListItem>

									<ListItem>
										<Text as="span" fontWeight="bold">
											Marca:
										</Text>{" "}
										<Text as="span">
											{capitalizeStringUnderscore(product.brand.name)}
										</Text>
									</ListItem>
									<ShowExtraDataContext.Provider
										value={{
											setShowFormExtra,
											showFormExtra,
											refetchProduct: refetch,
										}}
									>
										<ShowExtraDetails
											category={product.category.name}
											product={product}
										/>
									</ShowExtraDataContext.Provider>
								</List>
							</Box>
						</Stack>
					)}
				</ModalBody>
				<ModalFooter
					display={showFormDetails || showFormExtra ? "none" : "flex"}
					justifyContent="space-between"
				>
					<Button
						display={
							(showFormDetails || showFormExtra) && hasExtras === false
								? "none"
								: "block"
						}
						onClick={() => setShowFormExtra(true)}
						colorScheme="green"
					>
						{hasExtras ? "Actualizar" : "Agregar"} Detalles Extras
					</Button>

					<Button
						display={showFormDetails || showFormExtra ? "none" : "block"}
						onClick={() => setShowFormDetails(true)}
						colorScheme="green"
					>
						Actualizar Datos
					</Button>
				</ModalFooter>
			</ModalContent>
		);
	}

	return (
		<ModalContent>
			<h1>Loading</h1>
		</ModalContent>
	);
};

export default ProductDetails;
