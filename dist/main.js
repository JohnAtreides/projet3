"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const session = require("express-session");
const helmet = require("helmet");
const i18n = require("i18n");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const bodyParser = require("body-parser");
const mongodb_1 = require("mongodb");
const AsyncModelImpl_1 = require("./models/AsyncModelImpl");
const AsyncController_1 = require("./controllers/AsyncController");
/*import {  AdminModelImpl } from  "./models/admin/AdminModelImpl";
import {  AdminController } from  "./controllers/AdminController";
import {  AuthModelImpl } from  "./models/auth/AuthModelImpl";
import {  AuthController } from  "./controllers/AuthController";*/
i18n.configure({
    locales: ['fr', 'en'],
    directory: './locales'
});
function handleError404(request, response, next) {
    response.status(404).render('error404');
}
function handleError500(error, request, response, next) {
    response.status(500).render('error500');
}
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const mongoClient = yield mongodb_1.MongoClient.connect('mongodb://localhost', { useNewUrlParser: true });
        const db = mongoClient.db('restaurant');
        const model = new AsyncModelImpl_1.AsyncModelImpl(db);
        const controller = new AsyncController_1.AsyncController(model);
        // const adminModel = new AdminModelImpl(db, model);
        //const adminController = new AdminController(adminModel, model);
        //const authModel =  new AuthModelImpl(db);
        //const authController =  new AuthController(authModel, '/auth', '/admin');
        const myExpress = express();
        myExpress.set('view engine', 'pug');
        myExpress.use(i18n.init);
        //Jetons pour lutter contre le CSRF
        myExpress.use(bodyParser.urlencoded({ extended: true }));
        myExpress.use(cookieParser());
        myExpress.use(csrf({ cookie: { key: 'zejfzejfzejfopjef',
                secure: false,
                httpOnly: true,
                sameSite: true,
                maxAge: 3600000 } }));
        myExpress.use(helmet());
        myExpress.use(helmet.contentSecurityPolicy({
            directives: { defaultSrc: ["'self'"], styleSrc: ["'self'"] }
        }));
        myExpress.use(session({
            secret: 'zefzefjojv',
            resave: false,
            saveUninitialized: true,
            cookie: {
                httpOnly: true,
                sameSite: true,
                secure: process.env.NODE_ENV == 'production'
            }
        }));
        myExpress.use(bodyParser.urlencoded({ extended: true }));
        //myExpress.use(authController.getUser.bind(authController));
        myExpress.use(express.static('static'));
        myExpress.use('/', controller.router());
        // myExpress.use('/admin', adminController.router(authController));
        // myExpress.use('/admin', adminController.router());
        myExpress.use(controller.router());
        //myExpress.use('/auth', authController.router());
        //myExpress.use('/admin', adminController.router());
        //Error 404
        myExpress.use(handleError404);
        //Error 500
        myExpress.use(handleError500);
        myExpress.listen(4200, function () { console.log('Go to http://localhost:4200'); });
    });
}
start();
