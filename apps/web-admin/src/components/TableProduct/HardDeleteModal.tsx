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
		(id: string) =>
			axios.delete(`/Product/hard-delete/${id}`, { withCredentials: true }),
		{
			onSuccess: () => {
				queryClient.refetchQueries("products-admin");
				router.back();
			},
		}
	);
	return (
		<Modal
			isOpen={
				!!router.query.deleteId &&
				!!router.query.deleteName &&
				!!router.query.hardDelete
			}
			onClose={() => router.back()}
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader color="red.400">¿Confirma la eliminacion?</ModalHeader>
				<ModalCloseButton />

				<ModalBody>
					Esta seguro que desea eliminar{" "}
					<Text as="u" color="red">
						{router.query.deleteName}.
					</Text>
					Esta eliminacion puede afectar al registro de ordenes. Eliminelo si
					este producto fue subido por error.
				</ModalBody>
				<ModalFooter gap={4}>
					<Button colorScheme="green" onClick={() => router.back()}>
						Cancelar
					</Button>
					<Button
						isLoading={softDeleteMutation.isLoading}
						colorScheme="red"
						onClick={async () =>
							await softDeleteMutation.mutateAsync(
								router.query.deleteId as string
							)
						}
					>
						Eliminar
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
};

export default SoftDeleteModal;
