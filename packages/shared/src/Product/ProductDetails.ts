import {
	AlcoholDetails,
	BeerDetails,
	EnergyDrinkDetails,
	FlavorDetails,
	SodaDetails,
	WaterDetails,
	WineDetails,
} from "./Details";
import { Product } from "./Product";

export interface ProductDetails extends Product {
	alcoholDetails: AlcoholDetails;
	beerDetails: BeerDetails;
	energyDrinkDetails: EnergyDrinkDetails;
	flavorDetails: FlavorDetails;
	sodaDetails: SodaDetails;
	waterDetails: WaterDetails;
	wineDetails: WineDetails;
}
