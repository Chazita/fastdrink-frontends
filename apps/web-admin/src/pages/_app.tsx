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
	QueryClient,
	QueryClientProvider,
	QueryClientConfig,
	Hydrate,
} from "react-query";

axios.defaults.baseURL = "https://localhost:7134/api";

const config: QueryClientConfig = {
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
const queryClient = new QueryClient(config);

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>Web Admin</title>
			</Head>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
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
				</Hydrate>
			</QueryClientProvider>
		</>
	);
}

export default MyApp;
