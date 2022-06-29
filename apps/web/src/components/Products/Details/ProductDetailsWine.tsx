import { Box, Text } from "@chakra-ui/react";
import { ProductDetails } from "shared/types/Product/ProductDetails";
import { capitalizeString } from "shared/utils/capitalizeString";

type ProductDetailsWineProps = {
	product: ProductDetails;
};
const ProductDetailsWine = ({ product }: ProductDetailsWineProps) => {
	if (product.wineDetails === undefined) {
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
				<Text color={"gray.400"}>Graduación alcohólica</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.wineDetails.alcoholContent}%
				</Text>
			</Box>
			<Box d={product.wineDetails.style ? "block" : "none"}>
				<Text color={"gray.400"}>Estilo</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.wineDetails.style ? product.wineDetails.style : ""}
				</Text>
			</Box>
			<Box d={product.wineDetails.variety ? "block" : "none"}>
				<Text color={"gray.400"}>Variedad</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.wineDetails.variety ? product.wineDetails.variety : ""}
				</Text>
			</Box>
		</>
	);
};

export default ProductDetailsWine;
