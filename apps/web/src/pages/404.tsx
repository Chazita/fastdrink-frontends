import Link from "next/link";
import Head from "next/head";

import {
	Button,
	Container,
	Flex,
	Heading,
	Stack,
	Text,
} from "@chakra-ui/react";

const NotFound = () => {
	return (
		<>
			<Head>
				<title>Fast Drink - Error</title>
			</Head>
			<Flex
				align={"center"}
				justify={"center"}
				h="calc(99vh - 80px)"
				w={"full"}
			>
				<Stack
					as={Container}
					bg="gray.900"
					rounded={"xl"}
					p={8}
					spacing={6}
					align="center"
					textAlign="center"
				>
					<Stack>
						<Heading>Pagina no encontrada</Heading>
						<Text>
							Esta pagina no fue encontrada. Escribiste mal la direccion o la
							pagina fue movida.
						</Text>
					</Stack>
					<Flex>
						<Link href="/" passHref>
							<Button
								colorScheme="green"
								bg="green.400"
								_hover={{ bg: "green.500" }}
								rounded="full"
								as={"a"}
							>
								Hacia la pagina de inicio
							</Button>
						</Link>
					</Flex>
				</Stack>
			</Flex>
		</>
	);
};

export default NotFound;
