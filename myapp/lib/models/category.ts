import { Document, model, Model, Schema } from 'mongoose';
import { Product, ProductSchema } from './product';
import { Shop, ShopSchema } from './shop';
import { SubcategorySchema, Subcategory } from './subcategory';


const CategorySchema: Schema = new Schema({       
    //_id: String,
    name: String,
    shop: String,
    subcategories: [String],
    image: String,
    stub: String,
    active: Boolean
});

let CategoryModel: Model<Category> = model<Category>('Category', CategorySchema);

interface Category extends Document {       
    //_id: string,
    name: string,
    shop: string,
    subcategories: string[],
    image: string,
    stub: string,
    active: boolean
};

export { CategorySchema, Category, CategoryModel };