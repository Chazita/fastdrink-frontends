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
	useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const SoftDeleteModal = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const toast = useToast();

	const softDeleteMutation = useMutation(
		"soft-delete-product",
		(id: string) => axios.delete(`/Product/${id}`, { withCredentials: true }),
		{
			onSuccess: () => {
				queryClient.refetchQueries("products-admin");
				router.back();
				toast({
					title: "Producto ha sido desactivado.",
					isClosable: true,
					status: "success",
					description: `El producto ${router.query.deleteName} ha sido desactivado.`,
				});
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
							await softDeleteMutation.mutateAsync(
								router.query.deleteId as string
							)
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
