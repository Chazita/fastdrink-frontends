import {
	Flex,
	Image,
	Stack,
	Text,
	IconButton,
	HStack,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
} from "@chakra-ui/react";

import {
	ProductOrder,
	ShoppingCartActionKind,
	ShoppingCartContext,
} from "contexts/shoppingCartContext";

import { useContext, useState } from "react";
import { MdDelete } from "react-icons/md";

type ProductCardInCartProps = {
	item: ProductOrder;
};

const ProductCardInCart = ({ item }: ProductCardInCartProps) => {
	const [count, setCount] = useState(item.count);
	const { dispatch } = useContext(ShoppingCartContext);

	return (
		<Stack w="100%" height="10rem" direction="row" alignItems={"center"}>
			<Flex>
				<Image h={"8rem"} src={item.product.photos[0].photoUrl} alt="" />
			</Flex>
			<Stack
				flex={1}
				flexDirection="column"
				justifyContent="center"
				p={1}
				pt={2}
			>
				<Text fontWeight={600} fontSize={"md"} fontFamily="body">
					{item.product.name}
				</Text>
				<Text fontWeight={600} color={"gray.500"} fontSize="xs" mb={4}>
					{item.product.volumen}ml
				</Text>
				<Text fontSize={"sm"}>
					${count === 0 ? item.product.price : item.product.price * count}
				</Text>

				<HStack>
					<NumberInput
						value={count}
						onChange={(value) => {
							setCount(+value);
							dispatch({
								payload: { count: +value, product: item.product },
								type: ShoppingCartActionKind.UPDATE,
							});
						}}
						min={0}
						max={item.product.stock}
					>
						<NumberInputField />
						<NumberInputStepper>
							<NumberIncrementStepper />
							<NumberDecrementStepper />
						</NumberInputStepper>
					</NumberInput>
					<Text fontSize={"sm"}>${item.product.price}c/u</Text>
				</HStack>
			</Stack>

			<Stack justifyContent={"center"}>
				<IconButton
					isRound
					colorScheme={"red"}
					aria-label="remove-list"
					icon={<MdDelete size={"25px"} />}
					onClick={() =>
						dispatch({
							payload: item,
							type: ShoppingCartActionKind.REMOVE,
						})
					}
				/>
			</Stack>
		</Stack>
	);
};

export default ProductCardInCart;
