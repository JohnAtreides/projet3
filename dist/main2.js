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
const mongodb_1 = require("mongodb");
const AsyncModelImpl_1 = require("./models/AsyncModelImpl");
const AsyncController_1 = require("./controllers/AsyncController");
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
        const model = new AsyncModelImpl_1.AsyncModelImpl(db);
        const controller = new AsyncController_1.AsyncController(model);
        const myExpress = express();
        myExpress.set('view engine', 'pug');
        myExpress.use(i18n.init);
        myExpress.use(express.static('static'));
        myExpress.use('/', controller.router());
        myExpress.use(handleError404);
        myExpress.use(handleError500);
        myExpress.listen(4200, function () { console.log('Go to http://localhost:4200'); });
    });
}
start();
