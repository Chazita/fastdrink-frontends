import { useRouter } from "next/router";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import RootContext from "contexts/rootContext";
import theme from "../theme";

import Layout from "../layout";
import Login from "./login";

import axios from "axios";
import {
	QueryClientProvider,
	QueryClient,
	QueryClientConfig,
} from "react-query";

const queryConfig: QueryClientConfig = {
	defaultOptions: {
		mutations: {
			retry: 0,
		},
		queries: {
			retry: 0,
			refetchOnWindowFocus: false,
		},
	},
};

const queryClient = new QueryClient(queryConfig);

axios.defaults.baseURL = "https://localhost:7134/api";

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Fast Drink</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider resetCSS theme={theme}>
					<RootContext>
						{router.asPath === "/login" ? (
							<Login />
						) : (
							<Layout>
								<Component {...pageProps} />
							</Layout>
						)}
					</RootContext>
				</ChakraProvider>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
