"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubcategorySchema = new mongoose_1.Schema({
    //_id: String,
    name: String,
    shop: String,
    category: String,
    image: String,
    stub: String,
    active: Boolean
});
exports.SubcategorySchema = SubcategorySchema;
let SubcategoryModel = mongoose_1.model('Subcategory', SubcategorySchema);
exports.SubcategoryModel = SubcategoryModel;
;
//# sourceMappingURL=subcategory.js.map