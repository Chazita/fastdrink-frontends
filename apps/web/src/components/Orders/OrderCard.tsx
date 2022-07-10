import {
	Box,
	Stack,
	Text,
	Image,
	Flex,
	useColorModeValue,
	Divider,
	Button,
	useDisclosure,
} from "@chakra-ui/react";

import { Order } from "shared/types/Order/Order";
import OrderModalDetails from "./OrderModalDetails";
import OrderStatusBadge from "ui/src/OrderStatusBadge";

type OrderCardProps = {
	order: Order;
};

const OrderCard = ({ order }: OrderCardProps) => {
	const { isOpen, onClose, onOpen } = useDisclosure();

	const created = new Date(order.created);
	const orderProducts = order.products.slice(0, 2);

	return (
		<>
			<Box
				h="365px"
				borderWidth="1px"
				borderRadius="lg"
				padding={"4"}
				bg={useColorModeValue("white", "gray.900")}
				boxShadow={"xl"}
			>
				<Stack direction={"column"}>
					<Text>Order #{order.id}</Text>
					<Text color="grey">
						{created.toLocaleDateString() +
							" - " +
							created.toLocaleTimeString()}
					</Text>
				</Stack>
				<Box minH="220px">
					{orderProducts.map(({ price, product, quantity, discount }) => (
						<Stack direction="row" key={product.id}>
							<Flex>
								<Image
									minW="114px"
									h="114px"
									src={product.photo.photoUrl}
									alt=""
								/>
							</Flex>
							<Stack
								w="100%"
								flexDirection="column"
								alignItems={"center"}
								p={1}
								pt={2}
							>
								<Text>{product.name}</Text>
								<Stack
									flex={1}
									w="100%"
									mt="1"
									padding={2}
									justifyContent="space-between"
									alignItems={"center"}
									direction="row"
								>
									<Text>${product.price * quantity}</Text>
									<Text>Cant: {quantity}</Text>
								</Stack>
							</Stack>
						</Stack>
					))}
				</Box>
				<Divider />
				<Stack
					direction={"row"}
					justifyContent="space-between"
					alignItems={"center"}
				>
					<Flex direction={"column"}>
						<Text>x{order.products.length}</Text>
						<Text>${order.totalPrice}</Text>
					</Flex>
					<Button onClick={onOpen} variant={"ghost"}>
						Ver Detalles
					</Button>
					<OrderStatusBadge status={order.orderStatus} />
				</Stack>
			</Box>
			<OrderModalDetails isOpen={isOpen} onClose={onClose} order={order} />
		</>
	);
};

export default OrderCard;
