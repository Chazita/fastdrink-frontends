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
} from "@chakra-ui/react";

import ShowExtraDataContext from "contexts/showExtraDataContext";
import { ProductDetails } from "shared/src/Product/ProductDetails";
import hasExtraDetails from "utils/hasExtraDetails";
import { useMutation } from "react-query";
import axios from "axios";

type ShowFlavorDetailsProps = {
	product: ProductDetails;
};

type FlavorDetailsForm = {
	productId?: number;
	flavor: string;
};

const ShowFlavorDetails = ({ product }: ShowFlavorDetailsProps) => {
	const { register, handleSubmit, setValue } = useForm<FlavorDetailsForm>();

	const hasExtra = hasExtraDetails(product);
	const { setShowFormExtra, showFormExtra, refetchProduct } =
		useContext(ShowExtraDataContext);

	const mutationSuccess = () => {
		refetchProduct();
		setShowFormExtra(false);
	};

	const createMutation = useMutation(
		"create-details-flavor",
		(data: FlavorDetailsForm) => {
			return axios.post("/Details/create-details-flavor", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const updateMutation = useMutation(
		"update-details-flavor",
		(data: FlavorDetailsForm) => {
			return axios.put("/Details/update-details-flavor", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const formSubmit = async (data: FlavorDetailsForm) => {
		if (hasExtra) {
			await updateMutation.mutateAsync(data);
		} else {
			data.productId = product.id;
			await createMutation.mutateAsync(data);
		}
	};

	if (product.flavorDetails === null && !showFormExtra) {
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
			setValue("productId", product.flavorDetails.productId);
			setValue("flavor", product.flavorDetails.flavor);
		}

		return (
			<Container as="form" onSubmit={handleSubmit(formSubmit)}>
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
					Sabor:
				</Text>{" "}
				<Text as="span">{product.flavorDetails.flavor}</Text>
			</ListItem>
		</>
	);
};

export default ShowFlavorDetails;
