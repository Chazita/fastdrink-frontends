import {
	Box,
	Button,
	Flex,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	SimpleGrid,
} from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { Address } from "shared/types/Address";

type SecondStepProps = {
	nextStep: () => void;
	prevStep: () => void;
	setAddress: Dispatch<SetStateAction<Address>>;
	address: Address;
};

const SecondStep = ({
	nextStep,
	prevStep,
	setAddress,
	address,
}: SecondStepProps) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Address>({
		defaultValues: { province: "Provincia de Buenos Aires", ...address },
	});

	const nextSubmit = (data: Address) => {
		setAddress({ province: "Provincia de Buenos Aires", ...data });
		nextStep();
	};

	return (
		<Box as="form" onSubmit={handleSubmit(nextSubmit)}>
			<SimpleGrid columns={{ base: 1, md: 2 }}>
				<FormControl w={{ base: "100%", md: "90%" }}>
					<FormLabel>Provincia</FormLabel>
					<Input disabled {...register("province")} />
				</FormControl>

				<FormControl
					w={{ base: "100%", md: "90%" }}
					isInvalid={errors.city ? true : false}
				>
					<FormLabel>Ciudad</FormLabel>
					<Input
						{...register("city", {
							required: {
								value: true,
								message: "La ciudad es requerida.",
							},
							maxLength: {
								value: 50,
								message: "El maximo de caracteres es 50.",
							},
						})}
					/>
					<FormErrorMessage>
						{errors.city ? errors.city.message : ""}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					w={{ base: "100%", md: "90%" }}
					isInvalid={errors.street ? true : false}
				>
					<FormLabel>Calle</FormLabel>
					<Input
						{...register("street", {
							required: {
								value: true,
								message: "La calle es requerida.",
							},
						})}
					/>
					<FormErrorMessage>
						{errors.street ? errors.street.message : ""}
					</FormErrorMessage>
				</FormControl>

				<FormControl
					w={{ base: "100%", md: "90%" }}
					isInvalid={errors.code ? true : false}
				>
					<FormLabel>Codigo Postal</FormLabel>
					<Input
						type="number"
						{...register("code", {
							required: {
								value: true,
								message: "El codigo es requerido",
							},
							minLength: {
								value: 4,
								message: "El minimo de caracteres es 4.",
							},
							maxLength: {
								value: 5,
								message: "El maximo de caracteres es 4.",
							},
						})}
					/>
					<FormErrorMessage>
						{errors.code ? errors.code.message : ""}
					</FormErrorMessage>
				</FormControl>
			</SimpleGrid>

			<Flex mt="5" justifyContent={"space-between"}>
				<Button onClick={() => prevStep()} w={"40%"} colorScheme={"red"}>
					Atras
				</Button>

				<Button type="submit" w={"40%"} colorScheme={"blue"}>
					Siguiente
				</Button>
			</Flex>
		</Box>
	);
};

export default SecondStep;
