export interface IProduct {
    _id:string;
    name: string;
    arname: string;
    imagePath: [string];
    category: string;
    arcategory: string;
    subcategory: string;
    arsubcategory: string;
    ratings: { type: Number, default: 1 },
    description: string;
    ardescription: string;
    price: number;
    countInStock: number;
    sellerId: string;
}