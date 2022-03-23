import { AxiosResponse } from "axios";
import { createContext, Dispatch, SetStateAction } from "react";
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
} from "react-query";
import { ProductDetails } from "shared/src/Product/ProductDetails";

type ShowExtraDataType = {
	showFormExtra: boolean;
	setShowFormExtra: Dispatch<SetStateAction<boolean>>;
	refetchProduct: (
		options?: RefetchOptions & RefetchQueryFilters<unknown>
	) => Promise<
		QueryObserverResult<AxiosResponse<ProductDetails, any>, unknown>
	>;
};

const ShowExtraDataContext = createContext<ShowExtraDataType>(undefined);

export default ShowExtraDataContext;
