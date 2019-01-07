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
class AuthController {
    constructor(authModel, authUrl, logInRedirection) {
        this.authModel = authModel;
        this.authUrl = authUrl;
        this.logInRedirection = logInRedirection;
    }
    router() {
        const router = express_1.Router();
        router.get('/signUp', this.getSignUp.bind(this));
        router.post('/signUp', this.postSignUp.bind(this));
        router.get('/logIn', this.getLogIn.bind(this));
        router.post('/logIn', this.postLogIn.bind(this));
        router.use(this.redirectUnloggedUser.bind(this));
        router.get('/logOut', this.getLogOut.bind(this));
        return router;
    }
    getUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = (request.session && request.session.userId)
                    ? yield this.authModel.getUserFromId(request.session.userId)
                    : null;
                response.locals.loggedUser = user;
                next();
            }
            catch (error) {
                next(error);
            }
        });
    }
    redirectUnloggedUser(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (response.locals.loggedUser == null) {
                response.redirect(this.authUrl + '/logIn');
                return;
            }
            next();
        });
    }
    getSignUp(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            response.render('signUp', { logInData: {} });
        });
    }
    postSignUp(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.session)
                throw new Error('Cookies must be enabled');
            try {
                /**
                 * TODO :
                 * - Inscrire l'utilisateur
                 * - Faire en sorte que l'utilisateur soit connecté en modifiant request.session.userId
                 * - rediriger l'utilisateur vers this.logInRedirection
                 */
                throw new Error('Not implemented');
            }
            catch (errors) {
                response.render('signUp', { logInData: request.body, errors: errors });
            }
        });
    }
    getLogIn(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            response.render('logIn', { logInData: {} });
        });
    }
    postLogIn(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.session)
                throw new Error('Cookies must be enabled');
            try {
                /**
                 * TODO :
                 * - Récupérer l'identifiant de l'utilisateur (avec le modèle donc en vérifiant son mot de passe)
                 * - Faire en sorte que l'utilisateur soit connecté en modifiant request.session.userId
                 * - rediriger l'utilisateur vers this.logInRedirection
                 */
                throw new Error('Not implemented');
            }
            catch (errors) {
                response.render('logIn', { logInData: request.body, errors: errors });
            }
        });
    }
    getLogOut(request, response, next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!request.session)
                throw new Error('Cookies must be enabled');
            request.session.destroy(() => {
                response.redirect('/');
            });
        });
    }
}
exports.AuthController = AuthController;
