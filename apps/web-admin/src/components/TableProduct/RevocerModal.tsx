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

const RecoverModal = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const toast = useToast();

	const softDeleteMutation = useMutation(
		"recover-product",
		(id: string) =>
			axios.put(
				`/Product/recover-product/${id}`,
				{},
				{ withCredentials: true }
			),
		{
			onSuccess: () => {
				queryClient.refetchQueries("products-admin");
				router.back();
				toast({
					title: "Producto ha sido recuperado",
					isClosable: true,
					status: "success",
					description: `El producto ${router.query.recoverName} ha sido recuperado.`,
				});
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
							await softDeleteMutation.mutateAsync(
								router.query.recoverId as string
							)
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
