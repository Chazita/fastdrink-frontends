import { BaseDetails } from "./BaseDetails";

export interface WineDetails extends BaseDetails {
	alcoholContent: number;
	variety?: string;
	style?: string;
}
