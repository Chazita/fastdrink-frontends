import {
	Image,
	Text,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Flex,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	Box,
	AccordionPanel,
	ModalFooter,
	Button,
} from "@chakra-ui/react";
import axios from "axios";

import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { Order } from "shared/types/Order/Order";
import { capitalizeString } from "shared/utils/capitalizeString";
import OrderStatusBadge from "ui/src/OrderStatusBadge";

type OrderModalDetailsProps = {
	order: Order;
	isOpen: boolean;
	onClose: () => void;
};

const OrderModalDetails = ({
	order,
	isOpen,
	onClose,
}: OrderModalDetailsProps) => {
	const [cancelOrder, setCancelOrder] = useState(false);
	const queryClient = useQueryClient();

	const cancelMutation = useMutation(
		"cancel-order",
		() => {
			return axios.delete("/Order/modify-status", {
				withCredentials: true,
				data: { orderId: order.id, orderStatus: "Canceled" },
			});
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("my-orders");
			},
		}
	);

	const created = new Date(order.created);

	const handleCancelation = () => {
		cancelMutation.mutate();
		setCancelOrder(false);
	};

	return (
		<Modal isOpen={isOpen} onClose={onClose}>
			<ModalOverlay />

			<ModalContent>
				<ModalHeader>
					<Text>Orden #{order.id}</Text>
					<Text color="grey">
						{created.toLocaleDateString() +
							" - " +
							created.toLocaleTimeString()}
					</Text>
				</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<Accordion allowToggle>
						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex={1} textAlign="left">
										Productos
									</Box>
									<Box> X{order.products.length}</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel maxH="500px" overflowY={"scroll"} mb="2" mt="2">
								{order.products.map(
									({ price, product, quantity, discount }) => (
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
									)
								)}
							</AccordionPanel>
						</AccordionItem>

						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex={1} textAlign="left">
										Direccion
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel>
								<Flex fontSize={"2xl"}>
									<Text color="blue.400" fontWeight={"bold"} mr="2">
										Provincia:{" "}
									</Text>
									<Text>{order.address.province}</Text>
								</Flex>
								<Flex fontSize={"2xl"}>
									<Text color="blue.400" fontWeight={"bold"} mr="2">
										Ciudad:
									</Text>
									<Text> {capitalizeString(order.address.city)}</Text>
								</Flex>
								<Flex fontSize={"2xl"}>
									<Text color="blue.400" fontWeight={"bold"} mr="2">
										Calle:
									</Text>
									<Text> {capitalizeString(order.address.street)}</Text>
								</Flex>
								<Flex fontSize={"2xl"}>
									<Text color="blue.400" fontWeight={"bold"} mr="2">
										Codigo Postal:
									</Text>
									<Text>{order.address.code}</Text>
								</Flex>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
					<Flex justifyContent="space-between" mt="3" alignItems={"center"}>
						<Box>Total: ${order.totalPrice}</Box>
						<OrderStatusBadge status={order.orderStatus} />
					</Flex>
				</ModalBody>
				<ModalFooter justifyContent={"left"}>
					{cancelOrder ? (
						<Box w="100%">
							<Text mb="2">¿Estas seguro que desea cancelar la orden?</Text>
							<Flex justifyContent={"space-between"}>
								<Button
									w="20%"
									onClick={() => setCancelOrder(false)}
									colorScheme={"green"}
								>
									No
								</Button>
								<Button
									w="20%"
									onClick={() => handleCancelation()}
									colorScheme={"red"}
								>
									Si
								</Button>
							</Flex>
						</Box>
					) : (
						<Button
							colorScheme={"red"}
							disabled={order.orderStatus !== "Pending"}
							onClick={() => setCancelOrder(true)}
						>
							Cancelar Orden
						</Button>
					)}
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default OrderModalDetails;
