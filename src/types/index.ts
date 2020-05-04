export type TToken = { 
    name: string;
    fullName: string; 
    imageUrl: string;
    price: number;
    volume24Hour: number; 
  }

export type TTokenDiff = {[key: string] : string};