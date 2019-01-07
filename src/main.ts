import  * as express from  "express";
import  * as session from  "express-session";
import  * as helmet  from "helmet";
import  * as i18n  from "i18n";
import  * as cookieParser from  "cookie-parser";
import  * as csrf  from "csurf";
import  * as bodyParser from  "body-parser";
import {  MongoClient }  from "mongodb";
import {  AsyncModelImpl } from  "./models/AsyncModelImpl";
import {  AsyncController } from  "./controllers/AsyncController";
import {  Request,  Response,  NextFunction } from  "express";
import {  AdminModelImpl } from  "./models/admin/AdminModelImpl";
import {  AdminController } from  "./controllers/AdminController";
import {  AuthModelImpl } from  "./models/auth/AuthModelImpl";
import {  AuthController } from  "./controllers/AuthController";


i18n.configure({
locales: ['fr', 'en'],
directory: './locales'
});

/*
function  handleError404(request: Request, response: Response, next: NextFunction): void {
response.status(404).render('error404');
}

function  handleError500(error: any,  request: Request, response: Response, next: NextFunction): void {
response.status(500).render('error500');
}
*/

async  function  start() {
const mongoClient =  await MongoClient.connect('mongodb://localhost',  { useNewUrlParser: true });
const db  = mongoClient.db('restaurant');

const model  = new AsyncModelImpl(db);
const controller =  new AsyncController(model);

const adminModel = new AdminModelImpl(db, model);
const adminController = new AdminController(adminModel, model);

const authModel =  new AuthModelImpl(db);
const authController =  new AuthController(authModel, '/auth', '/admin');

const myExpress =  express();
myExpress.set('view engine', 'pug');

myExpress.use(i18n.init);


//Jetons pour lutter contre le CSRF
myExpress.use(bodyParser.urlencoded({ extended: true}));
myExpress.use(cookieParser());
myExpress.use(csrf({ cookie: { key:  'zejfzejfzejfopjef',
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
httpOnly : true,
sameSite : true,
secure: process.env.NODE_ENV ==  'production'  
}}))



myExpress.use(bodyParser.urlencoded({ extended: true }));
myExpress.use(authController.getUser.bind(authController));

myExpress.use(express.static('static'));
myExpress.use('/', controller.router());
myExpress.use('/admin', adminController.router(authController));
// myExpress.use('/admin', adminController.router());

myExpress.use(controller.router());
myExpress.use('/auth', authController.router());
//myExpress.use('/admin', adminController.router());

//Error 404
//myExpress.use(handleError404);

//Error 500
//myExpress.use(handleError500);


myExpress.listen(4200, function () { console.log('Go to http://localhost:4200')  });
}

start();

