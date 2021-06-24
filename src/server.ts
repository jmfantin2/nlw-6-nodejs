import express, { Request, Response } from 'express';

const app = express();

app.get('/test', (request, response) => {
	return response.send({ message: 'oi feladaputa' });
});

app.post('/test-post', (request, response) => {
	return response.send('yeye');
});

app.listen(3000, () => console.log('server on 3000'));
