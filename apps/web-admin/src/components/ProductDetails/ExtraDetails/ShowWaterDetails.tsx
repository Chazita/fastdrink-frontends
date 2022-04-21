import { useContext } from "react";
import { useForm } from "react-hook-form";

import {
	Text,
	ListItem,
	Container,
	FormControl,
	Stack,
	Button,
	Checkbox,
} from "@chakra-ui/react";

import ShowExtraDataContext from "contexts/showExtraDataContext";
import { ProductDetails } from "shared/src/Product/ProductDetails";
import hasExtraDetails from "utils/hasExtraDetails";
import { useMutation } from "react-query";
import axios from "axios";

type ShowWaterDetailsProps = {
	product: ProductDetails;
};

type WaterDetailsForm = {
	productId?: string;
	lowInSodium: boolean;
	gasified: boolean;
};

const ShowWaterDetails = ({ product }: ShowWaterDetailsProps) => {
	const { register, handleSubmit, setValue } = useForm<WaterDetailsForm>();

	const hasExtra = hasExtraDetails(product);
	const { setShowFormExtra, showFormExtra, refetchProduct } =
		useContext(ShowExtraDataContext);

	const mutationSuccess = () => {
		refetchProduct();
		setShowFormExtra(false);
	};

	const createMutation = useMutation(
		"create-details-water",
		(data: WaterDetailsForm) => {
			return axios.post("/Details/create-details-water", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const updateMutation = useMutation(
		"update-details-water",
		(data: WaterDetailsForm) => {
			return axios.put("/Details/update-details-water", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const formSubmit = async (data: WaterDetailsForm) => {
		if (hasExtra) {
			await updateMutation.mutateAsync(data);
		} else {
			data.productId = product.id;
			await createMutation.mutateAsync(data);
		}
	};

	if (product.waterDetails === null && !showFormExtra) {
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
			setValue("productId", product.waterDetails.productId);
			setValue("gasified", product.waterDetails.gasified);
			setValue("lowInSodium", product.waterDetails.lowInSodium);
		}

		return (
			<Container as="form" onSubmit={handleSubmit(formSubmit)}>
				<FormControl>
					<Checkbox {...register("gasified")}>Gasificada</Checkbox>
				</FormControl>
				<FormControl>
					<Checkbox {...register("lowInSodium")}>Baja en Sodio</Checkbox>
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
					Gasificada:
				</Text>{" "}
				<Text as="span">{product.waterDetails.gasified ? "Si" : "No"}</Text>
			</ListItem>
			<ListItem>
				<Text as="span" fontWeight="bold">
					Baja en Sodio:
				</Text>{" "}
				<Text as="span">{product.waterDetails.lowInSodium ? "Si" : "No"}</Text>
			</ListItem>
		</>
	);
};

export default ShowWaterDetails;
