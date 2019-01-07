import { User } from "./User";
import { Db, ObjectID } from "mongodb";
import * as bcrypt from "bcrypt";
import { validate } from "class-validator";
import { LogInData } from "./LogInData";
import { AuthModel } from "./AuthModel";
import { plainToClass } from "class-transformer";
import { Result } from "range-parser";
import { userInfo } from "os";

export class AuthModelImpl implements AuthModel {
    private db : Db;
    
    /**
     * Construit un modèle asynchrone.
     * 
     * @param db Base de données.
     */
    constructor(db : Db) {
        this.db = db;
    }

    /**
     * @see AuthModel#signUp
     */
    async signUp(data: any): Promise<any> {
        const logInData : LogInData = plainToClass<LogInData, object>(LogInData, data, {strategy : 'excludeAll' });
        await this.validate(logInData);
        const user = await this.db.collection('users').findOne({ username : logInData.username});
        if (user != null) {
            throw new Error('Username already exists');
        }
        const hash = await bcrypt.hash(logInData.password, 10)
        const result = await this.db.collection('users').insertOne({
            username : logInData.username,
            password : hash
        });
        return result.insertedId
        /**
         * TODO :
         *  - vérifier que ce nom d'utilisateur n'est pas déjà pris (sinon throw new Error("Username already exists")).
         *  - ajouter l'utilisateur à la base de données en hachant son mot de passe.
         *  - retourner l'identifiant du nouvel utilisateur créé.
         */
        
    }    
    
    /**
     * @see AuthModel#getUserId
     */
    async getUserId(data: any): Promise<any> {
        const logInData : LogInData = plainToClass<LogInData, object>(LogInData, data, {strategy : 'excludeAll' });
        await this.validate(logInData);
        const user = await this.db.collection('users').findOne({ username : logInData.username});
        if (user == null) {
            throw new Error('Username or password is not correct');
        }
        if (!await bcrypt.compare(logInData.password, user.password)) {
            throw new Error('Username or password is not correct');
        }
        return user._id;
    }
    
        /**
         * TODO :
         *  - récupérer l'utilisateur à partir du nom d'utilisateur présent dans data.
         *  - si l'utilisateur n'existe pas ou si le mot de passe n'est pas valide, 
         *       jeter une exception new Error("Username or password are not correct")
         *  - retourner l'identifiant de l'utilisateur trouvé.
         */
        
    
    /**
     * @see AuthModel#getUserFromId
     */
    async getUserFromId(id : any) : Promise<User> {
        const user = await this.db.collection('users').findOne({ _id : new ObjectID(id) });
        if (user == null) {
            throw new Error('User not found');
        }
        delete user.password;
        return user;

        /**
         * - récupérer l'utilisateur à partir de l'identifiant avec findOne
         * - si aucun utilisateur n'a été trouvé : throw new("User not found")
         * - supprimer le mot de passe 'haché' présent dans l'objet représentant l'utilisateur
         * - retourner l'utilisateur
         */
        throw new Error('Not implemented');
    }

    /**
     * 
     * Lève une exception si l'objet passé en paramètre n'a pas pu être validé.
     * 
     * @param object Objet à valider
     */
    private async validate(object : any) : Promise<void> {
        const errors = await validate(object);
        if (errors.length == 0) return;
        throw errors;
    }
}