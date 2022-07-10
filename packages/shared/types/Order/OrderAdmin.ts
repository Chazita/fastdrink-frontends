import { Address } from "../Address";
import { OrderProduct } from "./OrderProduct";

type User = {
	id: string;
	firstName: string;
	lastName: string;
	email: string;
};

export type OrderAdmin = {
	address: Address;
	id: string;
	products: OrderProduct[];
	totalPrice: number;
	created: string;
	lastModified: string;
	orderStatus: string;
	user: User;
};
