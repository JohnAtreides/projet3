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
const Generator_1 = require("./models/Generator");
function addTeams(db) {
    return __awaiter(this, void 0, void 0, function* () {
        var bulk = db.collection('teams').initializeUnorderedBulkOp();
        for (const team of Generator_1.generatedTeams) {
            bulk.insert({ name: team.name });
        }
        yield bulk.execute();
    });
}
function addMatches(db) {
    return __awaiter(this, void 0, void 0, function* () {
        var bulk = db.collection('matches').initializeUnorderedBulkOp();
        for (const match of Generator_1.generatedMatches) {
            const team1 = yield db.collection('teams').findOne({ name: match.teams[0].name });
            const team2 = yield db.collection('teams').findOne({ name: match.teams[1].name });
            if (team1 == null || team2 == null)
                throw new Error();
            bulk.insert({
                date: match.date,
                scores: match.scores,
                teams: [team1._id, team2._id]
            });
        }
        yield bulk.execute();
    });
}
function fillDB() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('[Open]');
        const mongoClient = yield mongodb_1.MongoClient.connect('mongodb://localhost', { useNewUrlParser: true });
        const db = mongoClient.db('soccer');
        console.log('[Drop database]');
        yield db.dropDatabase();
        console.log('[Add teams]');
        yield addTeams(db);
        console.log('[Add matches]');
        yield addMatches(db);
        console.log('[Close]');
        yield mongoClient.close();
    });
}
fillDB();
