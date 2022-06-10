import { BaseDetails } from "./BaseDetails";

export interface BeerDetails extends BaseDetails {
	alcoholContent: number;
	style: string;
}
