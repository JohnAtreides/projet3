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
* à l'ajout d'un nouveau match.
*/
class CommentData {
    constructor() {
        this.text = '';
        this.wid = '';
    }
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(1, { message: "Sérieux ? rien d'autre à dire ??" }),
    class_validator_1.MaxLength(200, { message: "comment is too long" })
], CommentData.prototype, "text", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString()
], CommentData.prototype, "wid", void 0);
exports.CommentData = CommentData;
