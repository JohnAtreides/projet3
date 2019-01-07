import { Dish } from "./Dish";
import { Comment } from "./Comment";
import { Resto } from "./Resto";

export interface Model {

    /**
    * Retourne la liste des plats.
    * @returns la liste des plats. */
    dishes(): Dish[];

    /**
    * Retourne la liste des commentaires.
    *
    * @returns la liste des commentaires. */
    commentaires(): Comment[];

    /**
    * Retourne le plat qui possède 
    * l'identifiant passé en paramètre. Si il n'existe
    * pas, une exception sera lancée avec le message
    * 'Dish not found'.
    * 
    
    * @param id Identifiant du plat à trouver.
    * @returns le plat */
    dish(id: any): Dish;

    /**
    * Retourne les informations du restaurant
    * 
    * @returns les informations du restaurant. */
    resto(): Resto;

}