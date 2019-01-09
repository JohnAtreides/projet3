import { Router, Request, Response, NextFunction } from 'express';
import { AdminModel } from "../models/admin/AdminModel";
import { AsyncModel } from '../models/AsyncModel';
import * as dateFormat from 'dateformat';
import { AuthController } from './AuthController';
import { request } from 'http';
import { DishData } from '../models/admin/DishData';
import { CommentData } from '../models/admin/CommentData';
import { stringLiteral } from 'babel-types';

export class AdminController {
    private adminModel: AdminModel;
    private model: AsyncModel;

    constructor(adminModel: AdminModel, model: AsyncModel) {
        this.adminModel = adminModel;
        this.model = model;
    }
    router(authController: AuthController): Router {
        const router = Router();
        router.use(authController.redirectUnloggedUser.bind(authController));
        router.post('/dish', this.postDish.bind(this));
        router.post('/comment', this.postcomment.bind(this));
        router.get('/add', this.addDish.bind(this));
        router.get('/del', this.delDish.bind(this));
        router.post('/delDish', this.deleteDish.bind(this));
        router.post('/delComment', this.deleteComment.bind(this));
        return router;
    }

    private async  postDish(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            await this.adminModel.addDish(request.body);
            response.redirect('/');
        }
        catch (errors) {
        }
    }

    private async postcomment(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            await this.adminModel.addcomment(request.body);
            response.redirect('/forum');
        }
        catch (errors) {
        }
    }

    private async addDish(request: Request, response: Response, next: NextFunction): Promise<void> {
        response.render(`add`, { csrf: request.csrfToken() });
    }

    private async delDish(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const starters = await this.model.dishes('starters');
            const dishes = await this.model.dishes('dishes');
            const deserts = await this.model.dishes('deserts');
            response.render(`del`, { csrf: request.csrfToken(), starters: starters, dishes: dishes, deserts: deserts });
        }
        catch (exception) {
            next(exception);
        }
    }
    /*
    private async  add(request: Request, response: Response, next  : NextFunction): Promise<void> {
        
        await redirect(request, response, {}, request.body );
    */


    private async deleteDish(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            await this.adminModel.deleteDish(request.body);
            response.redirect('/');
        } catch (errors) { console.log("error"); }
    }


    private async deleteComment(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            console.log("delete comment");
            await this.adminModel.deletecomment(request.body);
            response.redirect('/forum');
        } catch (errors) { console.log("error"); }
    }

}

