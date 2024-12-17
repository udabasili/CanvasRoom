import mongoose, { Document } from "mongoose";

export enum Role {
  USER = "user",
  ADMIN = "admin",
}

export interface IUser extends Document {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: Role;
  createdAt: Date;
  updatedAt: Date;
  avatarUrl?: string;
  groups: mongoose.Types.ObjectId[];
}

export interface CreateUserDto {
  username: string;
  firstname: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}
