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
const class_validator_1 = require("class-validator");
const DishData_1 = require("./DishData");
const CommentData_1 = require("./CommentData");
const class_transformer_1 = require("class-transformer");
const DeleteDishData_1 = require("./DeleteDishData");
const DeleteCommentData_1 = require("./DeleteCommentData");
class AdminModelImpl {
    /**
    * Construit un modèle asynchrone.
    *
    * @param db Base de donnÃ©es.
    * @param model ModÃ¨le asynchrone.
    */
    constructor(db, model) {
        this.db = db;
        this.model = model;
    }
    /**
    * @see AdminModel#addTeam
    */
    addDish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const dishData = class_transformer_1.plainToClass(DishData_1.DishData, data, { strategy: 'excludeAll' });
            yield this.validate(dishData);
            const result = yield this.db.collection('menu').insertOne({ name: dishData.name, type: dishData.type, desc: dishData.desc, price: dishData.price });
            return result.insertedId;
        });
    }
    addcomment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentData = class_transformer_1.plainToClass(CommentData_1.CommentData, data, { strategy: 'excludeAll' });
            yield this.validate(commentData);
            const result = yield this.db.collection('menu').insertOne({ wid: commentData.wid, text: commentData.text });
            return result.insertedId;
        });
    }
    deleteDish(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteDishData = class_transformer_1.plainToClass(DeleteDishData_1.DeleteDishData, data, { strategy: 'excludeAll' });
            yield this.validate(DeleteDishData_1.DeleteDishData);
            yield this.db.collection('menu').deleteOne({ _id: new mongodb_1.ObjectID(deleteDishData.id) });
        });
    }
    deletecomment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteCommentData = class_transformer_1.plainToClass(DeleteCommentData_1.DeleteCommentData, data, { strategy: 'excludeAll' });
            yield this.validate(DeleteCommentData_1.DeleteCommentData);
            yield this.db.collection('menu').deleteOne({ _id: new mongodb_1.ObjectID(deleteCommentData.id) });
        });
    }
    /**
    *
    * LÃ¨ve une exception si l'objet passÃ© en paramÃ¨tre n'a pas pu Ãªtre validÃ©.
    *
    * @param object Objet Ã valider
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
exports.AdminModelImpl = AdminModelImpl;
