import { Document, model, Model, Schema } from 'mongoose';
import { Product, ProductSchema } from './product';
import { Category, CategorySchema } from './category';

const ShopSchema: Schema = new Schema({       
    //_id: String,
    name: String,
    categories: [String],
    image: String,
    stub: String,
    active: Boolean
});

let ShopModel: Model<Shop> = model<Shop>('Shop', ShopSchema);

interface Shop extends Document {       
    //_id: string,
    name: string,
    categories?: string[],
    image: string,
    stub: string,
    active: boolean
};

export { ShopSchema, Shop, ShopModel };

