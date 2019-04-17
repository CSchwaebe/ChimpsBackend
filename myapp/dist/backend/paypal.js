'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = class Paypal {
    constructor() {
        this.paypal = require('paypal-rest-sdk');
        this.paypal.configure({
            'mode': process.env.PAYPAL_MODE,
            //TODO MAKE THESE ENVIRONMENT VARIABLES
            'client_id': process.env.PAYPAL_ID,
            'client_secret': process.env.PAYPAL_SECRET
        });
    }
    refund(txID, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            let data = {
                "amount": {
                    "currency": "USD",
                    "total": amount.toString()
                }
            };
            console.log(txID);
            console.log(data);
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let x = yield this.paypal.sale.refund(txID, data, (error, refund) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        console.log(error);
                        resolve(false);
                    }
                    else {
                        console.log("Refund Sale Response");
                        console.log(JSON.stringify(refund));
                        resolve(true);
                    }
                }));
            }));
        });
    }
    createShipment(address, weight) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    buy(id) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
};
//# sourceMappingURL=paypal.js.map