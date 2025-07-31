export type User = {
    createdAt: Date;
    email: string;
    matchCode: string;
    nameSurname: string;
    uid: string;
    avatar?: {
        id: string;
        url: string;
    } 
}