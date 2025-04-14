export interface BasketItemPayload {
    productId: string;
    quantity: number;
  }

export interface PopulatedProduct {
    _id: string;
    name: string;
    description: string;
    price: number;
    image: string[];
    quantity: number; 
  }
  
  export interface BasketItem {
    product: PopulatedProduct;
    quantity: number;
    _id?: string; 
  }
  
 export interface Basket {
    userId: string;
    items: BasketItem[];
    totalPrice: number;
    updatedAt: string;
  }

  export interface BasketResponse {
    status: string;
    data: {
      items: BasketItem[];
      totalPrice: number;
    };
  }