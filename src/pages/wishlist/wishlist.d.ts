export interface WishlistItem {
    _id: string;
    name: string;
    price: number;
    image: string;
  }
  
  export interface WishlistData {
    _id: string;
    user: string;
    items: WishlistItem[];
    createdAt: string;
    updatedAt: string;
  }
  
  export interface WishlistResponse {
    status: string;
    data: WishlistData;
  }
  