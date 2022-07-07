import { Badge } from "@chakra-ui/react";

import { ReactElement } from "react";

type OrderStatusBadgeProps = {
	status: string;
};

const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
	let badgeStatus: ReactElement;
	switch (status) {
		case "Pending":
			badgeStatus = <Badge variant="solid">Pendiente</Badge>;
			break;

		case "Shipped":
			badgeStatus = (
				<Badge variant="solid" colorScheme="blue">
					Enviado
				</Badge>
			);
			break;

		case "Completed":
			badgeStatus = (
				<Badge variant="solid" colorScheme="green">
					Completado
				</Badge>
			);
			break;

		case "Canceled":
			badgeStatus = (
				<Badge variant="solid" colorScheme="red">
					Cancelado
				</Badge>
			);
			break;

		case "Declined":
			badgeStatus = (
				<Badge variant="solid" colorScheme="red">
					Rechazado
				</Badge>
			);
			break;
	}

	return badgeStatus;
};

export default OrderStatusBadge;
