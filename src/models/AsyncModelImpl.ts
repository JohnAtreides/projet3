
import { Dish } from "./Dish";
import { Resto } from "./Resto";
import { AsyncModel } from "./AsyncModel";
import { ModelImpl } from "./ModelImpl";
import { Model } from "./Model";
import { Db, ObjectId } from 'mongodb';
import { Comment } from "./Comment";


export class AsyncModelImpl implements AsyncModel {

    private db: Db;


    constructor(db: Db) {

        this.db = db;

    }

    async dishes(type : string): Promise<Dish[]> {
        return await this.db.collection<Dish>('menu').find({type:type}).toArray();
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

}





