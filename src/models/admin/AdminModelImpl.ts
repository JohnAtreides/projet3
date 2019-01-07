import { AdminModel } from "./AdminModel";
import { Db, ObjectID } from "mongodb";
import { validate } from "class-validator";
import { DishData } from "./DishData";
import { CommentData } from "./CommentData";
import { AsyncModel } from "../AsyncModel";
import { plainToClass } from "class-transformer";
import { DeleteDishData } from "./DeleteDishData";
import { DeleteCommentData } from "./DeleteCommentData";


export class AdminModelImpl implements AdminModel {
    private db: Db;
    private model: AsyncModel;
    /**
    * Construit un modèle asynchrone.
    * 
    * @param db Base de donnÃ©es.
    * @param model ModÃ¨le asynchrone.
    */
    constructor(db: Db, model: AsyncModel) {
        this.db = db;
        this.model = model;
    }

    /**
    * @see AdminModel#addTeam
    */
    async addDish(data: any): Promise<any> {
        const dishData: DishData = plainToClass<DishData, object>(DishData, data, { strategy: 'excludeAll' });
        await this.validate(dishData);
        const result = await this.db.collection('menu').insertOne({ name: dishData.name, type: dishData.type, desc: dishData.desc, price: dishData.price });
        return result.insertedId;
    }

    async addcomment(data: any): Promise<any> {
        const commentData: CommentData = plainToClass<CommentData, object>(CommentData, data, { strategy: 'excludeAll' });
        await this.validate(commentData);
        const result = await this.db.collection('menu').insertOne({ wid: commentData.wid, text: commentData.text });
        return result.insertedId;

    }

    async deleteDish(data: any): Promise<void> {
        const deleteDishData: DeleteDishData = plainToClass<DeleteDishData, object>(DeleteDishData, data, { strategy: 'excludeAll' });
        await this.validate(DeleteDishData);
        await this.db.collection('menu').deleteOne({ _id: new ObjectID(deleteDishData.id) });
    }

    async deletecomment(data: any): Promise<void> {
        const deleteCommentData: DeleteCommentData = plainToClass<DeleteCommentData, object>(DeleteCommentData, data, { strategy: 'excludeAll' });
        await this.validate(DeleteCommentData);
        await this.db.collection('menu').deleteOne({ _id: new ObjectID(deleteCommentData.id) });
    }

    /**
    * 
    * LÃ¨ve une exception si l'objet passÃ© en paramÃ¨tre n'a pas pu Ãªtre validÃ©.
    * 
    * @param object Objet Ã valider
    */
    private async  validate(object: any): Promise<void> {
        const errors = await validate(object);
        if (errors.length == 0) return;
        throw errors;
    }
}
