import { Document, model, Model, Schema } from 'mongoose';

const MessageSchema: Schema = new Schema({       
    name: String,
    email: String,
    phone: String,
    message: String,
    status: Boolean,
}, { timestamps: true });

let MessageModel: Model<Message> = model<Message>('Message', MessageSchema);

interface Message extends Document {       
    //_id: string,
    name: string,
    email: string,
    phone: string,
    message: string,
    status: boolean,
};

export { Message, MessageModel, MessageSchema };