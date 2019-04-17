"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MoneySchema = new mongoose_1.Schema({
    amount: Number,
    currency: String
});
exports.MoneySchema = MoneySchema;
const TenderSchema = new mongoose_1.Schema({
    type: String,
    id: String,
    location_id: String,
    transaction_id: String,
    amount_money: MoneySchema,
    status: String,
});
exports.TenderSchema = TenderSchema;
const SquareTransactionResponseSchema = new mongoose_1.Schema({
    transactionId: String,
    locationId: String,
    idempotency_key: String,
    tenders: [TenderSchema],
});
exports.SquareTransactionResponseSchema = SquareTransactionResponseSchema;
//# sourceMappingURL=square.js.map