import { getHistoryBlaze } from './blazeApi.js';
import { analyzeSequence } from './analyzeSequence.js';
import { saveSequences } from './db.js';
import { findMatchingSequence } from './matchingSequence.js';
import emitter from './websocket.js';
import c from 'chalk';

const rounds = {};

emitter.on('newRoll', async (data) => {
	const history = await getHistoryBlaze();
	const last = history.slice(-4);

	const sequencesResults = analyzeSequence(history);
	const allSequences = saveSequences(sequencesResults);

	const match = findMatchingSequence(last, allSequences);

	if (match) {
		console.log(`ULTIMAS 4 JOGADAS: ${c.cyan(last.join(' '))}`);
		console.log(`POSSIVEL PROXIMA JOGADA: ${c.green(match)}`);

		rounds[data.id] = match;
	}
});

emitter.on('rollComplete', (data) => {
	const match = rounds[data.id];

	if (match === data.color) {
		console.log(`${c.green('DEU BOM:')} ${c.cyan(data.color)}\n`);
	} else if (match) {
		console.log(`${c.red('DEU RUIM:')} ${c.cyan(data.color)}\n`);
	}

	delete rounds[data.id];
});
