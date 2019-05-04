import { Document, model, Model, Schema } from 'mongoose';
import { Product, ProductSchema } from './product';
import { SquareTransactionResponseSchema, SquareTransactionResponse } from './square';

const CartProductSchema: Schema = new Schema({
    product: ProductSchema,
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

CartProductSchema.pre<CartProduct>('save', function (next) {
    this.quantity_available_refund = this.get('quantity');
    this.quantity_available_restock = this.get('quantity');
    next();
});

const CartSchema: Schema = new Schema({
    products: [CartProductSchema]
});


const AddressSchema: Schema = new Schema({
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

const ReturnSchema: Schema = new Schema({
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


const RateSchema: Schema = new Schema({
    id: String,
    carrier: String,
    createdAt: String,
    currency: String,
    
    object: String,
    rate: String,
    service: String,
    shipment_id: String,
    updatedAt: String,
    delivery_days: Number
});
    

const PaymentSchema: Schema = new Schema({
    processor: String,
    square: SquareTransactionResponseSchema,
    paypal_txID: String,
});


const OrderSchema: Schema = new Schema({
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
    shippingRate: RateSchema,
    shipmentId: String,
    shippingCarrier: String,
    shippingMethod: String,
    trackingNumber: String,
    trackingUrl: String,
    shippingLabel: String,
    return: ReturnSchema,

}, { timestamps: true });



let OrderModel: Model<Order> = model<Order>('Order', OrderSchema);


interface CartProduct extends Document {
    product: Product,
    selectedSize: string,
    quantity: number,
    quantity_refunded?: number,
    quantity_restocked?: number,
    quantity_available_refund?: number,
    quantity_available_restock?: number
};


interface Payment extends Document {
    processor: string,
    square?: SquareTransactionResponse,
    paypal_txID?: string,
}

interface Address extends Document {
    name: string,
    email: string,
    phone: string,
    street1: string,
    street2: string,
    city: string,
    state: string,
    zip: string,
    country: string,
    verify: string[]
};

interface Return extends Document {
    return_initiated: boolean,
    return_received: boolean,
    return_reason: string,
    refund_type: string,
    refund_shipping: boolean,
    refund_shipping_amount: number,
    refund_tax: number,
    refund_amount: number,
    refunded_items: CartProduct[],
    refunded: boolean,
};


interface Rate extends Document {
    id: string,
    carrier: string,
    createdAt: string,
    currency: string,
    
    object: string,
    rate: string,
    service: string,
    shipment_id: string,
    updatedAt: string,
    delivery_days: number
}


interface Order extends Document {
    //_id: string,
    //name: string,
    //email: string,
    //phone: string,
    address: Address,
    products: CartProduct[],
    transactionId: string,
    subtotal: number,
    tax: number,
    shipping: number,
    total: number,
    cost: number,
    shipped: boolean,
    shippingRate: Rate,
    shipmentId: string,
    shippingCarrier: string,
    shippingMethod: string,
    trackingNumber: string,
    trackingUrl: string,
    shippingLabel: string,
    return: Return
};


export { Order, CartProduct, OrderSchema, CartSchema, CartProductSchema, OrderModel, PaymentSchema, Payment };
