export interface Moeda {
    description: string;
    code: string;
  }
  
  export interface MoedasResponse {
    symbols: { [key: string]: Moeda };
  }
  