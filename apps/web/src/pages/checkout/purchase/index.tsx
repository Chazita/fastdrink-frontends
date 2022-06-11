import {
	Box,
	Button,
	Divider,
	Flex,
	Heading,
	SimpleGrid,
	Text,
	useColorModeValue,
	VStack,
} from "@chakra-ui/react";
import { CreateAccount, SignIn } from "components/Checkout-Purchase/FirstStep";
import StepperBox from "components/StepperBox";
import { ShoppingCartContext } from "contexts/shoppingCartContext";
import { UserContext } from "contexts/userContext";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { MdArrowBackIosNew } from "react-icons/md";

const CheckoutPurchase = () => {
	const router = useRouter();
	const [loginOrCreate, setLoginOrCreate] = useState(true);
	const { shoppingCart } = useContext(ShoppingCartContext);
	const { userInfo } = useContext(UserContext);
	return (
		<Flex justifyContent={"center"}>
			<Flex w="52vw" direction="column">
				<Flex
					direction={"row"}
					align={"center"}
					mt="5"
					mb="5"
					_hover={{ textDecoration: "underline" }}
					onClick={router.back}
				>
					<MdArrowBackIosNew size="20" />
					<Text as="span">Volver</Text>
				</Flex>
				<Flex justifyContent={"space-evenly"} alignSelf="center" w="100%">
					<Flex w="70%" direction={"column"}>
						<StepperBox
							title={loginOrCreate ? "1.Crear cuenta" : "1.Iniciar Sesion"}
							mb="4"
							isActive
						>
							{userInfo === undefined ? (
								loginOrCreate ? (
									<CreateAccount setLoginOrCreate={setLoginOrCreate} />
								) : (
									<SignIn />
								)
							) : (
								<></>
							)}
						</StepperBox>
						<StepperBox title="2.Datos personales" mb="4"></StepperBox>
						<StepperBox title="3.Dirección de entrega" mb="4"></StepperBox>
						<StepperBox title="4.Método de pago" mb="4"></StepperBox>
					</Flex>

					<Flex w="25%">
						<Box
							borderWidth="1px"
							borderRadius="lg"
							boxShadow={"xl"}
							bg={useColorModeValue("gray.100", "gray.900")}
							w="100%"
							padding="5"
						>
							<Heading fontSize={"xl"}>Tu plan de bebidas</Heading>

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
