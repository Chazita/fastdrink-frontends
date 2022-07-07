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
	Input,
	InputGroup,
	InputRightElement,
	IconButton,
	FormControl,
	FormLabel,
} from "@chakra-ui/react";
import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

import { MdSearch } from "react-icons/md";

import { useQuery } from "react-query";
import { BaseType } from "shared/types";
import { capitalizeStringUnderscore } from "shared/utils/capitalizeString";

type FilterContainerProps = {
	setOrder: Dispatch<SetStateAction<string>>;
	setBrand: Dispatch<SetStateAction<string>>;
	setSearch: Dispatch<SetStateAction<string>>;
};

type SearchForm = {
	search: string;
};

const FilterContainer = ({
	setOrder,
	setBrand,
	setSearch,
}: FilterContainerProps) => {
	const { data, isLoading, isFetching } = useQuery("brands", () => {
		return axios.get<BaseType[]>("/Brand");
	});
	const router = useRouter();

	const { register, handleSubmit } = useForm<SearchForm>();

	const handleSearch = (data: SearchForm) => {
		setSearch(data.search);
	};

	return (
		<Box
			alignSelf={{ base: "center", md: "auto" }}
			ml="1%"
			w={{ base: "90%", md: "20%", lg: "15%", xl: "10%" }}
		>
			<Box as="form" mb="4" onSubmit={handleSubmit(handleSearch)}>
				<FormControl>
					<FormLabel>Buscar Producto</FormLabel>
					<InputGroup>
						<Input placeholder="Ej:Cerveza" {...register("search")} />
						<InputRightElement>
							<IconButton
								type="submit"
								variant="ghost"
								isRound
								size={"sm"}
								aria-label="search"
								icon={<MdSearch />}
							/>
						</InputRightElement>
					</InputGroup>
				</FormControl>
			</Box>
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
