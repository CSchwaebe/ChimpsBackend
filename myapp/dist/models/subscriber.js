"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const SubscriberSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    phone: String,
});
exports.SubscriberSchema = SubscriberSchema;
let SubscriberModel = mongoose_1.model('Subscriber', SubscriberSchema);
exports.SubscriberModel = SubscriberModel;
;
//# sourceMappingURL=subscriber.js.map