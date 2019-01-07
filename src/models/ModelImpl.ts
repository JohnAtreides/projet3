import { Model } from "./Model";
import { Dish } from "./Dish";
import { Comment } from "./Comment";
import { Resto } from "./Resto";

export class ModelImpl implements Model {
    private dishes_: Dish[];
    private commentaires_: Comment[];
    private resto_: Resto;

    /** Construit un modèle à partir d'équipes et de matchs.
    * @param dishes Les plats à ajouter au modèle.
    * @param commentaires Les commentaires à ajouter au modèle.
    * @param
    * resto les infos du resto à ajouter au modèle */

    constructor(dishes: Dish[], commentaires: Comment[], resto: Resto) {
        this.dishes_ = dishes;
        this.commentaires_ = commentaires;
        this.resto_ = resto;
    }

    /* @see
    Model#dishes */
    dishes(): Dish[] {
        return this.dishes_;
    }
    // @see
    // Model#commentaires
    commentaires(): Comment[] {
        return this.commentaires_;
    }

    // @see
    // Model#dish

    dish(id: any): Dish {
        for (const dish of this.dishes()) { if (dish._id.equals(id)) return dish; }
        throw new Error('Dish not found');
    }

    // @see
    // Model#resto
    resto(): Resto {
        return this.resto_;
    }


}
