import {  Router,  Request,  Response,  NextFunction } from  'express';
import {  AdminModel }  from "../models/admin/AdminModel";
import {  AsyncModel }  from '../models/AsyncModel';
import  * as dateFormat from  'dateformat';
import {  AuthController } from  './AuthController';
import {  request }  from 'http';
import {  DishData }  from '../models/admin/DishData';
import { CommentData } from '../models/admin/CommentData';
import { stringLiteral } from 'babel-types';

export  class AdminController {
private adminModel :  AdminModel;
private model  : AsyncModel;

constructor(adminModel :  AdminModel,  model: AsyncModel) {
this.adminModel =  adminModel;
this.model =  model;
}
router(authController :  AuthController) :  Router {
const router  = Router();
router.use(authController.redirectUnloggedUser.bind(authController));
router.post('/dish', this.postDish.bind(this));
router.post('/comment', this.postcomment.bind(this));
//router.get('/add', this.add.bind(this));
return router;
}

private async  postDish(request: Request, response: Response, next: NextFunction): Promise<void> {
try {
await this.adminModel.addDish(request.body);
response.redirect('/');
}
catch (errors) {
/*
await this.renderAdminPanel(request, response, request.body, {}, errors); 
*/
}
} 

private async  postcomment(request: Request, response: Response, next  : NextFunction): Promise<void> {
try {
await this.adminModel.addcomment(request.body);
response.redirect('/');
} catch (errors) {
/*
await this.renderAdminPanel(request, response, {}, request.body, errors);
*/
}
}


/*
private async  add(request: Request, response: Response, next  : NextFunction): Promise<void> {
    
    await redirect(request, response, {}, request.body );
*/


/*
private async  deleteMatch(request: Request, response: Response, next  : NextFunction): Promise<void> {
try {
await this.adminModel.deleteMatch(request.body);
response.redirect(request.baseUrl);
} catch (errors) {
await this.renderAdminPanel(request, response, {}, request.body, errors);
}
} 
*/
}

