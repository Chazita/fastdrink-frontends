import { Td, Tr, Button, Box, useOutsideClick, Select } from "@chakra-ui/react";
import { useChangeStatus } from "hooks/useChangeStatus";
import { Dispatch, SetStateAction, useRef, useState } from "react";
import { OrderAdmin } from "shared/types/Order/OrderAdmin";
import OrderStatusBadge from "ui/src/OrderStatusBadge";

type OrderTableBodyProps = {
	order: OrderAdmin;
	setOrderAdmin: Dispatch<SetStateAction<OrderAdmin>>;
	onOpen: () => void;
};

const OrderTableBody = ({
	order,
	setOrderAdmin,
	onOpen,
}: OrderTableBodyProps) => {
	const [editable, setEditable] = useState(false);
	const statusMutation = useChangeStatus();
	const editableRef = useRef();
	useOutsideClick({
		ref: editableRef,
		handler: () => setEditable(false),
	});

	const handleModal = () => {
		setOrderAdmin(order);
		onOpen();
	};

	const handleStatus = (status: string) => {
		statusMutation.mutate({ orderId: order.id, orderStatus: status });
	};

	return (
		<Tr>
			<Td>Orden #{order.id}</Td>
			<Td display={["none", "table-cell"]}>{order.user.email}</Td>
			<Td display={["none", "table-cell"]}>${order.totalPrice.toFixed(2)}</Td>
			<Td>
				<Box ref={editableRef} onClick={() => setEditable(true)}>
					{editable ? (
						<Select
							onChange={(e) => handleStatus(e.target.value)}
							defaultValue={order.orderStatus}
						>
							<option value="Pending">Pendiente</option>
							<option value="Shipped">Enviado</option>
							<option value="Completed">Completado</option>
							<option value="Canceled">Cancelado</option>
							<option value="Declined">Rechazado</option>
						</Select>
					) : (
						<OrderStatusBadge status={order.orderStatus} />
					)}
				</Box>
			</Td>
			<Td>
				<Button onClick={() => handleModal()} variant={"ghost"}>
					Ver detalles
				</Button>
			</Td>
		</Tr>
	);
};

export default OrderTableBody;
