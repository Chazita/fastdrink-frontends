import { createContext } from "react";

export type Category = {
	id: number;
	name: string;
};

export type Brand = {
	id: number;
	name: string;
};

export type Container = {
	id: number;
	name: string;
};

export type NecessaryData = {
	categories: Category[];
	brands: Brand[];
	containers: Container[];
};

export type DataContextType = {
	data: NecessaryData;
	refetchData: () => Promise<void>;
};

const DataContext = createContext<DataContextType>(undefined);

export default DataContext;
