import { Document, model, Model, Schema } from 'mongoose';

const AccountSchema: Schema = new Schema({       
    name: String,
    logo: String,
    facebook: String,
    instagram: String,
    twitter: String,   
});

let AccountModel: Model<Account> = model<Account>('Account', AccountSchema);

interface Account extends Document {       
    //_id: string,
    name: string,
    logo: string,
    facebook: string,
    instagram: string,
    twitter: string, 
};

export { AccountSchema, Account, AccountModel };