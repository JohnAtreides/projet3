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
 * Classe permettant de communiquer les informations
 * nécessaire à l'inscription et la connexion d'un
 * administrateur.
 */
class LogInData {
    constructor() {
        this.username = "";
        this.password = "";
    }
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3, { message: 'Username is too short' }),
    class_validator_1.MaxLength(20, { message: 'Username is too long' }),
    class_validator_1.IsAlphanumeric()
], LogInData.prototype, "username", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(3, { message: 'Password is too short' }),
    class_validator_1.MaxLength(20, { message: 'Password is too long' }),
    class_validator_1.Matches(/^\S*$/)
], LogInData.prototype, "password", void 0);
exports.LogInData = LogInData;
