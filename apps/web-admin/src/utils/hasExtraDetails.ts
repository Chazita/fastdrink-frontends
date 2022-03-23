import { ProductDetails } from "shared/src/Product/ProductDetails";

const hasExtraDetails = ({
	alcoholDetails,
	beerDetails,
	sodaDetails,
	wineDetails,
	waterDetails,
	flavorDetails,
	energyDrinkDetails,
}: ProductDetails) => {
	if (
		alcoholDetails ||
		beerDetails ||
		sodaDetails ||
		wineDetails ||
		waterDetails ||
		flavorDetails ||
		energyDrinkDetails
	) {
		return true;
	}

	return false;
};

export default hasExtraDetails;
