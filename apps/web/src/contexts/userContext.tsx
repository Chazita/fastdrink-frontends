import axios, { AxiosResponse } from "axios";
import { createContext } from "react";
import { UserInfo } from "shared/types/UserInfo";

import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
	useQuery,
} from "react-query";

export type UserContextType = {
	userInfo: UserInfo | undefined;
	userRefetch: (
		options?: RefetchOptions & RefetchQueryFilters<unknown>
	) => Promise<QueryObserverResult<AxiosResponse<UserInfo, any>, unknown>>;
	isLoading: boolean;
};

export const UserContext = createContext<UserContextType>(undefined);

export function UserProvider({ children }) {
	const { data, refetch, isLoading } = useQuery("check-user", () => {
		return axios.get<UserInfo>("/Auth/check-user", { withCredentials: true });
	});

	return (
		<UserContext.Provider
			value={{
				userInfo: data ? data.data : undefined,
				userRefetch: refetch,
				isLoading,
			}}
		>
			{children}
		</UserContext.Provider>
	);
}
