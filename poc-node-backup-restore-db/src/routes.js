const { Router } = require('express');
const packageJson = require('../package.json');
const CategoryController = require('./controllers/category.controller');
const databaseController = require('./Controllers/database.controller');
const UserController = require('./controllers/user.controller');

const routes = Router();

routes.get('/', (req, res) => {
	return res.status(200).json({ name: "poc-node-back-restore-db", version: packageJson.version , status: "connected"});
});

routes.get('/categories', CategoryController.index);
routes.get('/categories/:id', CategoryController.get);
routes.post('/categories', CategoryController.save);
routes.put('/categories', CategoryController.edit);
routes.delete('/categories/:id', CategoryController.delete);

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.get);
routes.post('/users', UserController.save);
routes.put('/users', UserController.edit);
routes.delete('/users/:id', UserController.delete);

routes.get('/database/backup', databaseController.backup);

module.exports = routes;
