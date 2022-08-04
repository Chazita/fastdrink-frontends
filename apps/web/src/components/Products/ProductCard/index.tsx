import {
	Flex,
	Image,
	Stack,
	useColorModeValue,
	Text,
	IconButton,
	Divider,
	HStack,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Link as LinkChakra,
	Box,
	StackProps,
} from "@chakra-ui/react";
import { Product } from "shared/types";

import { MdAdd, MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import Link from "next/link";
import {
	ShoppingCartActionKind,
	ShoppingCartContext,
} from "contexts/shoppingCartContext";

interface ProductCardProps extends StackProps {
	item: Product;
}

const ProductCard = ({ item, ...props }: ProductCardProps) => {
	const [count, setCount] = useState(0);
	const { dispatch, shoppingCart } = useContext(ShoppingCartContext);

	const calculatePrice = (): number => {
		let price: number = item.price;

		if (item.discount !== null && item.discount > 0) {
			price = item.price - (item.price * item.discount) / 100;
		}

		return price;
	};

	return (
		<Stack
			borderWidth="1px"
			borderRadius="lg"
			w="100%"
			height="10rem"
			direction="row"
			bg={useColorModeValue("white", "gray.900")}
			boxShadow={"xl"}
			padding={4}
			{...props}
		>
			<Flex>
				<Link href={`/product-details/${item.id}`} passHref>
					<LinkChakra position={"relative"} textAlign="center">
						<Image h={"8rem"} src={item.photo.photoUrl} alt="" />
						<Box
							color={"white"}
							position="absolute"
							display={item.stock <= 0 ? "auto" : "none"}
							top="50%"
							left="50%"
							w="100px"
							borderRadius={"xl"}
							transform={"translate(-50%,-50%) rotate(-40deg);"}
							backgroundColor="red"
						>
							<Text>Sin Stock</Text>
						</Box>
					</LinkChakra>
				</Link>
			</Flex>
			<Stack
				flex={1}
				flexDirection="column"
				justifyContent="center"
				p={1}
				pt={2}
			>
				<Link href={`/product-details/${item.id}`} passHref>
					<LinkChakra fontWeight={600} fontSize={"md"} fontFamily="body">
						{item.name}
					</LinkChakra>
				</Link>
				<Text fontWeight={600} color={"gray.500"} fontSize="xs" mb={4}>
					{item.volume}ml
				</Text>
				<HStack>
					<Text fontSize={"lg"}>
						$
						{count === 0
							? calculatePrice().toFixed(2)
							: (calculatePrice() * count).toFixed(2)}
					</Text>
					{item.discount !== null ? (
						<HStack spacing={2} fontSize="sm">
							<Text as="p" textDecorationLine={"line-through"}>
								$
								{count === 0
									? item.price.toFixed(2)
									: (item.price * count).toFixed(2)}
							</Text>
							<Text as="p" color="green">
								{item.discount}% OFF
							</Text>
						</HStack>
					) : (
						<></>
					)}
				</HStack>

				<HStack>
					<NumberInput
						isDisabled={item.stock <= 0}
						value={count}
						onChange={(value) => {
							if (+value > item.stock) {
								setCount(item.stock);
							}
							setCount(+value);
						}}
						min={0}
						max={item.stock}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<Text fontSize={"sm"}>${calculatePrice().toFixed(2)}c/u</Text>
				</HStack>
			</Stack>
			<Divider orientation="vertical" />
			<Stack justifyContent={"center"}>
				{shoppingCart.items.find((product) => {
					if (product.product.id === item.id) {
						return true;
					} else {
						return false;
					}
				}) ? (
					<IconButton
						isRound
						colorScheme={"red"}
						aria-label="remove-list"
						icon={<MdDelete size={"25px"} />}
						onClick={() =>
							dispatch({
								payload: { product: item, count },
								type: ShoppingCartActionKind.REMOVE,
							})
						}
					/>
				) : (
					<IconButton
						isRound
						colorScheme={"blue"}
						aria-label="add-list"
						icon={<MdAdd size={"25px"} />}
						isDisabled={count > 0 && item.stock > 0 ? false : true}
						onClick={() =>
							dispatch({
								payload: { product: item, count },
								type: ShoppingCartActionKind.ADD,
							})
						}
					/>
				)}
			</Stack>
		</Stack>
	);
};

export default ProductCard;
