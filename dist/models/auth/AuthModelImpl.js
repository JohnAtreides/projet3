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
const mongodb_1 = require("mongodb");
const bcrypt = require("bcrypt");
const class_validator_1 = require("class-validator");
const LogInData_1 = require("./LogInData");
const class_transformer_1 = require("class-transformer");
class AuthModelImpl {
    /**
     * Construit un modèle asynchrone.
     *
     * @param db Base de données.
     */
    constructor(db) {
        this.db = db;
    }
    /**
     * @see AuthModel#signUp
     */
    signUp(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const logInData = class_transformer_1.plainToClass(LogInData_1.LogInData, data, { strategy: 'excludeAll' });
            yield this.validate(logInData);
            const user = yield this.db.collection('users').findOne({ username: logInData.username });
            if (user != null) {
                throw new Error('Username already exists');
            }
            const hash = yield bcrypt.hash(logInData.password, 10);
            const result = yield this.db.collection('users').insertOne({
                username: logInData.username,
                password: hash
            });
            return result.insertedId;
            /**
             * TODO :
             *  - vérifier que ce nom d'utilisateur n'est pas déjà pris (sinon throw new Error("Username already exists")).
             *  - ajouter l'utilisateur à la base de données en hachant son mot de passe.
             *  - retourner l'identifiant du nouvel utilisateur créé.
             */
        });
    }
    /**
     * @see AuthModel#getUserId
     */
    getUserId(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const logInData = class_transformer_1.plainToClass(LogInData_1.LogInData, data, { strategy: 'excludeAll' });
            yield this.validate(logInData);
            const user = yield this.db.collection('users').findOne({ username: logInData.username });
            if (user == null) {
                throw new Error('Username or password is not correct');
            }
            if (!(yield bcrypt.compare(logInData.password, user.password))) {
                throw new Error('Username or password is not correct');
            }
            return user._id;
        });
    }
    /**
     * TODO :
     *  - récupérer l'utilisateur à partir du nom d'utilisateur présent dans data.
     *  - si l'utilisateur n'existe pas ou si le mot de passe n'est pas valide,
     *       jeter une exception new Error("Username or password are not correct")
     *  - retourner l'identifiant de l'utilisateur trouvé.
     */
    /**
     * @see AuthModel#getUserFromId
     */
    getUserFromId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.db.collection('users').findOne({ _id: new mongodb_1.ObjectID(id) });
            if (user == null) {
                throw new Error('User not found');
            }
            delete user.password;
            return user;
            /**
             * - récupérer l'utilisateur à partir de l'identifiant avec findOne
             * - si aucun utilisateur n'a été trouvé : throw new("User not found")
             * - supprimer le mot de passe 'haché' présent dans l'objet représentant l'utilisateur
             * - retourner l'utilisateur
             */
            throw new Error('Not implemented');
        });
    }
    /**
     *
     * Lève une exception si l'objet passé en paramètre n'a pas pu être validé.
     *
     * @param object Objet à valider
     */
    validate(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(object);
            if (errors.length == 0)
                return;
            throw errors;
        });
    }
}
exports.AuthModelImpl = AuthModelImpl;
