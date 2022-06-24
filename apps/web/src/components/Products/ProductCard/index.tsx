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
} from "@chakra-ui/react";
import { Product } from "shared/types";

import { MdAdd, MdDelete } from "react-icons/md";
import { useContext, useState } from "react";
import Link from "next/link";
import {
	ShoppingCartActionKind,
	ShoppingCartContext,
} from "contexts/shoppingCartContext";

type ProductCardProps = {
	item: Product;
};

const ProductCard = ({ item }: ProductCardProps) => {
	const [count, setCount] = useState(0);
	const { dispatch, shoppingCart } = useContext(ShoppingCartContext);

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
		>
			<Flex>
				<Link href={`/product-details/${item.id}`} passHref>
					<LinkChakra>
						<Image h={"8rem"} src={item.photos[0].photoUrl} alt="" />
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
					{item.volumen}ml
				</Text>
				<Text fontSize={"sm"}>
					${count === 0 ? item.price : item.price * count}
				</Text>

				<HStack>
					<NumberInput
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
					<Text fontSize={"sm"}>${item.price}c/u</Text>
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
						isDisabled={count > 0 ? false : true}
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
