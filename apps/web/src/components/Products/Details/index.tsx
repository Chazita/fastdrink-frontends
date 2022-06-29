import { ProductDetails } from "shared/types/Product/ProductDetails";

import ProductDetailsAlcohol from "./ProductDetailsAlcohol";
import ProductDetailsBeer from "./ProductDetailsBeer";
import ProductDetailsEnergyDrink from "./ProductDetailsEnergyDrink";
import ProductDetailsFlavor from "./ProductDetailsFlavor";
import ProductDetailsSoda from "./ProductDetailsSoda";
import ProductDetailsWater from "./ProductDetailsWater";
import ProductDetailsWine from "./ProductDetailsWine";

type ProductDetailsViewProps = {
	product: ProductDetails;
};

const ProductDetailsView = ({ product }: ProductDetailsViewProps) => {
	switch (product.category.name) {
		case "cerveza":
			return <ProductDetailsBeer product={product} />;
		case "alcohol":
			return <ProductDetailsAlcohol product={product} />;
		case "bebida_energizante":
			return <ProductDetailsEnergyDrink product={product} />;
		case "gaseosa":
			return <ProductDetailsSoda product={product} />;
		case "agua":
			return <ProductDetailsWater product={product} />;
		case "vino":
			return <ProductDetailsWine product={product} />;
		case "jugo":
			return <ProductDetailsFlavor product={product} />;
		case "bebida_isot�nica":
			return <ProductDetailsFlavor product={product} />;
	}
};

export default ProductDetailsView;
