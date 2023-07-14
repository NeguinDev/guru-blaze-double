export function analyzeSequence(sequence) {
	const repeatedSequences = {};

	for (let i = 0; i <= sequence.length - 5; i++) {
		const currentSequence = sequence.slice(i, i + 5);
		const currentSequenceString = currentSequence.join(',');

		if (repeatedSequences[currentSequenceString]) {
			repeatedSequences[currentSequenceString]++;
		} else {
			repeatedSequences[currentSequenceString] = 1;
		}
	}

	const sortedSequences = Object.entries(repeatedSequences)
		.filter(([_, repetitions]) => repetitions >= 5)
		.sort((a, b) => b[1] - a[1])
		.map(([sequence, times]) => {
			return {
				sequence: sequence.split(','),
				times: times,
			};
		});

	return sortedSequences;
}