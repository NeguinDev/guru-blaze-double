import fs from 'fs';

export function getAllSequences() {
	const sequences = JSON.parse(fs.readFileSync('./assets/sequences.json', 'utf8'));
	return sequences;
}

export function saveSequences(newSequences) {
	const oldSequences = JSON.parse(fs.readFileSync('./assets/sequences.json', 'utf8'));
	const sequences = [...oldSequences, ...newSequences];

	const uniqueSequences = removeDuplicates(sequences);

	fs.writeFileSync('./assets/sequences.json', JSON.stringify(uniqueSequences));

	return uniqueSequences;
}

function removeDuplicates(sequences) {
	return sequences.filter((sequence, index, self) => {
		const firstIndex = self.findIndex((s) => s.sequence.join(',') === sequence.sequence.join(','));
		return firstIndex === index;
	});
}
