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

const SoftDeleteModal = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const softDeleteMutation = useMutation(
		"soft-delete-product",
		(id: number) => axios.delete(`/Product/${id}`, { withCredentials: true }),
		{
			onSuccess: () => {
				queryClient.refetchQueries("products-admin");
				router.back();
			},
		}
	);

	return (
		<Modal
			isOpen={!!router.query.deleteId && !!router.query.deleteName}
			onClose={() => router.back()}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color="red.400">¿Confirma la desactivacion?</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					Esta seguro que desea desactivar el producto{" "}
					<Text as="u" color="red">
						{router.query.deleteName}.
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
							await softDeleteMutation.mutateAsync(+router.query.deleteId)
						}
					>
						Desactivar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default SoftDeleteModal;
