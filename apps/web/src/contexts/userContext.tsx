import axios, { AxiosResponse } from "axios";
import { createContext } from "react";

import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
	useQuery,
} from "react-query";

export type UserInfo = {
	id: number;
	email: string;
	firstName: string;
	lastName: string;
};

export type UserContextType = {
	userInfo: UserInfo | undefined;
	userRefetch: (
		options?: RefetchOptions & RefetchQueryFilters<unknown>
	) => Promise<QueryObserverResult<AxiosResponse<UserInfo, any>, unknown>>;
};

export const UserContext = createContext<UserContextType>(undefined);

export function UserProvider({ children }) {
	const { data, refetch } = useQuery("check-user", () => {
		return axios.get<UserInfo>("/Auth/check-user", { withCredentials: true });
	});

	return (
		<UserContext.Provider
			value={{
				userInfo: data ? data.data : undefined,
				userRefetch: refetch,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
