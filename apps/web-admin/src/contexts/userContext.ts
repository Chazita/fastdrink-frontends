import { AxiosResponse } from "axios";
import { createContext } from "react";
import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
} from "react-query";

export type UserInfo = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
};

export type UserContextType = {
	userInfo: UserInfo;
	userRefetch: (
		options?: RefetchOptions & RefetchQueryFilters<unknown>
	) => Promise<QueryObserverResult<AxiosResponse<UserInfo, any>, unknown>>;
};

const UserContext = createContext<UserContextType>(undefined);

export default UserContext;
