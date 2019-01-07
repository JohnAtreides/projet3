"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ModelImpl {
    /** Construit un modèle à partir d'équipes et de matchs.
    * @param dishes Les plats à ajouter au modèle.
    * @param commentaires Les commentaires à ajouter au modèle.
    * @param
    * resto les infos du resto à ajouter au modèle */
    constructor(dishes, commentaires, resto) {
        this.dishes_ = dishes;
        this.commentaires_ = commentaires;
        this.resto_ = resto;
    }
    /* @see
    Model#dishes */
    dishes() {
        return this.dishes_;
    }
    // @see
    // Model#commentaires
    commentaires() {
        return this.commentaires_;
    }
    // @see
    // Model#dish
    dish(id) {
        for (const dish of this.dishes()) {
            if (dish._id.equals(id))
                return dish;
        }
        throw new Error('Dish not found');
    }
    // @see
    // Model#resto
    resto() {
        return this.resto_;
    }
}
exports.ModelImpl = ModelImpl;
