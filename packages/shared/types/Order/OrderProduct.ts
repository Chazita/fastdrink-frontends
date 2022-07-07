import { Product } from "../Product";

export type OrderProduct = {
	discount?: number;
	price: number;
	product: Product;
	quantity: number;
};
