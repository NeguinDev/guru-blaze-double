// websocket, link: wss://api-v2.blaze.com/replication/?EIO=3&transport=websocket

import { EventEmitter } from 'events';
import { WebSocket } from 'ws';

const emitter = new EventEmitter();
const ws = new WebSocket('wss://api-v2.blaze.com/replication/?EIO=3&transport=websocket');

const rounds = [];

ws.on('open', () => {
	ws.send('420["cmd",{"id":"subscribe","payload":{"room":"double_v2"}}]');
});

ws.on('message', (data) => {
	data = data.toString();
	
	try {
		data = data.replace(/^\d+/, '');
		if (!data) return;
		
		data = JSON.parse(data)[1];
		if (!data) return;
		
		const { id, payload } = data;
		if (id !== 'double.tick') return;

		const { id: idRound, status, color, roll } = payload;
		const colors = ['white', 'red', 'black'];

		const dataParsed = {
			id: idRound,
			status,
			color: colors[color] || color,
			roll,
		};

		if (status === 'waiting' && !rounds.includes(idRound)) {
			emitter.emit('newRoll', dataParsed);
			rounds.push(idRound);
		}

		if (status === 'complete' && rounds.includes(idRound)) {
			rounds.splice(rounds.indexOf(idRound), 1);
			emitter.emit('rollComplete', dataParsed);

			ws.send('2');
		}
	} catch (error) {
		console.log({
			error,
			data,
		});
	}
});

export default emitter;