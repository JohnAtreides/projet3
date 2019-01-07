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
const dateFormat = require("dateformat");
class AdminController {
    constructor(adminModel, model) {
        this.adminModel = adminModel;
        this.model = model;
    }
    router(authController) {
        const router = express_1.Router();
        router.use(authController.redirectUnloggedUser.bind(authController));
        router.get('/', this.getAdminPanel.bind(this));
        router.post('/dish', this.postDish.bind(this));
        router.post('/matches', this.postcomment.bind(this));
        return router;
    }
    getAdminPanel(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.renderAdminPanel(request, response, {}, {}, undefined);
        });
    }
    postDish(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminModel.addDish(request.body);
                response.redirect(request.baseUrl);
            }
            catch (errors) {
                yield this.renderAdminPanel(request, response, request.body, {}, errors);
            }
        });
    }
    postcomment(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminModel.addcomment(request.body);
                response.redirect(request.baseUrl);
            }
            catch (errors) {
                yield this.renderAdminPanel(request, response, {}, request.body, errors);
            }
        });
    }
    deleteMatch(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminModel.deleteMatch(request.body);
                response.redirect(request.baseUrl);
            }
            catch (errors) {
                yield this.renderAdminPanel(request, response, {}, request.body, errors);
            }
        });
    }
    renderAdminPanel(request, response, DishData, CommentData, errors) {
        return __awaiter(this, void 0, void 0, function* () {
            const dishes = yield this.model.dishes();
            const Comments = yield this.model.commentaires();
            response.render('adminPanel', {
                csrd: request.csrfToken(),
                dish: dishes,
                Comment: Comments,
                dateFormat: dateFormat,
                dishdata: DishData,
                commentdata: CommentData,
                errors: errors
            });
        });
    }
}
exports.AdminController = AdminController;
