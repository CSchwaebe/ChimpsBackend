import { Document, model, Model, Schema } from 'mongoose';
import { Product, ProductSchema } from './product';
import { Shop, ShopSchema } from './shop';
import { Category, CategorySchema } from './category';

const SubcategorySchema: Schema = new Schema({       
    //_id: String,
    name: String,
    shop: String,
    category: String,
    image: String,
    stub: String,
    active: Boolean
});

let SubcategoryModel: Model<Subcategory> = model<Subcategory>('Subcategory', SubcategorySchema);

interface Subcategory extends Document {       
    //_id: string,
    name: string,
    shop: string,
    category: string,
    image: string,
    stub: string,
    active: boolean
};

export { SubcategorySchema, Subcategory, SubcategoryModel };