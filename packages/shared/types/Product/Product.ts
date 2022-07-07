import { BaseType } from "../BaseType";
import { ProductPhoto } from "./ProductPhoto";

export interface Product {
	id: string;
	name: string;
	price: number;
	volume: number;
	stock: number;
	discount?: number;
	photo: ProductPhoto;
	category: BaseType;
	container: BaseType;
	brand: BaseType;
	created: Date;
	lastModified: Date;
	deletedAt: Date;
}
