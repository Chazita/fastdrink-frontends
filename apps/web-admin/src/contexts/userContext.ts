import { AxiosResponse } from "axios";
import { createContext } from "react";
import { UserInfo } from "shared/types/UserInfo";

import {
	QueryObserverResult,
	RefetchOptions,
	RefetchQueryFilters,
} from "react-query";

export type UserContextType = {
	userInfo: UserInfo;
	userRefetch: (
		options?: RefetchOptions & RefetchQueryFilters<unknown>
	) => Promise<QueryObserverResult<AxiosResponse<UserInfo, any>, unknown>>;
};

const UserContext = createContext<UserContextType>(undefined);

export default UserContext;
