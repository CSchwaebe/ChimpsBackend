"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const CategorySchema = new mongoose_1.Schema({
    //_id: String,
    name: String,
    shop: String,
    subcategories: [String],
    image: String,
    stub: String,
    active: Boolean
});
exports.CategorySchema = CategorySchema;
let CategoryModel = mongoose_1.model('Category', CategorySchema);
exports.CategoryModel = CategoryModel;
;
//# sourceMappingURL=category.js.map