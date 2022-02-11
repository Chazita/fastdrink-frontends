import { BaseDetails } from "./BaseDetails";

export interface SodaDetails extends BaseDetails {
	flavor: string;
	dietetics: boolean;
}
