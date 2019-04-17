"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// lib/app.ts
const express = require("express");
const bodyParser = require("body-parser");
const routes_1 = require("./routes/routes");
const cors = require("cors");
const passport = require("passport");
const passport_local_1 = require("passport-local");
const database_1 = require("./backend/database");
const Shipping = require("./backend/shipping");
const Paypal = require("./backend/paypal");
const Square = require("./backend/square");
class App {
    constructor() {
        this.routePrv = new routes_1.Routes();
        //let Shipping = require('./backend/shipping')
        this.shipping = new Shipping();
        this.database = new database_1.Database();
        this.paypal = new Paypal();
        this.square = new Square();
        console.log(this.database);
        this.config();
    }
    config() {
        // Configure the local strategy for use by Passport.
        //
        // The local strategy require a `verify` function which receives the credentials
        // (`username` and `password`) submitted by the user.  The function must verify
        // that the password is correct and then invoke `cb` with a user object, which
        // will be set at `req.user` in route handlers after authentication.
        passport.use(new passport_local_1.Strategy((username, password, cb) => {
            this.database.findUserByUsername(username, function (err, user) {
                return __awaiter(this, void 0, void 0, function* () {
                    console.log(password);
                    if (err) {
                        return cb(err);
                    }
                    if (!user) {
                        return cb(null, false);
                    }
                    if (!(yield user.comparePassword(password))) {
                        return cb(null, false);
                    }
                    //if (user.password != password) { return cb(null, false); }
                    return cb(null, user);
                });
            });
        }));
        // Configure Passport authenticated session persistence.
        //
        // In order to restore authentication state across HTTP requests, Passport needs
        // to serialize users into and deserialize users out of the session.  The
        // typical implementation of this is as simple as supplying the user ID when
        // serializing, and querying the user record by ID from the database when
        // deserializing.
        passport.serializeUser(function (user, cb) {
            cb(null, user.id);
        });
        passport.deserializeUser(function (id, cb) {
            this.database.findUserById(id, function (err, user) {
                if (err) {
                    return cb(err);
                }
                cb(null, user);
            });
        });
        this.app = express();
        // support application/json type post data
        this.app.use(bodyParser.json());
        this.app.use(cors());
        //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(passport.initialize());
        this.app.use(passport.session());
        /** FOR PRODUCTION INITIALIZATION
         
        
        const admin = {
            email: 'channingschwaebe@gmail.com',
            username: process.env.ADMIN_USERNAME,
            password: process.env.ADMIN_PASSWORD,
            role: true
        }
        this.database.addUser(admin);

        */
        this.routePrv.routes(this.app, this.database, passport, this.shipping, this.paypal, this.square);
    }
}
exports.default = new App().app;
//# sourceMappingURL=app.js.map