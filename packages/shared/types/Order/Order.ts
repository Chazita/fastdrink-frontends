import { Address } from "../Address";
import { OrderProduct } from "./OrderProduct";

export type Order = {
	address: Address;
	id: number;
	products: OrderProduct[];
	totalPrice: number;
	created: string;
	lastModified: string;
	orderStatus: string;
};
