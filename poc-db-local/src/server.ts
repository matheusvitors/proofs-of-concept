import express, { Router } from 'express';
import 'dotenv/config';
import { router } from './controller';

const server = express();

const port = process.env.PORT || 8000;

server.use(express.json());
server.use(express.urlencoded({extended: false}));

server.use(Router().get('/', (req, res) => {
	return res.json({ message: 'Server funcionando' });
}))
server.use(router);

server.listen(port, () => {
	console.log('Server running on port', port);
})
