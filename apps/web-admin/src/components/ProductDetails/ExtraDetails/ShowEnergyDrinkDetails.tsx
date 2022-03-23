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
	FormErrorMessage,
	Checkbox,
} from "@chakra-ui/react";

import ShowExtraDataContext from "contexts/showExtraDataContext";
import { ProductDetails } from "shared/src/Product/ProductDetails";
import hasExtraDetails from "utils/hasExtraDetails";
import { useMutation } from "react-query";
import axios from "axios";

type ShowEnergyDrinkDetailsProps = {
	product: ProductDetails;
};

type EnergyDrinkDetailsForm = {
	productId: number;
	nonAlcoholic: boolean;
	energizing: boolean;
	dietetics: boolean;
	flavor: string;
};

const ShowEnergyDrinkDetails = ({ product }: ShowEnergyDrinkDetailsProps) => {
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<EnergyDrinkDetailsForm>();

	const hasExtra = hasExtraDetails(product);
	const { setShowFormExtra, showFormExtra, refetchProduct } =
		useContext(ShowExtraDataContext);

	const mutationSuccess = () => {
		refetchProduct();
		setShowFormExtra(false);
	};

	const createMutation = useMutation(
		"create-details-energy-drink",
		(data: EnergyDrinkDetailsForm) => {
			return axios.post("/Details/create-details-energy-drink", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const updateMutation = useMutation(
		"update-details-energy-drink",
		(data: EnergyDrinkDetailsForm) => {
			return axios.put("/Details/update-details-energy-drink", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const formSubmit = async (data: EnergyDrinkDetailsForm) => {
		if (hasExtra) {
			await updateMutation.mutateAsync(data);
		} else {
			data.productId = product.id;
			await createMutation.mutateAsync(data);
		}
	};

	if (product.energyDrinkDetails === null && !showFormExtra) {
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
			setValue("productId", product.energyDrinkDetails.productId);
			setValue("dietetics", product.energyDrinkDetails.dietetics);
			setValue("energizing", product.energyDrinkDetails.energizing);
			setValue("nonAlcoholic", product.energyDrinkDetails.nonAlcoholic);
			setValue("flavor", product.energyDrinkDetails.flavor);
		}

		return (
			<Container as="form" onSubmit={handleSubmit(formSubmit)}>
				<FormControl>
					<Checkbox {...register("dietetics")}>Dietetico</Checkbox>
				</FormControl>

				<FormControl>
					<Checkbox {...register("energizing")}>Energetico</Checkbox>
				</FormControl>

				<FormControl>
					<Checkbox {...register("nonAlcoholic")}>Bebida sin alcohol</Checkbox>
				</FormControl>

				<FormControl isInvalid={errors.flavor ? true : false}>
					<FormLabel>Sabor:</FormLabel>
					<Input
						{...register("flavor", {
							required: {
								value: true,
								message: "El sabor es necesario.",
							},
							maxLength: {
								value: 50,
								message: "El sabor debe tener menos de 50 caracteres.",
							},
						})}
					/>
					<FormErrorMessage>{errors.flavor?.message}</FormErrorMessage>
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
					Dietetico:
				</Text>{" "}
				<Text as="span">
					{product.energyDrinkDetails.dietetics ? "Si" : "No"}
				</Text>
			</ListItem>

			<ListItem>
				<Text as="span" fontWeight="bold">
					Energetico:
				</Text>{" "}
				<Text as="span">
					{product.energyDrinkDetails.energizing ? "Si" : "No"}
				</Text>
			</ListItem>

			<ListItem>
				<Text as="span" fontWeight="bold">
					Bebida sin alcohol:
				</Text>{" "}
				<Text as="span">
					{product.energyDrinkDetails.nonAlcoholic ? "Si" : "No"}
				</Text>
			</ListItem>

			<ListItem>
				<Text as="span" fontWeight="bold">
					Sabor:
				</Text>{" "}
				<Text as="span">{product.energyDrinkDetails.flavor}</Text>
			</ListItem>
		</>
	);
};

export default ShowEnergyDrinkDetails;
