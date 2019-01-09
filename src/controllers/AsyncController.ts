
import { AsyncModel } from "../models/AsyncModel";
import { Request, Response, NextFunction, Router } from 'express';
// import * as dateFormat from "dateformat";

export class AsyncController {
    private model: AsyncModel;

    constructor(model: AsyncModel) {
        this.model = model;
    }

    router(): Router {
        const router = Router();
        router.get('/', this.getMenu.bind(this));
        router.get('/forum', this.getforum.bind(this));
        router.get('/contact',this.getcontact.bind(this));
        router.get('/entrees',this.getentrees.bind(this));
        router.get('/plats',this.getplats.bind(this));
        router.get('/desserts',this.getdesserts.bind(this));
        router.post('/search', this.postsearch.bind(this));
        return router;
    }

    private async getMenu(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const starters = await this.model.dishes('starters');
            const dishes = await this.model.dishes('dishes');
            const deserts = await this.model.dishes('deserts');
            const jeton = "menu";
            response.render('menu', { starters : starters, dishes: dishes, deserts : deserts, jeton : jeton });
        } catch (exception) {
            next(exception);
        }
    }
    private async getforum(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const commentaires = await this.model.commentaires();
            response.render('forum', { csrf : request.csrfToken(), commentaires : commentaires });
        } catch (exception) {
            next(exception);
        }
    }

    private async getcontact(request: Request, response: Response, next: NextFunction): Promise<void> {
        response.render('contact');
    }

    private async getentrees(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const starters = await this.model.dishes('starters');
            response.render('entrees', { starters : starters });
        } catch (exception) {
            next(exception);
        }
    }

    private async getplats(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const dishes = await this.model.dishes('dishes');
            response.render('plats', { dishes: dishes });
        } catch (exception) {
            next(exception);
        }
    }

    private async getdesserts(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const deserts = await this.model.dishes('deserts');
            response.render('desserts', { deserts : deserts });
        } catch (exception) {
            next(exception);
        }
    }

    private async postsearch(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const commentaires = await this.model.searchcomment(request.body.text);
            response.render('forum', { csrf : request.csrfToken(), commentaires : commentaires });
        } catch (exception) {
            next(exception);
        }
    }

}