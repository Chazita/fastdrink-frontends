import { Box, Text } from "@chakra-ui/react";
import { ProductDetails } from "shared/src/types/Product/ProductDetails";
import { capitalizeString } from "shared/src/utils/capitalizeString";

type ProductDetailsSodaProps = {
	product: ProductDetails;
};

const ProductDetailsSoda = ({ product }: ProductDetailsSodaProps) => {
	if (product.sodaDetails === undefined) {
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
				<Text color={"gray.400"}>Ditetica</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.sodaDetails.dietetics ? "Si" : "No"}
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Sabor</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.sodaDetails.flavor}
				</Text>
			</Box>
		</>
	);
};

export default ProductDetailsSoda;
