import { ModalContent } from "@chakra-ui/react";
import axios from "axios";

import { useQuery } from "react-query";

const getProductDetails = async (id: number) => {
	return await axios.get(`/Product/${id} `);
};

const ProductDetails = () => {
	const { data, isLoading, isFetching } = useQuery("/Product/details", () =>
		getProductDetails(1)
	);

	console.table(data.data);

	return (
		<ModalContent>
			<h1>Hello</h1>
		</ModalContent>
	);
};

export default ProductDetails;
