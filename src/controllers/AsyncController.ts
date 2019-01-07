
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

    private async getMenu(request: Request, response: Response, next: NextFunction): Promise<void> {
        try {
            const starters = await this.model.dishes('starters');
            console.log(starters);
            const dishes = await this.model.dishes('dishes');
            console.log(dishes);
            const deserts = await this.model.dishes('deserts');
            console.log(deserts);
            response.render('menu', { starters : starters, dishes: dishes, deserts : deserts });
        } catch (exception) {
            next(exception);
        }
    }
}