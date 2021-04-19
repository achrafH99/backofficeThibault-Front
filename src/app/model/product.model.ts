

export interface Product {
    id: number;
    name  : string;
    category : number;
    price : number;
    unit: string;
    availability : boolean;
    sale: boolean;
    discount ?: number;
    owner : string;
    quantityInStock: number;
    tigID: number;
    comments: string;
}
