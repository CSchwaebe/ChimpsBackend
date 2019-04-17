"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ShopSchema = new mongoose_1.Schema({
    //_id: String,
    name: String,
    categories: [String],
    image: String,
    stub: String,
    active: Boolean
});
exports.ShopSchema = ShopSchema;
let ShopModel = mongoose_1.model('Shop', ShopSchema);
exports.ShopModel = ShopModel;
;
//# sourceMappingURL=shop.js.map