import { BaseDetails } from "./BaseDetails";

export interface EnergyDrinkDetails extends BaseDetails {
	nonAlcoholic: boolean;
	energizing: boolean;
	dietetics: boolean;
	flavor: string;
}
