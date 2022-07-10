import {
	Box,
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

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			params,
		},
	};
};

const AllOrders = ({ params }) => {
	const router = useRouter();
	const [page, setPage] = useState(+params.page);
	const [orderAdmin, setOrderAdmin] = useState<OrderAdmin>();
	const { isOpen, onClose, onOpen } = useDisclosure();

	const { data, isLoading, isError } = useQuery(["all-orders", page], () => {
		return axios.get<OrderAdminPaginatedList>(
			`/Order/orders?PageNumber=${page}`,
			{
				withCredentials: true,
			}
		);
	});

	if (isError) {
		router.push("/login");
	}

	const handlePagination = (num: number) => {
		router.push(`/orders/${num}`, `/orders/${num}`, { shallow: true });
		setPage(num);
	};

	if (data === undefined || isLoading) {
		return <>Loading</>;
	}

	return (
		<Box>
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
