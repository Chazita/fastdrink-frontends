import { PaginatedList } from "../PaginatedList";
import { Product } from "./Product";

export interface ProductPaginatedList extends PaginatedList<Product[]> {}
