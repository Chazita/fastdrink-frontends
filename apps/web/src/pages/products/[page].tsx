import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { Paginate } from "ui";

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

	const handlePagination = (num: number) => {
		router.push(`/products/${num}`);
		setPage((prev) => (prev = num));
	};

	return (
		<>
			<Paginate pagesCount={5} page={page} handlePagination={() => {}} />
		</>
	);
};

export default Products;
