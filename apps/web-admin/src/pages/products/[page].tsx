import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import Link from "next/link";

import {
	Box,
	Button,
	Checkbox,
	HStack,
	Modal,
	ModalOverlay,
} from "@chakra-ui/react";
import { MdAdd } from "react-icons/md";

import axios from "axios";
import { useQuery } from "react-query";
import { ProductPaginatedList } from "shared/src/Product";

import ProductDetails from "components/ProductDetails";
import CreateProduct from "components/CreateProduct";
import TableProduct from "components/TableProduct";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			params,
		},
	};
};

export default function Products({ params }) {
	const router = useRouter();
	const [page] = useState(params.page);

	const [showDeleted, setShowDeleted] = useState(false);

	const { data, isLoading, isFetching, refetch } = useQuery(
		"products-admin",
		() =>
			axios.get<ProductPaginatedList>(`/Product/admin?PageNumber=${page}`, {
				withCredentials: true,
			})
	);

	if (!isLoading && !isFetching && data !== undefined) {
		return (
			<Box w="100%" minH="100%">
				<HStack justifyContent="space-between">
					<Checkbox
						checked={showDeleted}
						colorScheme="red"
						onChange={() => setShowDeleted((prev) => !prev)}
					>
						Mostrar Eliminados
					</Checkbox>
					<Link href={`/products/${page}?createProduct=true`} passHref>
						<Button leftIcon={<MdAdd />} colorScheme="green">
							Añadir Producto
						</Button>
					</Link>
				</HStack>
				<TableProduct
					items={data.data.items}
					page={page}
					showDeleted={showDeleted}
					refetch={refetch}
				/>
				<Modal isOpen={!!router.query.productId} onClose={() => router.back()}>
					<ModalOverlay />
					<ProductDetails />
				</Modal>
				<Modal
					isOpen={!!router.query.createProduct}
					onClose={() => router.back()}
				>
					<ModalOverlay />
					<CreateProduct refetch={refetch} />
				</Modal>
			</Box>
		);
	}

	return <h1>Loading</h1>;
}
