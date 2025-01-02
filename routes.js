const express = require("express");
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const agendamentoController = require('./src/controllers/agendamentoController');


// Routes Home
route.get('/', homeController.paginaInicial);
route.post('/', homeController.trataPost);

 
route.get('/agendamento', agendamentoController.paginaInicial);


module.exports = route;