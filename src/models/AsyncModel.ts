import { Dish } from "./Dish";
import { Comment } from "./Comment";
import { Model } from "./Model";
import { Resto } from "./Resto";

export interface AsyncModel {
    // Retourne une promesse d'avoir la liste des plats.
    // @returns une promesse d'avoir liste des plats.
    dishes(type : string): Promise<Dish[]>;

    /**
    * Retourne la liste des commentaires.
    *
    * @returns une promesse d'avoir la liste des commentaires. */
    commentaires() : Promise<Comment[]>;
    
    /**
    * Retourne une promesse d'avoir le plat qui possède
    * l'identifiant passé en paramètre. Si il n'existe
    * pas, une exception sera lancée avec le message
    * 'Dish not found'.
    * 
    * @param
    id Identifiant du plat à trouver.
    * @returns une promesse d'avoir le plat */
    dish(id : any): Promise<Dish>;

    searchcomment(data : any): Promise<Comment[]>;
    
    /**
    * Retourne une promesse d'avoir les informations du restaurant
    * 
    * @returns une promesse d'avoir les informations du restaurant. */
    //resto() : Promise<Resto>;
    
}