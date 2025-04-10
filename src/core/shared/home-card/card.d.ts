import { User } from "core/utils/IUser";

export interface ICard {
    title: string;
    price: number;
    photo: string;
}

export interface Product {
    id: number;
    name: string;
    description?: string;
    image?: string[];
    price: number;
    seller:User; 
    weight: string; 
    quantity?: number;
    isAvailable?: boolean;
    isOrganic?: boolean;
    rating?: number;
  }