
'use strict'
module.exports = class Paypal {

   constructor() {
       this.paypal = require('paypal-rest-sdk');
       this.paypal.configure({
           'mode': process.env.PAYPAL_MODE, //sandbox or live
           //TODO MAKE THESE ENVIRONMENT VARIABLES
           'client_id': process.env.PAYPAL_ID,
           'client_secret': process.env.PAYPAL_SECRET
       });
   }

   async refund(txID, amount) {
       let data = {
           "amount": {
               "currency": "USD",
               "total": amount.toString()
           }
       }
       console.log(txID);
       console.log(data);

       return new Promise(async (resolve, reject) => {
           let x = await this.paypal.sale.refund(txID, data, async (error, refund) => {
               if (error) {
                   console.log(error);
                   resolve(false);
               } else {
                   console.log("Refund Sale Response");
                   console.log(JSON.stringify(refund));
                   resolve(true);
               }
           });
       });
   }

   async createShipment(address, weight) {

   }

   async buy(id) {

   }


}
