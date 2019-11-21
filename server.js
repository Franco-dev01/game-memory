const express = require('express');
const logger = require('morgan');
const session = require('express-session')({
    secret: "Dieuestvivant",
    resave: true,
    saveUninitialized: true
});
const sharedSession = require('express-socket.io-session');
const routes = require('./routes/user');
const path = require('path');

const serveur = class {
    constructor() {
        this.app = express();
        this.settings();
        this.routes();
        this.middleware();
        this.sharedSession = sharedSession;
    }
    getApp(){
        return this.app;
    }
    settings(){
        this.app.set('views','./views');
        this.app.set('view engine','ejs');
        this.app.use(express.static('./public'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({extend:true}));
        this.app.use(session);
    }

    routes(){
        this.app.use(routes);
    }

    middleware(){
        this.app.use(logger('dev'));
    }

    getSharedSession(){
        return this.sharedSession(session);
    }
};

module.exports = serveur;