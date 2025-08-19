import type {Customer} from "./customer.type.ts";
import type {OrderItem} from "./orderItem.type.ts";

export type Order = {
    id: number;
    customer: Customer[];
    total: number;
    createdAt: string;
    items: OrderItem[];
};