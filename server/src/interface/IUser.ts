import mongoose, {Document} from "mongoose";

export enum Role {
    USER = 'user',
    ADMIN = 'admin'
}

export interface IUser extends Document{
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: Role;
    createdAt: Date;
    updatedAt: Date;

}

export interface  IUserInputDTO {
    username: string;
    firstname: string;
    lastName: string;
    email: string;
    password: string;
    role: string;
}

export interface  ILoginDTO{
    email: string;
    password: string
}