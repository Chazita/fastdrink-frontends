import { Product } from "./Product";

export type ProductPaginatedList = {
	items: Product[];
	pageNumber: number;
	totalPages: number;
	totalCount: number;
	hasPreviousPage: boolean;
	hasNextPage: boolean;
};
