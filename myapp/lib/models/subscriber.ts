import { Document, model, Model, Schema } from 'mongoose';

const SubscriberSchema: Schema = new Schema({       
    name: String,
    email: String,
    phone: String,
});

let SubscriberModel: Model<Subscriber> = model<Subscriber>('Subscriber', SubscriberSchema);

interface Subscriber extends Document {       
    name: string,
    email: string,
    phone: string,
};

export { SubscriberSchema, Subscriber, SubscriberModel };