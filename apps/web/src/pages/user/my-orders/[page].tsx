import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Box, Grid, GridItem } from "@chakra-ui/react";
import Paginate from "ui/src/Paginate";

import { useQuery } from "react-query";
import axios from "axios";

import { OrderPaginatedList } from "shared/types/Order/OrderPaginatedList";
import OrderCard from "components/Orders/OrderCard";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			params,
		},
	};
};

const UserMyOrders = ({ params }) => {
	const router = useRouter();
	const [page, setPage] = useState(+params.page);

	const { data, isLoading } = useQuery("my-orders", () => {
		return axios.get<OrderPaginatedList>("/Order/my-orders", {
			withCredentials: true,
		});
	});

	console.log(data);

	const handlePagination = (num: number) => {
		router.push(`/order/${num}`, `/order/${num}`, { shallow: true });
		setPage(num);
	};

	if (data === undefined && isLoading) {
		return <>Loading</>;
	}

	return (
		<Box>
			<Grid
				w="100%"
				justifyItems={"center"}
				templateColumns={{
					base: "repeat(1,1fr)",
					md: "repeat(2,1fr)",
					xl: "repeat(3,4fr)",
				}}
			>
				{data.data.items.map((value) => (
					<GridItem
						key={value.id}
						w={{ base: "100vw", md: "40vw", xl: "28vw", "2xl": "20vw" }}
						padding={2}
					>
						<OrderCard order={value} />
					</GridItem>
				))}
			</Grid>
			<Paginate
				pagesCount={data.data.totalPages}
				page={page}
				handlePagination={handlePagination}
			/>
		</Box>
	);
};

export default UserMyOrders;
