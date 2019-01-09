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
const express_1 = require("express");
// import * as dateFormat from "dateformat";
class AsyncController {
    constructor(model) {
        this.model = model;
    }
    router() {
        const router = express_1.Router();
        router.get('/', this.getMenu.bind(this));
        router.get('/forum', this.getforum.bind(this));
        router.get('/contact', this.getcontact.bind(this));
        router.get('/entrees', this.getentrees.bind(this));
        router.get('/plats', this.getplats.bind(this));
        router.get('/desserts', this.getdesserts.bind(this));
        return router;
    }
    getMenu(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const starters = yield this.model.dishes('starters');
                const dishes = yield this.model.dishes('dishes');
                const deserts = yield this.model.dishes('deserts');
                const jeton = "menu";
                response.render('menu', { starters: starters, dishes: dishes, deserts: deserts, jeton: jeton });
            }
            catch (exception) {
                next(exception);
            }
        });
    }
    getforum(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const commentaires = yield this.model.commentaires();
                console.log(commentaires);
                response.render('forum', { csrf: request.csrfToken(), commentaires: commentaires });
            }
            catch (exception) {
                next(exception);
            }
        });
    }
    getcontact(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            response.render('contact');
        });
    }
    getentrees(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const starters = yield this.model.dishes('starters');
                response.render('entrees', { starters: starters });
            }
            catch (exception) {
                next(exception);
            }
        });
    }
    getplats(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const dishes = yield this.model.dishes('dishes');
                response.render('plats', { dishes: dishes });
            }
            catch (exception) {
                next(exception);
            }
        });
    }
    getdesserts(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deserts = yield this.model.dishes('deserts');
                response.render('desserts', { deserts: deserts });
            }
            catch (exception) {
                next(exception);
            }
        });
    }
}
exports.AsyncController = AsyncController;
