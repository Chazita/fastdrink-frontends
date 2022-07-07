import { PaginatedList } from "../PaginatedList";
import { Order } from "./Order";

export interface OrderPaginatedList extends PaginatedList<Order[]> {}
