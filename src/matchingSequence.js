export function findMatchingSequence(colors, sequences) {
	for (const { sequence } of sequences) {
		const currentSequence = sequence.slice(0, 4);

		if (currentSequence.join(',') === colors.join(',')) {
			return sequence[4];
		}
	}

	return false;
}