import Link from "next/link";

import {
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
import { MdDelete, MdOutlineRestore } from "react-icons/md";

import { AxiosResponse } from "axios";
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
} from "react-query";

import { Product, ProductPaginatedList } from "shared/src/Product";
import { capitalizeStringUnderscore } from "utils/capitalizeString";

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

const TableProduct = ({ items, page, showDeleted }: TableProductProps) => {
	if (!showDeleted) {
		items = items.filter((product) => product.deletedAt == null);
	}

	return (
		<>
			<Table>
				<Thead>
					<Tr>
						<Th>Producto</Th>
						<Th d={["none", "table-cell"]}>Precio</Th>
						<Th d={["none", "table-cell"]}>Categoria</Th>
						<Th d={["none", "table-cell"]}>Stock</Th>
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
								<Td d={["none", "none", "none", "table-cell"]}>
									<Text>${product.price.toFixed(2)}</Text>
								</Td>
								<Td d={["none", "none", "none", "table-cell"]}>
									<Text>
										{capitalizeStringUnderscore(product.category.name)}
									</Text>
								</Td>
								<Td d={["none", "none", "none", "table-cell"]}>
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
