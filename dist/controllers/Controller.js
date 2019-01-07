"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class Controller {
    constructor(model) {
        this.model = model;
    }
    router() {
        const router = express_1.Router();
        router.get('/', this.getRanking.bind(this));
        return router;
    }
    getRanking(request, response, next) {
        const ranking = new RankingImpl(this.model);
        const table = ranking.table;
        let html = "TODO";
        response.send(html);
    }
}
exports.Controller = Controller;
