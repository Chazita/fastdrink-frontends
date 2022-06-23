import { Stack, Flex, Image, Text, Box } from "@chakra-ui/react";
import { ProductOrder } from "contexts/shoppingCartContext";

type PlanProductCardProps = {
	item: ProductOrder;
};

const PlanProductCard = ({ item }: PlanProductCardProps) => {
	return (
		<Stack w="100%" height="10rem" direction="row" padding={4}>
			<Flex position={"relative"}>
				<Image h={"8rem"} src={item.product.photos[0].photoUrl} alt="" />
				<Box
					as="span"
					color="white"
					position="absolute"
					fontSize="1rem"
					bgColor="blue.400"
					borderRadius={"full"}
					zIndex={1}
					p={"0px 5px 1.2px 5px"}
					bottom="8px"
					right="16px"
				>
					{item.count}x
				</Box>
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
					$
					{item.count === 0
						? item.product.price
						: item.product.price * item.count}
				</Text>
			</Stack>
		</Stack>
	);
};

export default PlanProductCard;
