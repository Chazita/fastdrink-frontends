export const capitalizeString = (word: string): string => {
	return word.replace(/(?:^|\s)\S/g, (res) => {
		return res.toUpperCase();
	});
};

export const capitalizeStringUnderscore = (word: string): string => {
	const wordNoUnderscore = word.replace("_", " ");
	return capitalizeString(wordNoUnderscore);
};
