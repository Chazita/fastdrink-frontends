import { useContext } from "react";
import { useForm } from "react-hook-form";

import {
	Text,
	ListItem,
	Container,
	FormControl,
	FormLabel,
	Stack,
	Button,
	Input,
	Checkbox,
} from "@chakra-ui/react";

import ShowExtraDataContext from "contexts/showExtraDataContext";
import { ProductDetails } from "shared/src/Product/ProductDetails";
import hasExtraDetails from "utils/hasExtraDetails";
import { useMutation } from "react-query";
import axios from "axios";

type ShowSodaDetailsProps = {
	product: ProductDetails;
};

type SodaDetailsForm = {
	productId?: number;
	flavor: string;
	dietetics: boolean;
};

const ShowSodaDetails = ({ product }: ShowSodaDetailsProps) => {
	const { register, handleSubmit, setValue } = useForm<SodaDetailsForm>();

	const hasExtra = hasExtraDetails(product);
	const { setShowFormExtra, showFormExtra, refetchProduct } =
		useContext(ShowExtraDataContext);

	const mutationSuccess = () => {
		refetchProduct();
		setShowFormExtra(false);
	};

	const createMutation = useMutation(
		"create-details-soda",
		(data: SodaDetailsForm) => {
			return axios.post("/Details/create-details-soda", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const updateMutation = useMutation(
		"update-details-soda",
		(data: SodaDetailsForm) => {
			return axios.put("/Details/update-details-soda", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const formSubmit = async (data: SodaDetailsForm) => {
		if (hasExtra) {
			await updateMutation.mutateAsync(data);
		} else {
			data.productId = product.id;
			await createMutation.mutateAsync(data);
		}
	};

	if (product.sodaDetails === null && !showFormExtra) {
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
			setValue("productId", product.sodaDetails.productId);
			setValue("dietetics", product.sodaDetails.dietetics);
			setValue("flavor", product.sodaDetails.flavor);
		}

		return (
			<Container as="form" onSubmit={handleSubmit(formSubmit)}>
				<FormControl>
					<Checkbox {...register("dietetics")}>Dietetico</Checkbox>
				</FormControl>
				<FormControl>
					<FormLabel>Sabor:</FormLabel>
					<Input {...register("flavor")} />
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
				<Text as="span">{product.sodaDetails.dietetics ? "Si" : "No"}</Text>
			</ListItem>
			<ListItem>
				<Text as="span" fontWeight="bold">
					Sabor:
				</Text>{" "}
				<Text as="span">{product.sodaDetails.flavor}</Text>
			</ListItem>
		</>
	);
};

export default ShowSodaDetails;
