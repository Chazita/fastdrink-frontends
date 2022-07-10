import {
	Box,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	IconButton,
	Input,
	InputGroup,
	InputRightElement,
	Select,
	Table,
	TableContainer,
	Tbody,
	Th,
	Thead,
	Tr,
	useDisclosure,
} from "@chakra-ui/react";
import { OrderAdminPaginatedList } from "shared/types/Order/OrderAdminPaginatedList";
import { GetServerSideProps } from "next";

import axios from "axios";
import { useQuery } from "react-query";

import { Paginate } from "ui";
import { useState } from "react";
import { useRouter } from "next/router";
import OrderTableBody from "components/Order/OrderTableBody";
import OrderDetails from "components/Order/OrderDetails";
import { OrderAdmin } from "shared/types/Order/OrderAdmin";
import { useForm } from "react-hook-form";
import { MdSearch } from "react-icons/md";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			params,
		},
	};
};

type SearchProps = {
	id: string;
};

const AllOrders = ({ params }) => {
	const router = useRouter();
	const [page, setPage] = useState(+params.page);
	const [search, setSearch] = useState<string>("");
	const [orderByStatus, setOrderByStatus] = useState<string>("");
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SearchProps>();
	const [orderAdmin, setOrderAdmin] = useState<OrderAdmin>();
	const { isOpen, onClose, onOpen } = useDisclosure();

	const { data, isLoading, isError } = useQuery(
		["all-orders", page, search, orderByStatus],
		() => {
			let extraQuery = "";
			if (search !== "") {
				extraQuery += `&Search=${search}`;
			}

			if (orderByStatus !== "") {
				extraQuery += `&OrderByStatus=${orderByStatus}`;
			}

			return axios.get<OrderAdminPaginatedList>(
				`/Order/orders?PageNumber=${page}${extraQuery}`,
				{
					withCredentials: true,
				}
			);
		}
	);

	if (isError) {
		router.push("/login");
	}

	const handlePagination = (num: number) => {
		router.push(`/orders/${num}`, `/orders/${num}`, { shallow: true });
		setPage(num);
	};

	const handleSearchSubmit = ({ id }: SearchProps) => {
		setSearch(id);
	};

	if (data === undefined || isLoading) {
		return <>Loading</>;
	}

	return (
		<Box>
			<Flex
				direction={["column", "row"]}
				alignItems={["", "end"]}
				justifyContent={"space-between"}
				mb="2"
			>
				<Box
					as="form"
					onSubmit={handleSubmit(handleSearchSubmit)}
					mb={{ base: "2", md: "0" }}
				>
					<FormControl isInvalid={errors.id ? true : false}>
						<FormLabel>Buscar Order Id</FormLabel>
						<InputGroup>
							<Input
								placeholder="ex: Yda2JrbJRLD"
								{...register("id", {
									pattern: {
										value: /^[^#]+$/g,
										message: "No debe contener #",
									},
								})}
							/>
							<InputRightElement>
								<IconButton
									variant={"ghost"}
									type="submit"
									aria-label="search"
									icon={<MdSearch />}
								/>
							</InputRightElement>
						</InputGroup>
						<FormErrorMessage>
							{errors.id ? errors.id.message : ""}
						</FormErrorMessage>
					</FormControl>
				</Box>
				<Box>
					<Select
						onChange={(e) => setOrderByStatus(e.target.value)}
						defaultValue={orderByStatus}
					>
						<option value={""}>---</option>
						<option value="Pending">Pendiente</option>
						<option value="Shipped">Enviado</option>
						<option value="Completed">Completado</option>
						<option value="Canceled">Cancelado</option>
						<option value="Declined">Rechazado</option>
					</Select>
				</Box>
			</Flex>
			<TableContainer>
				<Table>
					<Thead>
						<Tr>
							<Th>Orden numero</Th>
							<Th display={["none", "table-cell"]}>Usuario</Th>
							<Th display={["none", "table-cell"]}>Precio Total</Th>
							<Th>Orden Estado</Th>
							<Th></Th>
						</Tr>
					</Thead>
					<Tbody>
						{data.data.items.map((order) => (
							<OrderTableBody
								setOrderAdmin={setOrderAdmin}
								onOpen={onOpen}
								order={order}
								key={order.id}
							/>
						))}
					</Tbody>
				</Table>
				<OrderDetails isOpen={isOpen} onClose={onClose} order={orderAdmin} />
			</TableContainer>
			<Paginate
				pagesCount={data.data.totalPages}
				page={page}
				handlePagination={handlePagination}
			/>
		</Box>
	);
};

export default AllOrders;
