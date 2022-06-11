import { useContext, useRef } from "react";
import {
	IconButton,
	Drawer,
	useDisclosure,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerCloseButton,
	DrawerBody,
	Divider,
	Flex,
	Text,
	VStack,
	Box,
	DrawerFooter,
	Button,
} from "@chakra-ui/react";

import { MdShoppingCart } from "react-icons/md";
import { ShoppingCartContext } from "contexts/shoppingCartContext";
import ProductCardInCart from "./ProductCardInCart";
import Link from "next/link";

const ShoppingCart = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const btnRef = useRef();
	const { shoppingCart } = useContext(ShoppingCartContext);

	return (
		<>
			<IconButton
				variant={"ghost"}
				size={"md"}
				aria-label="shoppingCart"
				icon={
					<>
						<MdShoppingCart size={"24"} />
						{shoppingCart.items.length > 0 ? (
							<Box
								as="span"
								color="white"
								position="absolute"
								top="1px"
								right={"-5px"}
								fontSize="0.8rem"
								bgColor="blue.400"
								borderRadius={"full"}
								zIndex={1}
								p={"0px 5px 1.2px 5px"}
							>
								{shoppingCart.items.length}
							</Box>
						) : (
							<></>
						)}
					</>
				}
				onClick={onOpen}
				ref={btnRef}
			/>
			<Drawer
				isOpen={isOpen}
				onClose={onClose}
				placement="right"
				finalFocusRef={btnRef}
				size={"md"}
			>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						Mis bebidas seleccionadas
						<Divider mt="2" />
					</DrawerHeader>
					<DrawerBody>
						{shoppingCart.items.map((product) => (
							<ProductCardInCart key={product.product.id} item={product} />
						))}
						<VStack>
							<Flex w="100%" justifyContent={"space-between"}>
								<Text>Subtotal</Text>
								<Text>${shoppingCart.subTotal}</Text>
							</Flex>
							<Flex w="100%" justifyContent={"space-between"}>
								<Text>Ahorro</Text>
								<Text color={"green.500"}>-${shoppingCart.totalDiscount}</Text>
							</Flex>
							<Divider />
							<Flex w="100%" justifyContent={"space-between"}>
								<Text>Total</Text>
								<Text>${shoppingCart.totalPrice}</Text>
							</Flex>
						</VStack>
					</DrawerBody>
					<DrawerFooter
						d={shoppingCart.items.length > 0 ? "flex" : "none"}
						justifyContent={"center"}
					>
						<Link href="/checkout/purchase" passHref>
							<Button
								borderRadius={"full"}
								colorScheme="blue"
								onClick={() => onClose()}
							>
								SIGUIENTE
							</Button>
						</Link>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};

export default ShoppingCart;
