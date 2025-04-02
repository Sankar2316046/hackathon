export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    quantity: number;
  }
  
  export interface CartItem extends Product {
    quantity: number;
  }