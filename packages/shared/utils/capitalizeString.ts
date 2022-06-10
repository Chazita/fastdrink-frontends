function capitalizeString(word: string): string {
	return word.replace(/(?:^|\s)\S/g, (res) => {
		return res.toUpperCase();
	});
}

function capitalizeStringUnderscore(word: string): string {
	const wordNoUnderscore = word.replace("_", " ");
	return capitalizeString(wordNoUnderscore);
}

export { capitalizeString, capitalizeStringUnderscore };
