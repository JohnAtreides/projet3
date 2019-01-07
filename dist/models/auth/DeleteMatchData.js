"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
/**
 * Classe décrivant la structure des données nécessaires
 * à la del d'un match.
 */
class DeleteMatchData {
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsISO8601()
], DeleteMatchData.prototype, "date", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsMongoId()
], DeleteMatchData.prototype, "team0", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsMongoId()
], DeleteMatchData.prototype, "team1", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumberString()
], DeleteMatchData.prototype, "score0", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsNumberString()
], DeleteMatchData.prototype, "score1", void 0);
exports.DeleteMatchData = DeleteMatchData;
