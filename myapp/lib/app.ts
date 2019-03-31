// lib/app.ts
import * as express from "express";
import * as bodyParser from "body-parser";
import { Routes } from './routes/routes';
import cors = require('cors');
import passport = require('passport');
import { Strategy } from "passport-local";
//import Strategy = require('passport-local').Strategy;
import { Database } from './backend/database';
import { UserModel, User } from './models/user';
import Shipping = require('./backend/shipping');
import Paypal = require('./backend/paypal');


class App {


    public app: express.Application;
    public routePrv: Routes = new Routes();
    database: Database;
    shipping; 
    paypal;

    constructor() {
        //let Shipping = require('./backend/shipping')
        this.shipping = new Shipping();
        this.database = new Database();
        this.paypal = new Paypal();
        
        console.log(this.database);
        
        this.config();
    }

    private config(): void {
         // Configure the local strategy for use by Passport.
        //
        // The local strategy require a `verify` function which receives the credentials
        // (`username` and `password`) submitted by the user.  The function must verify
        // that the password is correct and then invoke `cb` with a user object, which
        // will be set at `req.user` in route handlers after authentication.
        passport.use(new Strategy(
             (username, password, cb) => {
                this.database.findUserByUsername(username, async function (err, user: User) {
                    console.log(password);
                    if (err) { return cb(err); }
                    if (!user) { return cb(null, false); }
                    if (! await user.comparePassword(password)) { return cb(null, false); }
                    //if (user.password != password) { return cb(null, false); }
                    return cb(null, user);
                });
            }));


        // Configure Passport authenticated session persistence.
        //
        // In order to restore authentication state across HTTP requests, Passport needs
        // to serialize users into and deserialize users out of the session.  The
        // typical implementation of this is as simple as supplying the user ID when
        // serializing, and querying the user record by ID from the database when
        // deserializing.
        passport.serializeUser(function (user: User, cb) {
            cb(null, user.id);
        });

        passport.deserializeUser(function (id, cb) {
            this.database.findUserById(id, function (err, user) {
                if (err) { return cb(err); }
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
            password: process.env.ADMIN_PW,
            role: true
        }
        this.database.addUser(admin);
         **/
        
         

        this.routePrv.routes(this.app, this.database, passport, this.shipping, this.paypal);
        
    }

}

export default new App().app;