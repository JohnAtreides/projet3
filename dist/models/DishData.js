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
class DishData {
    constructor() {
        this.name = '';
        this.type = '';
        this.desc = '';
        this.price = '';
    }
}
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(5, { message: "dish's name is too short" }),
    class_validator_1.MaxLength(30, { message: "dish's name is too long" })
], DishData.prototype, "name", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString()
], DishData.prototype, "type", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString(),
    class_validator_1.MinLength(10, { message: "dish's description is too short" }),
    class_validator_1.MaxLength(100, { message: "dish's description is too long" })
], DishData.prototype, "desc", void 0);
__decorate([
    class_transformer_1.Expose(),
    class_validator_1.IsString()
], DishData.prototype, "price", void 0);
exports.DishData = DishData;
