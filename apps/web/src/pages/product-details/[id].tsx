import { useQuery } from "react-query";
import { useState } from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";

import { ProductDetails } from "shared/types/Product/ProductDetails";
import axios from "axios";
import {
	Container,
	Flex,
	SimpleGrid,
	Image,
	Stack,
	Box,
	Heading,
	Text,
	NumberInput,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInputField,
	NumberInputStepper,
	IconButton,
	FormLabel,
	FormControl,
	HStack,
	Divider,
	Skeleton,
} from "@chakra-ui/react";

import { MdAdd } from "react-icons/md";
import ProductDetailsView from "components/Products/Details";

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
	return {
		props: {
			params,
		},
	};
};

const ProductDetails = ({ params }) => {
	const [count, setCount] = useState<number>(1);
	const { data, isLoading, isFetching } = useQuery(
		["get-product", params.id],
		() => {
			return axios.get<ProductDetails>(`/Product/get-details/${params.id}`);
		},
		{
			onSuccess: ({ data }) => {
				if (data.stock <= 0) {
					setCount(0);
				}
			},
		}
	);

	if (!isLoading && !isFetching && data !== undefined) {
		const product = data.data;
		return (
			<>
				<Head>
					<title>{"Fast Drink - " + product.name}</title>
				</Head>
				<Container maxW={"4xl"}>
					<SimpleGrid
						columns={{ base: 1, lg: 2 }}
						spacing={{ base: 8, md: 10 }}
						py={{ base: 18, md: 24 }}
					>
						<Flex position={"relative"} textAlign="center">
							<Image
								src={product.photo.photoUrl}
								alt=""
								fit={"cover"}
								align="center"
								w={"100%"}
								h={{ base: "100%", sm: "400px", lg: "500px" }}
							/>
							<Box
								color={"white"}
								position="absolute"
								display={product.stock <= 0 ? "auto" : "none"}
								top="50%"
								left="50%"
								w="300px"
								fontSize={"5xl"}
								borderRadius={"xl"}
								transform={"translate(-50%,-50%) rotate(-40deg);"}
								backgroundColor="red"
							>
								<Text>Sin Stock</Text>
							</Box>
						</Flex>
						<Stack spacing={{ base: 6, md: 10 }} justifyContent="center">
							<Box>
								<Heading
									lineHeight={1.1}
									fontWeight={600}
									fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
								>
									{product.name}
								</Heading>
								<Text color={"gray.400"} fontWeight={300}>
									{product.volume}ml
								</Text>
							</Box>

							<Box>
								<Heading
									color={"blue.600"}
									fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
									fontWeight={450}
								>
									$
									{count === 0
										? product.price.toFixed(2)
										: (product.price * count).toFixed(2)}
								</Heading>

								<Text size="xl">
									<Text as="span" color="blue.600">
										{count} unidades{" "}
									</Text>
									<Text as="span" color="gray.400">
										${product.price.toFixed(2)} x 1 unidad
									</Text>
								</Text>
							</Box>

							<HStack>
								<FormControl>
									<FormLabel
										fontWeight={400}
										htmlFor="quantity"
										color="gray.400"
									>
										Eligí la cantidad:
									</FormLabel>
									<NumberInput
										id="quantity"
										isDisabled={product.stock <= 0}
										value={count}
										onChange={(value) => setCount(+value)}
										min={0}
										max={product.stock}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
								<IconButton
									isRound
									colorScheme={"blue"}
									size="lg"
									icon={<MdAdd size={"25px"} />}
									aria-label="add-shoppping-cart"
								/>
							</HStack>
						</Stack>
					</SimpleGrid>
				</Container>
				<Divider />
				<Container maxW={"4xl"}>
					<Heading color={"blue.500"} mt={"5"}>
						Características
					</Heading>
					<SimpleGrid columns={2} spacingY={4}>
						<ProductDetailsView product={product} />
					</SimpleGrid>
				</Container>
			</>
		);
	}

	return (
		<>
			<Head>
				<title>FastDrink - Cargando...</title>
			</Head>
			<Container maxW={"4xl"}>
				<SimpleGrid
					columns={{ base: 1, lg: 2 }}
					spacing={{ base: 8, md: 10 }}
					py={{ base: 18, md: 24 }}
				>
					<Skeleton>
						<Image
							src=""
							alt=""
							fit={"cover"}
							align="center"
							w={"100%"}
							h={{ base: "100%", sm: "400px", lg: "500px" }}
						/>
					</Skeleton>

					<Stack spacing={{ base: 6, md: 10 }} justifyContent="center">
						<Skeleton>
							<Heading
								lineHeight={1.1}
								fontWeight={600}
								fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
							>
								asd
							</Heading>
							<Text color={"gray.400"} fontWeight={300}>
								asd
							</Text>
						</Skeleton>

						<Skeleton>
							<Heading
								color={"blue.600"}
								fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
								fontWeight={450}
							>
								$asd
							</Heading>

							<Text size="xl">
								<Text as="span" color="blue.600">
									asd
								</Text>
								<Text as="span" color="gray.400">
									asd
								</Text>
							</Text>
						</Skeleton>

						<HStack>
							<Skeleton>
								<FormControl>
									<FormLabel
										fontWeight={400}
										htmlFor="quantity"
										color="gray.400"
									>
										Eligí la cantidad:
									</FormLabel>
									<NumberInput
										id="quantity"
										value={count}
										onChange={(value) => setCount(+value)}
										min={0}
									>
										<NumberInputField />
										<NumberInputStepper>
											<NumberIncrementStepper />
											<NumberDecrementStepper />
										</NumberInputStepper>
									</NumberInput>
								</FormControl>
								<IconButton
									isRound
									colorScheme={"blue"}
									size="lg"
									icon={<MdAdd size={"25px"} />}
									aria-label="add-shoppping-cart"
								/>
							</Skeleton>
						</HStack>
					</Stack>
				</SimpleGrid>
			</Container>
			<Divider />
			<Container maxW={"4xl"}>
				<Skeleton>
					<Heading color={"blue.500"} mt={"5"}>
						Características
					</Heading>
				</Skeleton>
				<SimpleGrid columns={2} spacingY={4}>
					<Skeleton w={"30%"}>
						<Text color={"gray.400"}>Volumen</Text>
						<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
							asd
						</Text>
					</Skeleton>
					<Skeleton w={"30%"}>
						<Text color={"gray.400"}>Envase</Text>
						<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
							2asd
						</Text>
					</Skeleton>
					<Skeleton w={"30%"}>
						<Text color={"gray.400"}>Sabor</Text>
						<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
							asd
						</Text>
					</Skeleton>
					<Skeleton w={"30%"}>
						<Text color={"gray.400"}>Detetica</Text>
						<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
							sd
						</Text>
					</Skeleton>
					<Skeleton w={"30%"}>
						<Text color={"gray.400"}>Energizante</Text>
						<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
							asd
						</Text>
					</Skeleton>
					<Skeleton w={"30%"}>
						<Text color={"gray.400"}>Sin Alcohol</Text>
						<Text fontSize={"xl"} fontWeight={500} color={"blue.500"}>
							asd
						</Text>
					</Skeleton>
				</SimpleGrid>
			</Container>
		</>
	);
};

export default ProductDetails;
