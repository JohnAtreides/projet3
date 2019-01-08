export interface Comment {

    //identifiant du commentaire
    _id: any;

    //identifiant de l'auteur
    wname: string;

    //contenu texte du commentaire
    text: string;

    //photo associée
    //image: ;

    //identifiant commentaire parent
    pid: any;

    //numéro de filliation
    childid: number;

}