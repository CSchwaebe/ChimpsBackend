import { Document, model, Model, Schema } from 'mongoose';

const MoneySchema: Schema = new Schema({    
    amount: Number,
    currency: String
});

const TenderSchema: Schema = new Schema({    
    type: String,
    id: String,
    location_id: String,
    transaction_id: String,
    amount_money: MoneySchema,
    status: String,
});

const SquareTransactionResponseSchema: Schema = new Schema({
    transactionId: String,
    locationId: String,
    idempotency_key: String,
    tenders: [TenderSchema],
});


interface Money extends Document {
    amount: number,
    currency: string, //USD
}

interface Tender extends Document {
    type: string,
    id: string,
    location_id: string,
    transaction_id: string,
    amount_money: Money,
    status: string,
}

export interface SquareResponse {
    data: SquareTransactionResponse
}

export interface SquarePayment {
    idempotency_key?: string,
    card_nonce: string,
    amount_money: Money,
    shipping_address: SquareAddress,
    buyer_email_address: string,
}


export interface SquareAddress {
    first_name: string;
    last_name: string;
    address_line_1: string;
    address_line_2: string;
    locality: string;
    administrative_district_level_1: string;
    postal_code: string;
    country: string;
}

export interface SquareTransactionResponse {
    transactionId: string,
    locationId: string,
    idempotency_key: string,
    tenders: Tender,
}


export { MoneySchema, TenderSchema, SquareTransactionResponseSchema, Money, Tender };
