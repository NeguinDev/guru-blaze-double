export async function getHistoryBlaze(page = 1) {
	const date = new Date();
	
	const endDate = date.toISOString();
	
	date.setDate(date.getDate() - 1);
	const startDate = date.toISOString();

	const url = `https://blaze.com/api/roulette_games/history?startDate=${startDate}&endDate=${endDate}&page=${page}`;

	const response = await fetch(url);
	const records = (await response.json()).records;

	return parsedHistory(records);
}

function parsedHistory(records) {
	return records
		.reverse()
		.map(({ color }) => color);
}