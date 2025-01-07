require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTIONSTRING)
    .then(() =>{
        app.emit('ready');
    })
    .catch(e => console.log(e));

const routes = require('./routes');
const path = require('path');
const {middlewareGlobal, checkCsrfError, csrfMiddleware} = require('./src/middlewares/middleware');
const session = require("express-session");
const MongoStore = require("connect-mongo")
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');

app.use(helmet());
app.use(express.urlencoded( {extended: true} ));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')));

const sessionOptions = session({
    secret: 'projetos',
    store: new MongoStore({ mongoUrl: process.env.CONNECTIONSTRING }),
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7,
        httpOnly: true
    }
});
app.use(sessionOptions);
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');
app.use(csrf());
app.use(middlewareGlobal, checkCsrfError, csrfMiddleware);
app.use(routes);

app.on('ready', ()=>{
    app.listen(3000, () =>{
        console.log("http://localhost:3000");
        console.log("Servidor rodando na porta 3000");
    });
});


