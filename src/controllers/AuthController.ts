import { Router, Request, Response, NextFunction } from 'express';
import { User } from '../models/auth/User';
import { AuthModel } from '../models/auth/AuthModel';

export class AuthController {
    private authModel : AuthModel;
    private logInRedirection : string;
    private authUrl: string;

    constructor(authModel : AuthModel, authUrl : string, logInRedirection : string) {
        this.authModel = authModel;
        this.authUrl = authUrl;
        this.logInRedirection = logInRedirection;
    }

    router() : Router {
        const router = Router();
        router.get('/signUp', this.getSignUp.bind(this));
        router.post('/signUp', this.postSignUp.bind(this));
        router.get('/logIn', this.getLogIn.bind(this));
        router.post('/logIn', this.postLogIn.bind(this));
        router.use(this.redirectUnloggedUser.bind(this));
        router.get('/logOut', this.getLogOut.bind(this));
        return router;
    }

    public async getUser(request: Request, response: Response, next : NextFunction): Promise<void> {
      try {
          const user : User | null = (request.session && request.session.userId)
              ?  await this.authModel.getUserFromId(request.session.userId)
              : null;
          response.locals.loggedUser = user;
          next();
      } catch (error) {
          next(error);
      }
    }

    public async redirectUnloggedUser(request: Request, response: Response, next : NextFunction): Promise<void> {
      if (response.locals.loggedUser == null) {
          response.redirect(this.authUrl+'/logIn');
          return;
      }
      next();
    }

    private async getSignUp(request: Request, response: Response, next : NextFunction): Promise<void> {
        response.render('signUp', { logInData : {} });
    }

    private async postSignUp(request: Request, response: Response, next : NextFunction): Promise<void> {
        if (!request.session) throw new Error('Cookies must be enabled');
        try {
            /**
             * TODO :
             * - Inscrire l'utilisateur
             * - Faire en sorte que l'utilisateur soit connecté en modifiant request.session.userId
             * - rediriger l'utilisateur vers this.logInRedirection
             */
            throw new Error('Not implemented');
        } catch (errors) {
            response.render('signUp', { logInData : request.body, errors : errors });
        }
    }

    private async getLogIn(request: Request, response: Response, next : NextFunction): Promise<void> {
        response.render('logIn', { logInData : {} });
    }

    private async postLogIn(request: Request, response: Response, next : NextFunction): Promise<void> {
        if (!request.session) throw new Error('Cookies must be enabled');
        try {
            /**
             * TODO :
             * - Récupérer l'identifiant de l'utilisateur (avec le modèle donc en vérifiant son mot de passe)
             * - Faire en sorte que l'utilisateur soit connecté en modifiant request.session.userId
             * - rediriger l'utilisateur vers this.logInRedirection
             */
            throw new Error('Not implemented');
        } catch (errors) {
            response.render('logIn', { logInData : request.body, errors : errors });
        }
    }

    private async getLogOut(request: Request, response: Response, next : NextFunction): Promise<void> {
        if (!request.session) throw new Error('Cookies must be enabled');
        request.session.destroy(()=>{
            response.redirect('/');
        });
    }
}