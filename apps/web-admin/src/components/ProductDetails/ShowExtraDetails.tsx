import { ProductDetails } from "shared/src/Product/ProductDetails";

import {
	ShowAlcoholDetails,
	ShowBeerDetails,
	ShowEnergyDrinkDetails,
	ShowFlavorDetails,
	ShowSodaDetails,
	ShowWaterDetails,
	ShowWineDetails,
} from "./ExtraDetails";

type ShowExtraDetailsProps = {
	category: string;
	product: ProductDetails;
};

const ShowExtraDetails = ({ category, product }: ShowExtraDetailsProps) => {
	switch (category) {
		case "alcohol":
			return <ShowAlcoholDetails product={product} />;
		case "cerveza":
			return <ShowBeerDetails product={product} />;
		case "bebida_energizante":
			return <ShowEnergyDrinkDetails product={product} />;
		case "gaseosa":
			return <ShowSodaDetails product={product} />;
		case "agua":
			return <ShowWaterDetails product={product} />;
		case "wine":
			return <ShowWineDetails product={product} />;
		case "jugo":
			return <ShowFlavorDetails product={product} />;
		case "bebida_isotónica":
			return <ShowFlavorDetails product={product} />;
		default:
			return <></>;
	}
};

export default ShowExtraDetails;
