  export interface IBasketResponse {
    status: string;
    data: {
      items: BasketItem[];
      totalPrice: number;
    };
  }