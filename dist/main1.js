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
const i18n = require("i18n");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const csrf = require("csurf");
const mongodb_1 = require("mongodb");
const session = require("express-session");
const connectMongodbSession = require("connect-mongodb-session");
i18n.configure({
    locales: ['fr'],
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
        const db = mongoClient.db('soccer');
        /*const model = new AsyncModelImpl(db);
        const controller = new AsyncController(model);
    
        const adminModel = new AdminModelImpl(db, model);
        const adminController = new AdminController(adminModel, model);
        const authModel = new AuthModelImpl(db);
        const authController = new AuthController(authModel, '/auth', '/admin');*/
        const myExpress = express();
        myExpress.set('view engine', 'pug');
        myExpress.use(i18n.init);
        myExpress.use(helmet());
        myExpress.use(helmet.contentSecurityPolicy({
            directives: { defaultSrc: ["'self'"], styleSrc: ["'self'"] }
        }));
        const MongoDBStore = connectMongodbSession(session);
        const sessionStore = new MongoDBStore({
            uri: 'mongodb://localhost',
            databaseName: 'soccer',
            collection: 'sessions'
        });
        myExpress.use(session({
            secret: 'zefzefjojv',
            resave: true,
            saveUninitialized: true,
            store: sessionStore,
            cookie: { secure: process.env.NODE_ENV == 'production' }
        }));
        myExpress.use(bodyParser.urlencoded({ extended: true }));
        myExpress.use(cookieParser());
        myExpress.use(csrf({ cookie: { key: 'zejfzejfzejfopjef',
                secure: false,
                httpOnly: true,
                sameSite: true,
                maxAge: 3600000 } }));
        myExpress.use(express.static('static'));
        // myExpress.use(authController.getUser.bind(authController));
        /* myExpress.use('/', controller.router());
         myExpress.use('/auth', authController.router());
         myExpress.use('/admin', adminController.router(authController));    myExpress.use(handleError404);*/
        myExpress.use(handleError500);
        myExpress.listen(4200, function () { console.log('Go to http://localhost:4200'); });
    });
}
start();
