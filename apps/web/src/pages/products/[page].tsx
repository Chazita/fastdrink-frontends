import { Container, Flex, Grid, GridItem, Box } from "@chakra-ui/react";
import axios from "axios";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";
import { ProductPaginatedList } from "shared/types/Product";

import ProductCard from "components/Products/ProductCard";

import { Paginate } from "ui";
import FilterContainer from "components/Filter";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			params,
		},
	};
};

const Products = ({ params }) => {
	const router = useRouter();
	const [page, setPage] = useState(+params.page);
	const [order, setOrder] = useState<string>("");
	const [brand, setBrand] = useState<string>("");
	const [search, setSearch] = useState<string>("");

	const { data } = useQuery(
		["get-products", page, order, brand, search],
		() => {
			let extraPath = "";

			if (order.length > 0) {
				extraPath += `&OrderBy=${order}`;
			}

			if (brand.length > 0) {
				extraPath += `&Brand=${brand}`;
			}

			if (search.length > 0) {
				extraPath += `&Search=${search}`;
			}

			return axios.get<ProductPaginatedList>(
				`/Product?PageNumber=${page}${extraPath}`,
				{
					withCredentials: true,
				}
			);
		},
		{ keepPreviousData: true }
	);

	const handlePagination = (num: number) => {
		router.push(`/products/${num}`, `/products/${num}`, { shallow: true });
		setPage(num);
	};

	if (data !== undefined) {
		return (
			<Flex direction={{ base: "column", md: "row" }} mt={"4"}>
				<FilterContainer
					setOrder={setOrder}
					setBrand={setBrand}
					setSearch={setSearch}
				/>
				<Container centerContent>
					<Grid
						templateColumns={{
							base: "repeat(1,1fr)",
							md: "repeat(2,1fr)",
							lg: "repeat(2,1fr)",
							xl: "repeat(3,1fr)",
						}}
						gap={6}
					>
						{data.data.items.map((item) => {
							return (
								<GridItem
									key={item.id}
									w={{
										base: "100%",
										sm: "100%",
										md: "37vw",
										lg: "40vw",
										xl: "28vw",
									}}
								>
									<ProductCard item={item} />
								</GridItem>
							);
						})}
					</Grid>

					<Paginate
						pagesCount={data.data.totalPages}
						page={page}
						handlePagination={handlePagination}
						mb="2"
					/>
				</Container>
			</Flex>
		);
	}

	return <h1>Loading...</h1>;
};

export default Products;
