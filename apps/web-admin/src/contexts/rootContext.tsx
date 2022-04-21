import { ReactNode, useState } from "react";
import { useRouter } from "next/router";
import DataContext, {
	Brand,
	Category,
	NecessaryData,
	Container,
} from "./dataContext";
import UserContext, { UserInfo } from "./userContext";

import axios, { AxiosResponse } from "axios";
import { Center, Spinner } from "@chakra-ui/react";
import { useQueries, useQuery } from "react-query";

type Props = {
	children: ReactNode;
};

export default function RootContext({ children }: Props) {
	const router = useRouter();
	const [userInfo, setUserInfo] = useState<UserInfo>(undefined);
	const [data, setData] = useState<NecessaryData>({
		brands: [],
		categories: [],
		containers: [],
	});

	const userQuery = useQuery(
		"check-admin",
		() => {
			return axios.get<UserInfo>("/Auth/check-admin", {
				withCredentials: true,
			});
		},
		{
			onSuccess: (response) => {
				if (router.pathname === "/login") {
					router.push("/");
				}
				setUserInfo(response.data);
			},
			onError: () => {
				router.push("/login");
			},
		}
	);

	const results = useQueries([
		{
			queryKey: "categories",
			queryFn: () => {
				return axios.get<Category>("/Category");
			},
			onSuccess: (response: AxiosResponse<any, any>) => {
				setData((prev) => (prev = { ...prev, categories: response.data }));
			},
			retry: true,
		},
		{
			queryKey: "brands",
			queryFn: () => {
				return axios.get<Brand>("/Brand");
			},
			onSuccess: (response: AxiosResponse<any, any>) => {
				setData((prev) => (prev = { ...prev, brands: response.data }));
			},
			retry: true,
		},
		{
			queryKey: "containers",
			queryFn: () => {
				return axios.get<Container>("/Container");
			},
			onSuccess: (response: AxiosResponse<any, any>) => {
				setData((prev) => (prev = { ...prev, containers: response.data }));
			},
			retry: true,
		},
	]);

	return (
		<UserContext.Provider value={{ userRefetch: userQuery.refetch, userInfo }}>
			<DataContext.Provider
				value={{
					data,
					refetchData: async () => {
						Promise.all([
							results[0].refetch(),
							results[1].refetch(),
							results[2].refetch(),
						]);
					},
				}}
			>
				{userQuery.isLoading ? (
					<Center h="100vh" position="absolute" w="100vw" bg="black" zIndex="1">
						<Spinner size="xl" />
					</Center>
				) : (
					<></>
				)}
				{children}
			</DataContext.Provider>
		</UserContext.Provider>
	);
}
