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
function dropDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('[Open]');
        const mongoClient = yield mongodb_1.MongoClient.connect('mongodb://localhost', { useNewUrlParser: true });
        const db = mongoClient.db('soccer');
        console.log('[Drop database]');
        yield db.dropDatabase();
        console.log('[Close]');
        yield mongoClient.close();
    });
}
dropDB();
