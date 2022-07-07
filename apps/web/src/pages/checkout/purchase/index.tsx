import useSteps from "hooks/useSteps";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";
import { useMutation } from "react-query";

import {
	Box,
	Button,
	Center,
	Container,
	Divider,
	Flex,
	Heading,
	Stack,
	Text,
	useColorModeValue,
	useToast,
	VStack,
} from "@chakra-ui/react";

import axios from "axios";

import { CreateAccount, SignIn } from "components/Checkout-Purchase/FirstStep";
import PlanProductList from "components/Checkout-Purchase/PlanProductList";
import SecondStep from "components/Checkout-Purchase/SecondStep";
import ThirdStep from "components/Checkout-Purchase/ThirdStep";
import StepperBox from "components/StepperBox";

import {
	ShoppingCartActionKind,
	ShoppingCartContext,
} from "contexts/shoppingCartContext";
import { UserContext } from "contexts/userContext";
import { Address } from "shared/types/Address";
import { OrderCreate } from "shared/types/Order/OrderCreate";

const CheckoutPurchase = () => {
	const router = useRouter();
	const toast = useToast();
	const background = useColorModeValue("gray.100", "gray.900");
	const { activeStep, nextStep, prevStep } = useSteps({
		initialState: 1,
	});

	const [loginOrCreate, setLoginOrCreate] = useState(true);
	const [address, setAddress] = useState<Address>({
		city: "",
		code: "",
		province: "",
		street: "",
	});

	const { shoppingCart, dispatch } = useContext(ShoppingCartContext);
	const { userInfo } = useContext(UserContext);

	useEffect(() => {
		setTimeout(() => {
			if (shoppingCart.items.length === 0) {
				router.push("/products/1");
			}
		}, 500);
	});

	const mutationOrder = useMutation(
		"create-order",
		() => {
			const orderProducts = shoppingCart.items.map((product): OrderCreate => {
				return { productId: product.product.id, quantity: product.count };
			});
			return axios.post(
				"/Order",
				{ orderProducts, address },
				{ withCredentials: true }
			);
		},
		{
			onSuccess: () => {
				dispatch({
					type: ShoppingCartActionKind.RESET,
					payload: shoppingCart.items[0],
				});

				toast({
					title: "Orden creada",
					description: "La orden a sido creada exitosamente.",
					status: "success",
					duration: 9000,
					isClosable: true,
				});
				router.push("/");
			},
			onError: () => {
				toast({
					title: "ERROR",
					description: "La orden no se pudo crear",
					status: "error",
					duration: 5000,
					isClosable: true,
				});
			},
		}
	);

	if (activeStep === 4) {
		return (
			<Flex
				align={"center"}
				justify={"center"}
				h="calc(99vh - 80px)"
				w={"full"}
			>
				<Stack
					as={Container}
					bg={background}
					rounded={"xl"}
					p={8}
					spacing={6}
					align="center"
					textAlign="center"
				>
					<Stack>
						<Heading>¿Desea finalizar la compra?</Heading>
						<Text color="red">¡Esta pagina es una demo!</Text>
					</Stack>
					<Flex w="100%" justifyContent={"space-between"}>
						<Button onClick={() => prevStep()} w="40%" colorScheme={"red"}>
							No, atras.
						</Button>
						<Button
							onClick={() => mutationOrder.mutate()}
							w="40%"
							colorScheme={"blue"}
							isLoading={mutationOrder.isLoading}
						>
							Si.
						</Button>
					</Flex>
				</Stack>
			</Flex>
		);
	}

	return (
		<Flex justifyContent={"center"}>
			<Flex
				w={{
					base: "100vw",
					sm: "90vw",
					md: "90vw",
					lg: "82vw",
					xl: "70vw",
					"2xl": "60vw",
				}}
				direction={"column"}
			>
				<Flex mt="5" mb="5">
					<Flex
						align={"center"}
						_hover={{ textDecoration: "underline" }}
						onClick={router.back}
					>
						<MdArrowBackIosNew size="20" />
						<Text as="span">Volver</Text>
					</Flex>
				</Flex>
				<Flex
					justifyContent={"space-evenly"}
					alignSelf="center"
					w="100%"
					direction={{ base: "column", lg: "row" }}
				>
					<Flex
						w={{ base: "100%", md: "100%", lg: "50vw" }}
						direction={"column"}
						padding={"3"}
					>
						<StepperBox
							title={
								userInfo
									? ""
									: loginOrCreate
									? "1.Crear cuenta"
									: "1.Iniciar Sesion"
							}
							mb="4"
							isActive={activeStep === 1}
						>
							{userInfo === undefined ? (
								loginOrCreate ? (
									<CreateAccount setLoginOrCreate={setLoginOrCreate} />
								) : (
									<SignIn setLoginOrCreate={setLoginOrCreate} />
								)
							) : (
								<Center flexDirection={"column"}>
									<Text fontSize="2xl" mb="2">
										Hola {userInfo.lastName} {userInfo.firstName}
									</Text>
									<Button
										borderRadius="full"
										colorScheme="blue"
										onClick={nextStep}
									>
										Siguiente
									</Button>
								</Center>
							)}
						</StepperBox>

						<StepperBox
							title="2.Dirección de entrega"
							mb="4"
							isActive={activeStep === 2}
						>
							<SecondStep
								setAddress={setAddress}
								address={address}
								prevStep={prevStep}
								nextStep={nextStep}
							/>
						</StepperBox>
						<StepperBox
							title="3.Método de pago"
							mb="4"
							isActive={activeStep === 3}
						>
							<ThirdStep prevStep={prevStep} nextStep={nextStep} />
						</StepperBox>
					</Flex>

					<Flex
						w={{ base: "100%", md: "100%", lg: "25vw", "2xl": "25vw" }}
						padding="3"
					>
						<Box
							borderWidth="1px"
							borderRadius="lg"
							boxShadow={"xl"}
							bg={background}
							w="100%"
							padding="5"
						>
							<Heading fontSize={"xl"}>Tu plan de bebidas</Heading>
							<PlanProductList shoppingCart={shoppingCart.items} />
							<VStack>
								<Flex w="100%" justifyContent={"space-between"}>
									<Text>Subtotal</Text>
									<Text>${shoppingCart.subTotal}</Text>
								</Flex>
								<Flex w="100%" justifyContent={"space-between"}>
									<Text>Ahorro</Text>
									<Text color={"green.500"}>
										-${shoppingCart.totalDiscount}
									</Text>
								</Flex>
								<Divider />
								<Flex w="100%" justifyContent={"space-between"}>
									<Text>Total</Text>
									<Text>${shoppingCart.totalPrice}</Text>
								</Flex>
							</VStack>
						</Box>
					</Flex>
				</Flex>
			</Flex>
		</Flex>
	);
};

export default CheckoutPurchase;
