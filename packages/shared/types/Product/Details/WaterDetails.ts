import { BaseDetails } from "./BaseDetails";

export interface WaterDetails extends BaseDetails {
	lowInSodium: boolean;
	gasified: boolean;
}
