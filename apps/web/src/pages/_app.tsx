import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import Layout from "../layout";
import theme from "../theme";

import axios from "axios";
import {
	QueryClientProvider,
	QueryClient,
	QueryClientConfig,
} from "react-query";
import { useRouter } from "next/router";

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
	return (
		<>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<title>Fast Drink</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<ChakraProvider resetCSS theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
