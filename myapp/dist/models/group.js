"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GroupSchema = new mongoose_1.Schema({
    //_id: String,
    active: Boolean,
    featured: Boolean,
    type: String,
    name: String,
    image: String,
    stub: String,
    shop: String,
    category: String,
});
exports.GroupSchema = GroupSchema;
let GroupModel = mongoose_1.model('Group', GroupSchema);
exports.GroupModel = GroupModel;
;
//# sourceMappingURL=group.js.map