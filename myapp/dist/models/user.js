"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
/*
const UserSchema = new Schema({
    username: { type: String, unique: true },
    password: String,
    tokens: Array,

}, { timestamps: true });

let UserModel: Model<User> = model<User>('User', UserSchema);
*/
const UserSchema = new mongoose_1.Schema({
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
exports.UserSchema = UserSchema;
UserSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 12, (err, hash) => {
        this.password = hash;
        next();
    });
});
UserSchema.methods.comparePassword = function (candidatePassword) {
    let password = this.password;
    return new Promise((resolve, reject) => {
        bcrypt.compare(candidatePassword, password, (err, success) => {
            //console.log(err);
            //console.log(success);
            if (err)
                return reject(err);
            return resolve(success);
        });
    });
    //return await bcrypt.compare(candidatePassword, password);
};
///////////////////////////////
let UserModel = mongoose_1.model('User', UserSchema);
exports.UserModel = UserModel;
;
;
//# sourceMappingURL=user.js.map