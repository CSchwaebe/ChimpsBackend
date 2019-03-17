import { Document, model, Model, Schema } from 'mongoose';
import { Group, GroupSchema } from './group';
import { ProductSchema, Product } from './product';

const HomeSchema: Schema = new Schema({       
    images: [String],
    featuredCollections: [GroupSchema],
    featuredProducts: [ProductSchema]
});

let HomeModel: Model<Home> = model<Home>('Home', HomeSchema);

interface Home extends Document {       
    images: string[],
    featuredCollections: Group[];
    featuredProducts: Product[];
};

export { HomeSchema, Home, HomeModel };

