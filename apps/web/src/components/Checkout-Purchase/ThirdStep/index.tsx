import {
	Box,
	Flex,
	Text,
	Button,
	Radio,
	RadioGroup,
	Stack,
} from "@chakra-ui/react";
import { useState } from "react";

type ThirdStepProps = {
	prevStep: () => void;
	nextStep: () => void;
};

const ThirdStep = ({ prevStep, nextStep }: ThirdStepProps) => {
	const [card, setCard] = useState<string>("");
	return (
		<Box>
			<RadioGroup onChange={(value) => setCard(value)}>
				<Stack>
					<Radio value="visa">Visa</Radio>
					<Radio value="master_card">Master Card</Radio>
					<Radio value="mercado_pago">Mercado Pago</Radio>
				</Stack>
			</RadioGroup>

			<Text></Text>

			<Flex mt="5" justifyContent={"space-between"}>
				<Button onClick={() => prevStep()} w={"40%"} colorScheme={"red"}>
					Atras
				</Button>

				<Button
					onClick={() => nextStep()}
					isDisabled={card.length <= 0}
					w={"40%"}
					colorScheme={"blue"}
				>
					Siguiente
				</Button>
			</Flex>
		</Box>
	);
};

export default ThirdStep;
