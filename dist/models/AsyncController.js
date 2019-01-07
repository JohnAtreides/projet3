"use strict";
/**
import { AsyncModel } from "../models/AsyncModel";
import { Request, Response, NextFunction, Router } from 'express';
import * as dateFormat from "dateformat";

export class AsyncController {
private model: AsyncModel;

constructor(model: AsyncModel) {
this.model = model;
}

router(): Router {
const router = Router();
router.get('/', this.getMenu.bind(this));
// router.get('/team/:teamId', this.getTeam.bind(this));
return router;
}

private async getMenu(request: Request, response: Response, next : NextFunction): Promise<void> {
try{
const dishes = await this.model.Dishes();
response.render('dishes', { dishes: dishes });
}catch (exception) {
next(exception);
}**/
