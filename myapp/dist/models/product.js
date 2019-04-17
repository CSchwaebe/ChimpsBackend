"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const VariantSchema = new mongoose_1.Schema({
    size: String,
    color: String,
    material: String,
    quantity: Number,
    sku: String,
    barcode: mongoose_1.Schema.Types.Mixed,
    weight: Number,
    trackInventory: Boolean
});
exports.VariantSchema = VariantSchema;
const WeightSchema = new mongoose_1.Schema({
    pounds: Number,
    ounces: Number,
    kilograms: Number,
    grams: Number
});
exports.WeightSchema = WeightSchema;
const ProductSchema = new mongoose_1.Schema({
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
    description: mongoose_1.Schema.Types.Mixed,
    inventory: [VariantSchema],
    images: [String],
    stub: String,
    location: String
});
exports.ProductSchema = ProductSchema;
let ProductModel = mongoose_1.model('Product', ProductSchema);
exports.ProductModel = ProductModel;
;
//# sourceMappingURL=product.js.map