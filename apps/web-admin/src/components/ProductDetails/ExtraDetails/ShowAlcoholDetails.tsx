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
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	useToast,
} from "@chakra-ui/react";

import ShowExtraDataContext from "contexts/showExtraDataContext";
import { ProductDetails } from "shared/src/Product/ProductDetails";
import hasExtraDetails from "utils/hasExtraDetails";
import { useMutation } from "react-query";
import axios from "axios";

type ShowAlcoholDetailsProps = {
	product: ProductDetails;
};

type AlcoholDetailsForm = {
	productId?: string;
	alcoholContent: number;
};

const ShowAlcoholDetails = ({ product }: ShowAlcoholDetailsProps) => {
	const { register, handleSubmit, setValue } = useForm<AlcoholDetailsForm>();
	const toast = useToast();

	const hasExtra = hasExtraDetails(product);
	const { setShowFormExtra, showFormExtra, refetchProduct } =
		useContext(ShowExtraDataContext);

	const mutationSuccess = () => {
		refetchProduct();
		setShowFormExtra(false);
	};

	const createMutation = useMutation(
		"create-details-alcohol",
		(data: AlcoholDetailsForm) => {
			return axios.post("/Details/create-details-alcohol", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const updateMutation = useMutation(
		"update-details-alcohol",
		(data: AlcoholDetailsForm) => {
			return axios.put("/Details/update-details-alcohol", data, {
				withCredentials: true,
			});
		},
		{ onSuccess: mutationSuccess }
	);

	const formSubmit = async (data: AlcoholDetailsForm) => {
		if (hasExtra) {
			await updateMutation.mutateAsync(data);
		} else {
			data.productId = product.id;
			await createMutation.mutateAsync(data);
		}
	};

	if (product.alcoholDetails === null && !showFormExtra) {
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
			setValue("productId", product.alcoholDetails.productId);
			setValue("alcoholContent", product.alcoholDetails.alcoholContent);
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
				<Text as="span">{product.alcoholDetails.alcoholContent}</Text>
			</ListItem>
		</>
	);
};

export default ShowAlcoholDetails;
