import {
	Box,
	Flex,
	Heading,
	HStack,
	SimpleGrid,
	Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { ProductCard } from "components/Products";
import { useQuery } from "react-query";
import { Product } from "shared";

const Home = () => {
	const newProducts = useQuery("new-products", () => {
		return axios.get<Product[]>("/Product/new-products");
	});

	const discountsProducts = useQuery("discount-products", () => {
		return axios.get<Product[]>("/Product/new-discounts-products");
	});

	if (
		discountsProducts.isLoading &&
		newProducts.isLoading &&
		newProducts.data === undefined
	) {
		return <></>;
	}

	return (
		<div>
			<Box padding={5}>
				<Heading mb={4}>Nuevos Products</Heading>
				<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
					{newProducts.data.data.map((product) => (
						<ProductCard item={product} key={product.id} />
					))}
				</SimpleGrid>
			</Box>

			{discountsProducts.data !== undefined ? (
				<Box padding={5}>
					<Heading mb={4}>Nuevos Descuentos</Heading>
					<SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
						{discountsProducts.data.data.map((product) => (
							<ProductCard item={product} key={product.id} />
						))}
					</SimpleGrid>
				</Box>
			) : (
				<></>
			)}
		</div>
	);
};

export default Home;
