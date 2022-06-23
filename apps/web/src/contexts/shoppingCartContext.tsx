import { createContext, useEffect, useReducer, Dispatch } from "react";
import { Product } from "shared/types";

export type ProductOrder = {
	product: Product;
	count: number;
};

type ShoppingCart = {
	items: ProductOrder[];
	subTotal: number;
	totalDiscount: number;
	totalPrice: number;
};

type ProductOrderContext = {
	shoppingCart: ShoppingCart;
	dispatch: Dispatch<ShoppingCartAction>;
};

export enum ShoppingCartActionKind {
	ADD = "add",
	REMOVE = "remove",
	UPDATE = "update",
	RESET = "reset",
}

type ShoppingCartAction = {
	type: ShoppingCartActionKind;
	payload: ProductOrder;
};

export const ShoppingCartContext = createContext<ProductOrderContext>({
	shoppingCart: { items: [], subTotal: 0, totalDiscount: 0, totalPrice: 0 },
	dispatch: () => {},
});

const reducer = (
	state: ShoppingCart,
	action: ShoppingCartAction
): ShoppingCart => {
	const { payload, type } = action;
	switch (type) {
		case ShoppingCartActionKind.ADD: {
			if (
				state.items.find((product) => product.product.id === payload.product.id)
			) {
				return state;
			}
			state.items.push(payload);

			state.subTotal += payload.product.price * payload.count;
			state.totalDiscount +=
				((payload.product.price * payload.product.discount) / 100) *
				payload.count;
			state.totalPrice = state.subTotal - state.totalDiscount;

			localStorage.setItem("shopping-cart", JSON.stringify(state));
			return { ...state };
		}

		case ShoppingCartActionKind.REMOVE: {
			const findProduct = state.items.find(
				({ product }) => product.id === payload.product.id
			);
			if (findProduct === undefined) {
				return state;
			}
			const { product, count } = findProduct;
			state.subTotal -= product.price * count;
			state.totalDiscount -= ((product.price * product.discount) / 100) * count;
			state.totalPrice = state.subTotal - state.totalDiscount;

			state.items = state.items.filter(
				({ product }) => product.id !== payload.product.id
			);

			localStorage.setItem("shopping-cart", JSON.stringify(state));
			return { ...state };
		}

		case ShoppingCartActionKind.UPDATE: {
			console.log("algo");
			const findProduct = state.items.find(
				({ product }) => product.id === payload.product.id
			);

			if (findProduct === undefined) {
				return state;
			}

			state.subTotal -= findProduct.product.price * findProduct.count;
			state.totalDiscount -=
				((findProduct.product.price * findProduct.product.discount) / 100) *
				findProduct.count;
			state.totalPrice = state.subTotal - state.totalDiscount;

			state.subTotal += findProduct.product.price * payload.count;
			state.totalDiscount +=
				((findProduct.product.price * findProduct.product.discount) / 100) *
				payload.count;
			state.totalPrice = state.subTotal - state.totalDiscount;

			state.items.map((product) => {
				if (product.product.id === payload.product.id)
					product.count = payload.count;
			});

			localStorage.setItem("shopping-cart", JSON.stringify(state));
			return { ...state };
		}

		case ShoppingCartActionKind.RESET: {
			state.items = [];
			state.subTotal = 0;
			state.totalDiscount = 0;
			state.totalPrice = 0;

			return { ...state };
		}

		default:
			state;
	}
};

const initialState: ShoppingCart = {
	items: [],
	subTotal: 0,
	totalDiscount: 0,
	totalPrice: 0,
};

export const ShoppingCartProvider = ({ children }) => {
	const [shoppingCart, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		const order = JSON.parse(
			localStorage.getItem("shopping-cart")
		) as ShoppingCart;

		if (order !== null) {
			order.items.map((product) => {
				dispatch({ type: ShoppingCartActionKind.ADD, payload: product });
			});
		}
	}, []);

	return (
		<ShoppingCartContext.Provider
			value={{
				shoppingCart,
				dispatch,
			}}
		>
			{children}
		</ShoppingCartContext.Provider>
	);
};
function Dispatch<T>() {
	throw new Error("Function not implemented.");
}
