import express from 'express';
import { MovieController } from './main/controllers/movie.controller';

const app = express();
const routes = [
    new MovieController().router
]

app.use(express.json());
app.use(routes);

app.listen(8000, () => {
    console.log('Server running on port 8000');
})