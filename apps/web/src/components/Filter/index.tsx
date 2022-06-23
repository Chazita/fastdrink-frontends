import {
	Box,
	Heading,
	RadioGroup,
	Radio,
	VStack,
	Button,
	Accordion,
	AccordionItem,
	AccordionButton,
	AccordionIcon,
	AccordionPanel,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useQuery } from "react-query";
import { BaseType } from "shared/types";
import { capitalizeStringUnderscore } from "shared/utils/capitalizeString";

type FilterContainerProps = {
	setOrder: Dispatch<SetStateAction<string>>;
	setBrand: Dispatch<SetStateAction<string>>;
};

const FilterContainer = ({ setOrder, setBrand }: FilterContainerProps) => {
	const { data, isLoading, isFetching } = useQuery("brands", () => {
		return axios.get<BaseType[]>("/Brand");
	});
	const router = useRouter();

	return (
		<Box ml="1%">
			<Accordion allowMultiple allowToggle>
				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex={1} textAlign="left">
								Ordernar Por
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel>
						<RadioGroup
							onChange={(e) => {
								setOrder(e);
							}}
						>
							<VStack alignItems={"initial"}>
								<Radio value="more_recent">Mas Recientes</Radio>
								<Radio value="highest_price">Mayor Precio</Radio>
								<Radio value="lowest_price">Menor Precio</Radio>
							</VStack>
						</RadioGroup>
					</AccordionPanel>
				</AccordionItem>

				<AccordionItem>
					<h2>
						<AccordionButton>
							<Box flex={1} textAlign="left">
								Filtrar por marca
							</Box>
							<AccordionIcon />
						</AccordionButton>
					</h2>
					<AccordionPanel
						maxH={"xs"}
						overflowY="scroll"
						css={{
							"&::-webkit-scrollbar": {
								width: "4px",
							},
							"&::-webkit-scrollbar-track": {
								width: "6px",
							},
							"&::-webkit-scrollbar-thumb": {
								background: "#f1f1f1",
							},
						}}
						marginY="1"
					>
						<RadioGroup
							onChange={(e) => {
								setBrand(e);
							}}
						>
							{data !== undefined && !isFetching && !isLoading ? (
								<VStack alignItems={"initial"}>
									{data.data.map((brand) => (
										<Radio key={brand.id} value={brand.name}>
											{capitalizeStringUnderscore(brand.name)}
										</Radio>
									))}
								</VStack>
							) : (
								<></>
							)}
						</RadioGroup>
					</AccordionPanel>
				</AccordionItem>
			</Accordion>
			<Button
				mt="1"
				mb={{ base: "5", md: "" }}
				colorScheme={"blue"}
				isFullWidth
				onClick={() => {
					router.reload();
					router.push("/products/1");
				}}
			>
				Limpiar
			</Button>
		</Box>
	);
};

export default FilterContainer;
