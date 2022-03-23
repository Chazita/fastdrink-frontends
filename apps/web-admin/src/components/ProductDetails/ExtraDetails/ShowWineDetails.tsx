import { useContext } from "react";
import { useForm } from "react-hook-form";

import {
	Text,
	ListItem,
	Container,
	FormControl,
	FormLabel,
	Input,
	Stack,
	Button,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	FormErrorMessage,
} from "@chakra-ui/react";

import ShowExtraDataContext from "contexts/showExtraDataContext";
import { ProductDetails } from "shared/src/Product/ProductDetails";
import hasExtraDetails from "utils/hasExtraDetails";
import { useMutation } from "react-query";
import axios from "axios";

type ShowWineDetailsProps = {
	product: ProductDetails;
};

type WineDetailsForm = {
	productId?: number;
	alcoholContent: number;
	variety?: string;
	style?: string;
};

const ShowWineDetails = ({ product }: ShowWineDetailsProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<WineDetailsForm>();

	const hasExtra = hasExtraDetails(product);
	const { setShowFormExtra, showFormExtra, refetchProduct } =
		useContext(ShowExtraDataContext);

	const mutationSuccess = () => {
		refetchProduct();
		setShowFormExtra(false);
	};

	const createMutation = useMutation(
		"create-details-wine",
		(data: WineDetailsForm) => {
			return axios.post("/Details/create-details-wine", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const updateMutation = useMutation(
		"update-details-wine",
		(data: WineDetailsForm) => {
			return axios.put("/Details/update-details-wine", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const formSubmit = async (data: WineDetailsForm) => {
		if (hasExtra) {
			await updateMutation.mutateAsync(data);
		} else {
			data.productId = product.id;
			await createMutation.mutateAsync(data);
		}
	};

	if (product.wineDetails === null && !showFormExtra) {
		return (
			<>
				<Text color="red" fontWeight="bold">
					El producto no tiene todos los detalles.
				</Text>
			</>
		);
	}

	if (showFormExtra) {
		if (hasExtra) {
			setValue("productId", product.wineDetails.productId);
			setValue("alcoholContent", product.wineDetails.alcoholContent);
			setValue(
				"style",
				product.wineDetails.style ? product.wineDetails.style : ""
			);
			setValue(
				"variety",
				product.wineDetails.variety ? product.wineDetails.variety : ""
			);
		}

		return (
			<Container as="form" onSubmit={handleSubmit(formSubmit)}>
				<FormControl>
					<FormLabel>Contenido Alcoholico:</FormLabel>
					<NumberInput min={0} max={100}>
						<NumberInputField {...register("alcoholContent")} />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
				</FormControl>

				<FormControl isInvalid={errors.style ? true : false}>
					<FormLabel>Estilo:</FormLabel>
					<Input
						{...register("style", {
							maxLength: {
								value: 50,
								message: "El estilo debe tener menos de 50 caracteres.",
							},
						})}
					/>
					<FormErrorMessage>{errors.style?.message}</FormErrorMessage>
				</FormControl>

				<FormControl isInvalid={errors.variety ? true : false}>
					<FormLabel>Variedad:</FormLabel>
					<Input
						{...register("variety", {
							maxLength: {
								value: 50,
								message: "El variedad debe tener menos de 50 caracteres.",
							},
						})}
					/>
					<FormErrorMessage>{errors.variety?.message}</FormErrorMessage>
				</FormControl>

				<Stack
					w="100%"
					direction="row"
					justifyContent="space-between"
					mt="5"
					display={showFormExtra ? "flex" : "none"}
				>
					<Button onClick={() => setShowFormExtra(false)} colorScheme="red">
						Cancelar
					</Button>
					<Button
						isLoading={updateMutation.isLoading || createMutation.isLoading}
						type="submit"
						colorScheme="blue"
					>
						{hasExtra ? "Actualizar" : "Añadir"}
					</Button>
				</Stack>
			</Container>
		);
	}

	return (
		<>
			<ListItem>
				<Text as="span" fontWeight="bold">
					Contenido Alcoholico:
				</Text>{" "}
				<Text as="span">{product.wineDetails.alcoholContent}</Text>
			</ListItem>
			<ListItem>
				<Text as="span" fontWeight="bold">
					Estilo:
				</Text>{" "}
				<Text as="span" textTransform="capitalize">
					{product.wineDetails.style}
				</Text>
			</ListItem>
			<ListItem>
				<Text as="span" fontWeight="bold">
					Variedad:
				</Text>{" "}
				<Text as="span" textTransform="capitalize">
					{product.wineDetails.variety}
				</Text>
			</ListItem>
		</>
	);
};

export default ShowWineDetails;
