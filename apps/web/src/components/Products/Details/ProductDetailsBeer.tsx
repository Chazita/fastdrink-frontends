import { Box, Text } from "@chakra-ui/react";
import { ProductDetails } from "shared/types/Product/ProductDetails";
import { capitalizeString } from "shared/utils/capitalizeString";

type ProductDetailsBeerProps = {
	product: ProductDetails;
};

const ProductDetailsBeer = ({ product }: ProductDetailsBeerProps) => {
	if (product.beerDetails === undefined) {
		return <Text>No hay informacion de este producto.</Text>;
	}

	return (
		<>
			<Box>
				<Text color={"gray.400"}>Volumen</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.volume}ml
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Envase</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{capitalizeString(product.container.name)}
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Estilo</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.beerDetails.style}
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Graduación alcohólica</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.beerDetails.alcoholContent}%
				</Text>
			</Box>
		</>
	);
};

export default ProductDetailsBeer;
