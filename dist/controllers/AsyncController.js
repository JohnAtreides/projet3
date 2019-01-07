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
class AsyncController {
    constructor(model) {
        this.model = model;
    }
    router() {
        const router = express_1.Router();
        router.get('/', this.getMenu.bind(this));
        // router.get('/team/:teamId', this.getTeam.bind(this));
        return router;
    }
    getMenu(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const starters = yield this.model.dishes('starters');
                console.log(starters);
                const dishes = yield this.model.dishes('dishes');
                console.log(dishes);
                const deserts = yield this.model.dishes('deserts');
                console.log(deserts);
                response.render('menu', { starters: starters, dishes: dishes, deserts: deserts });
            }
            catch (exception) {
                next(exception);
            }
        });
    }
}
exports.AsyncController = AsyncController;
