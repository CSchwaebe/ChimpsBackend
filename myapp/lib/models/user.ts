import { Document, model, Model, Schema } from 'mongoose';
import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt-nodejs";

/*
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    tokens: Array,

}, { timestamps: true });

let UserModel: Model<User> = model<User>('User', UserSchema);
*/


const UserSchema = new Schema({
    //Change required to true
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
    },
    //Change required to true
    passwordConf: {
        type: String,
        required: false,
    },
    role: {
        type: Boolean,
        required: true,
        default: false
    }
});

UserSchema.pre<User>("save", function (next) {
    bcrypt.hash(this.password, 12, (err, hash) => {
        this.password = hash;
        next();
    });
});

UserSchema.methods.comparePassword = function (candidatePassword: string): Promise<boolean> {
   
    let password = this.password;
    
    
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            //console.log(err);
            //console.log(success);
            if (err) return reject(err);
            return resolve(success);
        });
    });
    //return await bcrypt.compare(candidatePassword, password);
};




///////////////////////////////


let UserModel: Model<User> = model<User>('User', UserSchema);


interface User extends Document {
    email: string,
    username: string,
    password: string,
    passwordConf: string,
    role: boolean,
    comparePassword(candidatePassword: string): Promise<boolean>;
};


interface AuthToken extends Document {
    accessToken: string,
    kind: string
};


export { UserSchema, UserModel, User };

