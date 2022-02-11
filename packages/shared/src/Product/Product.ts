import { BaseType } from "../BaseType";
import { ProductPhoto } from "./ProductPhoto";

export interface Product {
	id: number;
	name: string;
	price: number;
	volumen: number;
	stock: number;
	discount?: number;
	photos?: ProductPhoto[];
	category: BaseType;
	container: BaseType;
	brand: BaseType;
	created: Date;
	lastModified: Date;
	deletedAt: Date;
}
