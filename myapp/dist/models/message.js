"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MessageSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    phone: String,
    message: String,
    status: Boolean,
}, { timestamps: true });
exports.MessageSchema = MessageSchema;
let MessageModel = mongoose_1.model('Message', MessageSchema);
exports.MessageModel = MessageModel;
;
//# sourceMappingURL=message.js.map