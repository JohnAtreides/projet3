
import { Dish } from "./Dish";
import { Resto } from "./Resto";
import { AsyncModel } from "./AsyncModel";
import { ModelImpl } from "./ModelImpl";
import { Model } from "./Model";
import { Db, ObjectId } from 'mongodb';
import { Comment } from "./Comment";
import { comData } from "./comData";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";


export class AsyncModelImpl implements AsyncModel {

    private db: Db;


    constructor(db: Db) {

        this.db = db;

    }

    async dishes(type: string): Promise<Dish[]> {
        return await this.db.collection<Dish>('menu').find({ type: type }).toArray();
    }




    async commentaires(): Promise<Comment[]> {
        return await this.db.collection<Comment>('commentaires').find().toArray();
    }

    async dish(id: any): Promise<Dish> {



        const Dish = await this.db.collection<Dish>('dishes').findOne({ _id: new ObjectId(id) });

        if (Dish == null)

            throw new Error('Dish not found');

        return Dish;


    }

    async searchcomment(data: any): Promise<Comment[]> {
        console.log(data);
        const searchData: comData = plainToClass<comData, object>(comData, data, { strategy: 'excludeAll' });
        await this.validate(comData);
        const a=await this.db.collection<Comment>('commentaires').find({ text: { $regex: searchData}}).toArray();

        console.log(a);
        return a;
    }

    private async  validate(object: any): Promise<void> {
        const errors = await validate(object);
        if (errors.length == 0) return;
        throw errors;
    }
}





