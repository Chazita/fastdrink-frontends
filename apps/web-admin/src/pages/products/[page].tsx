import { useState } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

import {
	Box,
	HStack,
	Image,
	Table,
	Tbody,
	Td,
	Th,
	Thead,
	Tr,
	Text,
	Button,
	IconButton,
	Badge,
	Modal,
} from "@chakra-ui/react";

import axios from "axios";
import { useQuery } from "react-query";
import { MdDelete, MdOutlineRestore } from "react-icons/md";
import { ProductPaginatedList } from "shared/src/Product";
import Link from "next/link";
import ProductDetails from "components/ProductDetails";

async function getProducts(page: number) {
	return await axios.get<ProductPaginatedList>(
		`/Product/admin?PageNumber=${page}`,
		{
			withCredentials: true,
		}
	);
}

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

	const { data, isLoading, isFetching } = useQuery(
		"products",
		() => getProducts(page),
		{
			keepPreviousData: true,
			onSuccess: () => {
				console.log("Fetch");
			},
			onError: () => {
				router.push("/login");
			},
		}
	);

	if (!isLoading && !isFetching && data !== undefined) {
		return (
			<Box w="100%" minH="100%">
				<Table>
					<Thead>
						<Tr>
							<Th>Producto</Th>
							<Th>Precio</Th>
							<Th>Categoria</Th>
							<Th>Stock</Th>
							<Th>Estado</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.data.items.map((product) => (
							<Tr key={product.id}>
								<Td>
									<HStack>
										<Image h="20" src={product.photos[0].photoUrl} alt="" />
										<Text fontSize="20px" fontWeight="bold">
											{product.name}
										</Text>
									</HStack>
								</Td>
								<Td>
									<Text>${product.price.toFixed(2)}</Text>
								</Td>
								<Td>
									<Text>{product.category.name}</Text>
								</Td>
								<Td>
									<Text>{product.stock}</Text>
								</Td>
								<Td>
									{product.deletedAt ? (
										<Badge variant="solid" colorScheme="red">
											Desactivado
										</Badge>
									) : (
										<Badge variant="solid" colorScheme="green">
											Activo
										</Badge>
									)}
								</Td>
								<Td>
									<HStack>
										<Link
											href={`/products/${page}?productId=${product.id}`}
											passHref
										>
											<Button variant="ghost" colorScheme="green">
												Ver Detalles
											</Button>
										</Link>
										{product.deletedAt ? (
											<IconButton
												variant="ghost"
												colorScheme="blue"
												aria-label="recover product"
												icon={<MdOutlineRestore />}
											/>
										) : (
											<IconButton
												variant="ghost"
												colorScheme="red"
												aria-label="delete product"
												icon={<MdDelete />}
											/>
										)}
									</HStack>
								</Td>
							</Tr>
						))}
					</Tbody>
				</Table>
				<Modal isOpen={!!router.query.productId} onClose={() => router.back()}>
					<ProductDetails />
				</Modal>
			</Box>
		);
	}

	return <h1>Loading</h1>;
}
