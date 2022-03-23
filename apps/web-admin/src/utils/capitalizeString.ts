export const capitalizeString = (word: string): string => {
	return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
};

export const capitalizeStringUnderscore = (word: string): string => {
	const wordNoUnderscore = word.replace("_", " ");
	return capitalizeString(wordNoUnderscore);
};
