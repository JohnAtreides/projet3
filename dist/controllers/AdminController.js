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
class AdminController {
    constructor(adminModel, model) {
        this.adminModel = adminModel;
        this.model = model;
    }
    router(authController) {
        const router = express_1.Router();
        router.use(authController.redirectUnloggedUser.bind(authController));
        router.post('/dish', this.postDish.bind(this));
        router.post('/comment', this.postcomment.bind(this));
        router.get('/add', this.addDish.bind(this));
        router.get('/del', this.delDish.bind(this));
        router.post('/delDish', this.deleteDish.bind(this));
        router.post('/delComment', this.deleteComment.bind(this));
        return router;
    }
    postDish(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminModel.addDish(request.body);
                response.redirect('/');
            }
            catch (errors) {
                /*
                await this.renderAdminPanel(request, response, request.body, {}, errors);
                */
            }
        });
    }
    postcomment(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminModel.addcomment(request.body);
                response.redirect('/forum');
            }
            catch (errors) {
            }
        });
    }
    addDish(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            response.render(`add`, { csrf: request.csrfToken() });
        });
    }
    delDish(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const starters = yield this.model.dishes('starters');
                const dishes = yield this.model.dishes('dishes');
                const deserts = yield this.model.dishes('deserts');
                response.render(`del`, { csrf: request.csrfToken(), starters: starters, dishes: dishes, deserts: deserts });
            }
            catch (exception) {
                next(exception);
            }
        });
    }
    /*
    private async  add(request: Request, response: Response, next  : NextFunction): Promise<void> {
        
        await redirect(request, response, {}, request.body );
    */
    deleteDish(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.adminModel.deleteDish(request.body);
                response.redirect('/');
            }
            catch (errors) {
                console.log("error");
            }
        });
    }
    deleteComment(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("delete comment");
                yield this.adminModel.deletecomment(request.body);
                response.redirect('/forum');
            }
            catch (errors) {
                console.log("error");
            }
        });
    }
}
exports.AdminController = AdminController;
