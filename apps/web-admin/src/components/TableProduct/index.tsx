import Link from "next/link";
import { useRouter } from "next/router";

import {
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
	Stack,
} from "@chakra-ui/react";
import axios, { AxiosResponse } from "axios";
import { MdDelete, MdOutlineRestore } from "react-icons/md";

import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
	useMutation,
} from "react-query";
import { Product, ProductPaginatedList } from "shared/src/Product";
import SoftDeleteModal from "./SoftDeleteModal";
import RecoverModal from "./RevocerModal";
import HardDeleteModal from "./HardDeleteModal";

type TableProductProps = {
	items: Product[];
	page: number;
	showDeleted: boolean;
	refetch: (
		options?: RefetchOptions & RefetchQueryFilters<unknown>
	) => Promise<
		QueryObserverResult<AxiosResponse<ProductPaginatedList, any>, unknown>
	>;
};

const TableProduct = ({
	items,
	page,
	showDeleted,
	refetch,
}: TableProductProps) => {
	const router = useRouter();

	if (!showDeleted) {
		items = items.filter((product) => product.deletedAt == null);
	}

	const softDeleteMutation = useMutation(
		"soft-delete-product",
		(id: number) => axios.delete(`/Product/${id}`, { withCredentials: true }),
		{
			onSuccess: () => {
				refetch();
				router.back();
			},
		}
	);

	return (
		<>
			<Table>
				<Thead>
					<Tr>
						<Th>Producto</Th>
						<Th d={["none", "display"]}>Precio</Th>
						<Th d={["none", "display"]}>Categoria</Th>
						<Th d={["none", "display"]}>Stock</Th>
						<Th>Estado</Th>
						<Th></Th>
					</Tr>
				</Thead>
				<Tbody>
					{items.map((product) => {
						return (
							<Tr key={product.id}>
								<Td>
									<Stack direction={["column", "row"]} alignItems="center">
										<Image h="20" src={product.photos[0].photoUrl} alt="" />
										<Text fontSize="20px" fontWeight="bold">
											{product.name}
										</Text>
									</Stack>
								</Td>
								<Td d={["none", "display"]}>
									<Text>${product.price.toFixed(2)}</Text>
								</Td>
								<Td d={["none", "display"]}>
									<Text>{product.category.name}</Text>
								</Td>
								<Td d={["none", "display"]}>
									<Text>{product.stock}</Text>
								</Td>
								<Td>
									{product.deletedAt ? (
										<Badge variant="solid" colorScheme="red" p="0">
											Inactivo
										</Badge>
									) : (
										<Badge variant="solid" colorScheme="green">
											Activo
										</Badge>
									)}
								</Td>
								<Td>
									<Stack direction={["column", "row"]}>
										<Link
											href={`/products/${page}?productId=${product.id}`}
											passHref
										>
											<Button variant="ghost" colorScheme="green">
												Ver Detalles
											</Button>
										</Link>
										{product.deletedAt ? (
											<>
												<Link
													href={`/products/${page}?recoverId=${product.id}&revocerName=${product.name}`}
													passHref
												>
													<IconButton
														variant="ghost"
														colorScheme="blue"
														aria-label="recover product"
														icon={<MdOutlineRestore />}
													/>
												</Link>
												<Link
													href={`/products/${page}?deleteId=${product.id}&deleteName=${product.name}&hardDelete=true`}
													passHref
												>
													<IconButton
														variant="ghost"
														colorScheme="red"
														aria-label="hard delete"
														icon={<MdDelete />}
													/>
												</Link>
											</>
										) : (
											<Link
												href={`/products/${page}?deleteId=${product.id}&deleteName=${product.name}`}
												passHref
											>
												<IconButton
													variant="ghost"
													colorScheme="red"
													aria-label="delete product"
													icon={<MdDelete />}
												/>
											</Link>
										)}
									</Stack>
								</Td>
							</Tr>
						);
					})}
				</Tbody>
			</Table>
			<SoftDeleteModal />
			<RecoverModal />
			<HardDeleteModal />
		</>
	);
};

export default TableProduct;
