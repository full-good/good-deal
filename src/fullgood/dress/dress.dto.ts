import { ObjectId } from "mongoose";

export class Dress {
    userId:ObjectId;
    phone:string;
    mail:string;
    name: string;
    image:string;
    city :string;
    size: string;
    price: number;
    more: string;
}