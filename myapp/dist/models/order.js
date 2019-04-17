"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const product_1 = require("./product");
const square_1 = require("./square");
const CartProductSchema = new mongoose_1.Schema({
    product: product_1.ProductSchema,
    selectedSize: String,
    quantity: Number,
    quantity_refunded: {
        type: Number,
        required: true,
        default: 0
    },
    quantity_restocked: {
        type: Number,
        required: true,
        default: 0
    },
    quantity_available_refund: Number,
    quantity_available_restock: Number
});
exports.CartProductSchema = CartProductSchema;
CartProductSchema.pre('save', function (next) {
    this.quantity_available_refund = this.get('quantity');
    this.quantity_available_restock = this.get('quantity');
    next();
});
const CartSchema = new mongoose_1.Schema({
    products: [CartProductSchema]
});
exports.CartSchema = CartSchema;
const AddressSchema = new mongoose_1.Schema({
    name: String,
    email: String,
    phone: String,
    street1: String,
    street2: String,
    city: String,
    state: String,
    zip: String,
    country: String,
    verify: {
        type: [String],
        required: true,
        default: ['delivery']
    },
});
const ReturnSchema = new mongoose_1.Schema({
    return_initiated: Boolean,
    return_received: Boolean,
    return_reason: String,
    refund_type: String,
    refund_shipping: Boolean,
    refund_shipping_amount: Number,
    refund_tax: Number,
    refund_amount: Number,
    refunded: Boolean,
    notes: String
});
const PaymentSchema = new mongoose_1.Schema({
    processor: String,
    square: square_1.SquareTransactionResponseSchema,
    paypal_txID: String,
});
exports.PaymentSchema = PaymentSchema;
const OrderSchema = new mongoose_1.Schema({
    address: AddressSchema,
    products: [CartProductSchema],
    payment: PaymentSchema,
    subtotal: Number,
    tax: Number,
    taxRate: Number,
    shipping: Number,
    total: Number,
    cost: Number,
    shipped: Boolean,
    shipmentId: String,
    shippingCarrier: String,
    shippingMethod: String,
    trackingNumber: String,
    trackingUrl: String,
    shippingLabel: String,
    return: ReturnSchema,
}, { timestamps: true });
exports.OrderSchema = OrderSchema;
let OrderModel = mongoose_1.model('Order', OrderSchema);
exports.OrderModel = OrderModel;
;
;
;
;
//# sourceMappingURL=order.js.map