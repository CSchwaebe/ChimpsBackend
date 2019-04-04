import { Document, model, Model, Schema } from 'mongoose';

const VariantSchema: Schema = new Schema({
    size: String,
    color: String,
    material: String,
    quantity: Number,
    sku: String,
    barcode: Schema.Types.Mixed,
    weight: Number,
    trackInventory: Boolean
})

const WeightSchema: Schema = new Schema({
    pounds: Number,
    ounces: Number,
    kilograms: Number,
    grams: Number
})


const ProductSchema: Schema = new Schema({
    active: Boolean,
    featured: Boolean,
    shop: String,
    category: String,
    subcategory: String,
    name: String,
    price: Number,
    cost: Number,
    color: String,
    weight: WeightSchema,
    description: Schema.Types.Mixed,
    inventory: [VariantSchema],
    images: [String],
    stub: String,
    location: String
});

let ProductModel: Model<Product> = model<Product>('Product', ProductSchema);

interface Product extends Document {
    active: boolean,
    featured: boolean,
    shop: string,
    category: string,
    subcategory: string,
    name: string,
    price: number,
    cost: number,
    color: string,
    weight: Weight,
    description: any,
    inventory: [Variant],
    images: [string],
    stub: string,
    location: string
};

interface Variant extends Document {
    size?: string,
    color?: string,
    material?: string,
    quantity?: number,
    sku?: string,
    barcode?: any,
    weight?: number,
    trackInventory?: boolean
}


interface Weight extends Document {
    pounds: number,
    ounces: number,
    kilograms: number,
    grams: number
}

export { ProductSchema, Product, ProductModel, Variant, VariantSchema, Weight, WeightSchema };






