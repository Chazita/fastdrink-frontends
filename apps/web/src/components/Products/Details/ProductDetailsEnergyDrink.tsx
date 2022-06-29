import { Box, Text } from "@chakra-ui/react";
import { ProductDetails } from "shared/types/Product/ProductDetails";
import { capitalizeString } from "shared/utils/capitalizeString";

type ProductDetailsEnergyDrink = {
	product: ProductDetails;
};

const ProductDetailsEnergyDrink = ({ product }: ProductDetailsEnergyDrink) => {
	if (product.energyDrinkDetails === undefined) {
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
				<Text color={"gray.400"}>Sabor</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.energyDrinkDetails.flavor}
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Detetica</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.energyDrinkDetails.dietetics}
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Energizante</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.energyDrinkDetails.energizing}%
				</Text>
			</Box>
			<Box>
				<Text color={"gray.400"}>Sin Alcohol</Text>
				<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
					{product.energyDrinkDetails.nonAlcoholic}%
				</Text>
			</Box>
		</>
	);
};

export default ProductDetailsEnergyDrink;
