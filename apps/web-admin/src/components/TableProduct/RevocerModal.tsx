import { useRouter } from "next/router";
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalHeader,
	ModalOverlay,
	Text,
	Button,
	ModalFooter,
} from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const RecoverModal = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const softDeleteMutation = useMutation(
		"recover-product",
		(id: number) =>
			axios.put(
				`/Product/recover-product/${id}`,
				{},
				{ withCredentials: true }
			),
		{
			onSuccess: () => {
				queryClient.refetchQueries("products-admin");
				router.back();
			},
		}
	);

	return (
		<Modal
			isOpen={!!router.query.recoverId && !!router.query.revocerName}
			onClose={() => router.back()}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color="red.400">¿Confirma la recuperacion?</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					Esta seguro que desea recuperar/activar{" "}
					<Text as="u" color="red">
						{router.query.revocerName}.
					</Text>
				</ModalBody>
				<ModalFooter gap={4}>
					<Button colorScheme="green" onClick={() => router.back()}>
						Cancelar
					</Button>
					<Button
						isLoading={softDeleteMutation.isLoading}
						colorScheme="red"
						onClick={async () =>
							await softDeleteMutation.mutateAsync(+router.query.recoverId)
						}
					>
						Recuperar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default RecoverModal;
