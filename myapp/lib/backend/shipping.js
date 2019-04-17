'use strict'
module.exports = class Shipping {
    
    constructor() {
        const easypost = require('@easypost/api');
        //ENVIRONMENT
        this.apiKey = process.env.EASYPOST_KEY;
        this.api = new easypost(this.apiKey);
    }

    async createShipment(address, weight) {
        console.log('CREATE SHIPMENT ADDRESS')
        console.log(address);
        let verification = await this.toAddr(address); 
        console.log(verification);
        console.log(weight);
        if (verification === false) {
            return null;
        }
        await this.fromAddr();
         
        const shipment = new this.api.Shipment({
            to_address: this.toAddress,
            from_address: this.fromAddress,
            parcel: new this.api.Parcel({ weight: weight })
          });
          
        let tmpShipment = await shipment.save();
          
        
         
        let lowestRate = await tmpShipment.lowestRate();

          let ret = {
              id: tmpShipment.id,
              rate: lowestRate.rate,
              delivery_days: lowestRate.delivery_days,
              rate_objects: tmpShipment.rates
          }

          return ret;
    }
    
    async purchase(id, rate) {
        console.log('IN BACKEND SHIPPING PURCHASE');
        //console.log(this.api.Shipment)
        let s = await this.api.Shipment.retrieve(id);
        let x = await s.buy(rate).catch((e) => {
            console.log(e)
        });
        console.log(x);
        console.log('END BACKEND SHIPPING PURCHASE');
        let obj = {
            tracking: x.tracker.tracking_code,
            public_url: x.tracker.public_url,
            shippingLabel: x.postage_label.label_url
        }
        return obj;
    }

    async toAddr(address) {
        console.log('TO ADDR');
        this.toAddress = new this.api.Address(address);
       
        console.log(this.toAddress);
        let tmp = await this.toAddress.save().catch((error) => {
            return false;
        });
        if (tmp) {
            return tmp.verifications.delivery.success;
        } else {
            return false;
        }
        console.log(tmp);
        
        let bool = (await this.toAddress.save()).verifications.delivery.success;
        console.log(bool);
        return bool;
    }

    async fromAddr() {
        this.fromAddress = new this.api.Address({
            verify_strict: ['delivery'],
            street1: '1039 TURNSTONE RD',
            street2: '',
            city: 'CARLSBAD',
            state: 'CA',
            zip: '92011',
            country: 'US',
            company: 'BigKatOriginal',
            phone: '760-822-4927',
        })

        await this.fromAddress.save();
    }

   
    async refund(id) {
        console.log('WE made it to shipping.js')
        let shipment = await this.api.Shipment.retrieve(id);

        let refundStatus = (await shipment.refund()).refund_status;
        return refundStatus;    
    }  


}



