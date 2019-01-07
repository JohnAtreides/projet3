export interface Comment {

    //identifiant du commentaire
    _id: any;

    //identifiant de l'auteur
    wid: any;

    //contenu texte du commentaire
    text: string;

    //photo associée
    //image: ;

    //identifiant commentaire parent
    pid: any;

    //numéro de filliation
    childid: number;

}