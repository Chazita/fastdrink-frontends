import { Box, Text } from "@chakra-ui/react";
import { ProductDetails } from "shared/types/Product/ProductDetails";
import { capitalizeString } from "shared/utils/capitalizeString";

type ProductDetailsWaterProps = {
	product: ProductDetails;
};

const ProductDetailsWater = ({ product }: ProductDetailsWaterProps) => {
	if (product.waterDetails === undefined) {
		return <Text>No hay informacion de este producto.</Text>;
	}

	return (
		<>
			<Box>
				<Text color={"gray.400"}>Volumen</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.volumen}ml
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Envase</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{capitalizeString(product.container.name)}
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Gasificada</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.waterDetails.gasified ? "Si" : "No"}
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Baja en sodio</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.waterDetails.lowInSodium ? "Si" : "No"}
				</Text>
			</Box>
		</>
	);
};

export default ProductDetailsWater;
