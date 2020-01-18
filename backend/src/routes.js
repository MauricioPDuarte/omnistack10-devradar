// Métodos HTTP: GET, POST, PUT, DELETE

// Tipos de parâmetros: 
// Query Params: request.query (Filtros, ordenação, paginação, ...)
// Route Params: request.params (Identificar um recurso na alteracao ou na remocao)
// Body: request.body (Dados para criacao ou alteracao de um registro)

//MongoDB (Não-relacional) 

const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

const routes = Router();

routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);
routes.delete('/devs/:_id', DevController.destroy);
routes.put('/devs/:_id', DevController.update);

routes.get('/search', SearchController.index);

module.exports = routes;