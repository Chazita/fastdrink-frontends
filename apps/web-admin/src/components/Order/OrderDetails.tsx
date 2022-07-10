import {
	Accordion,
	AccordionButton,
	AccordionIcon,
	AccordionItem,
	AccordionPanel,
	Box,
	Flex,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Stack,
	Text,
	Image,
	ModalFooter,
	useOutsideClick,
	Select,
} from "@chakra-ui/react";
import { useChangeStatus } from "hooks/useChangeStatus";
import { useRef, useState } from "react";

import { OrderAdmin } from "shared/types/Order/OrderAdmin";
import { capitalizeString } from "shared/utils/capitalizeString";
import OrderStatusBadge from "ui/src/OrderStatusBadge";

type OrderDetailsProps = {
	isOpen: boolean;
	onClose: () => void;
	order?: OrderAdmin;
};

const OrderDetails = ({ isOpen, onClose, order }: OrderDetailsProps) => {
	const [editable, setEditable] = useState(false);
	const statusMutation = useChangeStatus();
	const editableRef = useRef();
	useOutsideClick({
		ref: editableRef,
		handler: () => setEditable(false),
	});

	if (order === undefined) {
		return <></>;
	}

	const handleStatus = (status: string) => {
		statusMutation.mutate({ orderId: order.id, orderStatus: status });
	};

	const created = new Date(order.created);

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

						<AccordionItem>
							<h2>
								<AccordionButton>
									<Box flex={1} textAlign="left">
										Usuario
									</Box>
									<AccordionIcon />
								</AccordionButton>
							</h2>
							<AccordionPanel>
								<Flex fontSize={"2xl"}>
									<Text color="blue.400" fontWeight={"bold"} mr="2">
										Email:{" "}
									</Text>
									<Text>{order.user.email}</Text>
								</Flex>
								<Flex fontSize={"2xl"}>
									<Text color="blue.400" fontWeight={"bold"} mr="2">
										Nombre:
									</Text>
									<Text> {capitalizeString(order.user.firstName)}</Text>
								</Flex>
								<Flex fontSize={"2xl"}>
									<Text color="blue.400" fontWeight={"bold"} mr="2">
										Apellido:
									</Text>
									<Text> {capitalizeString(order.user.lastName)}</Text>
								</Flex>
							</AccordionPanel>
						</AccordionItem>
					</Accordion>
				</ModalBody>
				<ModalFooter justifyContent={"initial"}>
					<Flex
						w="100%"
						justifyContent="space-between"
						mt="3"
						alignItems={"center"}
					>
						<Box>Total: ${order.totalPrice}</Box>
						<Box ref={editableRef} onClick={() => setEditable(true)}>
							{editable ? (
								<Select
									onChange={(e) => handleStatus(e.target.value)}
									defaultValue={order.orderStatus}
								>
									<option value="pending">Pendiente</option>
									<option value="Shipped">Enviado</option>
									<option value="Completed">Completado</option>
									<option value="Canceled">Cancelado</option>
									<option value="Declined">Rechazado</option>
								</Select>
							) : (
								<OrderStatusBadge status={order.orderStatus} />
							)}
						</Box>
					</Flex>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default OrderDetails;
