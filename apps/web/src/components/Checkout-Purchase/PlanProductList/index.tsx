import { Flex, IconButton } from "@chakra-ui/react";
import { ProductOrder } from "contexts/shoppingCartContext";
import { useState } from "react";
import PlanProductCard from "./PlanProductCard";

import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";

type PlanProductListProps = {
	shoppingCart: ProductOrder[];
};

const PlanProductList = ({ shoppingCart }: PlanProductListProps) => {
	const [showCard, setShowCard] = useState(false);
	return (
		<Flex
			position={"relative"}
			direction={"column"}
			maxH={showCard ? "" : "500px"}
			overflowY={"hidden"}
		>
			{shoppingCart.map((product) => (
				<PlanProductCard key={product.product.id} item={product} />
			))}

			<IconButton
				aria-label="show-card"
				isRound
				variant={"ghost"}
				icon={showCard ? <MdArrowDropUp /> : <MdArrowDropDown />}
				position={showCard ? "initial" : "absolute"}
				top={"455px"}
				left={"45%"}
				onClick={() => setShowCard((prev) => !prev)}
				w={"1"}
				mb={showCard ? "1" : "0"}
				alignSelf="center"
				hidden={shoppingCart.length <= 3}
			/>
		</Flex>
	);
};

export default PlanProductList;
