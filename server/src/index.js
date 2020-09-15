/**
 * @format
 */
import Express from 'express';
import fs from 'fs';
import path from 'path';
import readline from 'readline'; 

const app = Express();

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/restaurants', (req, res) => {
	res.json(JSON.parse(
		fs.readFileSync(path.join(__dirname, 'restaurants.json'))));
});

const server = app.listen(3000, () => {
	console.info('Restaurant API service listenting @ http://localhost:3000');
});

server.on('close', () => {
	console.info('Shutting down restaurant service ....');
});

if (process.platform === 'win32') {
	const reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	reader.on('SIGINT', () => {
		process.emit('SIGINT');
	});
}

process.on('SIGINT', () => {
	console.warn('Caught interrupt signal');
	server.close(() => {
		process.exit();
	});
});
