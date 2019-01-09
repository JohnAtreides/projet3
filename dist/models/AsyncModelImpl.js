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
const comData_1 = require("./comData");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class AsyncModelImpl {
    constructor(db) {
        this.db = db;
    }
    dishes(type) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.collection('menu').find({ type: type }).toArray();
        });
    }
    commentaires() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.collection('commentaires').find().toArray();
        });
    }
    dish(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const Dish = yield this.db.collection('dishes').findOne({ _id: new mongodb_1.ObjectId(id) });
            if (Dish == null)
                throw new Error('Dish not found');
            return Dish;
        });
    }
    searchcomment(data) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(data);
            const searchData = class_transformer_1.plainToClass(comData_1.comData, data, { strategy: 'excludeAll' });
            yield this.validate(comData_1.comData);
            const a = yield this.db.collection('commentaires').find({ text: { $regex: searchData } }).toArray();
            console.log(a);
            return a;
        });
    }
    validate(object) {
        return __awaiter(this, void 0, void 0, function* () {
            const errors = yield class_validator_1.validate(object);
            if (errors.length == 0)
                return;
            throw errors;
        });
    }
}
exports.AsyncModelImpl = AsyncModelImpl;
