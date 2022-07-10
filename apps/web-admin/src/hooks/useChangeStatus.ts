import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

type ChangeStatusProps = {
	orderId: string;
	orderStatus: string;
};

export const useChangeStatus = () => {
	const queryClient = useQueryClient();
	return useMutation(
		"change-status",
		({ orderId, orderStatus }: ChangeStatusProps) => {
			if (orderStatus === "Canceled" || orderStatus === "Declined") {
				return axios.delete("/Order/modify-status", {
					withCredentials: true,
					data: { orderId, orderStatus },
				});
			}

			return axios.put(
				"/Order/modify-status",
				{ orderId, orderStatus },
				{ withCredentials: true }
			);
		},
		{
			onSuccess: () => {
				queryClient.invalidateQueries("all-orders");
			},
		}
	);
};
