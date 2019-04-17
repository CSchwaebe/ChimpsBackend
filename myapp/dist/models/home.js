"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const group_1 = require("./group");
const product_1 = require("./product");
const HomeSchema = new mongoose_1.Schema({
    images: [String],
    featuredCollections: [group_1.GroupSchema],
    featuredProducts: [product_1.ProductSchema]
});
exports.HomeSchema = HomeSchema;
let HomeModel = mongoose_1.model('Home', HomeSchema);
exports.HomeModel = HomeModel;
;
//# sourceMappingURL=home.js.map