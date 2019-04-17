'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = class Shipping {
    constructor() {
        const easypost = require('@easypost/api');
        //ENVIRONMENT
        this.apiKey = process.env.EASYPOST_KEY;
        this.api = new easypost(this.apiKey);
    }
    createShipment(address, weight) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('CREATE SHIPMENT ADDRESS');
            console.log(address);
            let verification = yield this.toAddr(address);
            console.log(verification);
            console.log(weight);
            if (verification === false) {
                return null;
            }
            yield this.fromAddr();
            const shipment = new this.api.Shipment({
                to_address: this.toAddress,
                from_address: this.fromAddress,
                parcel: new this.api.Parcel({ weight: weight })
            });
            let tmpShipment = yield shipment.save();
            let lowestRate = yield tmpShipment.lowestRate();
            let ret = {
                id: tmpShipment.id,
                rate: lowestRate.rate,
                delivery_days: lowestRate.delivery_days,
                rate_objects: tmpShipment.rates
            };
            return ret;
        });
    }
    purchase(id, rate) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('IN BACKEND SHIPPING PURCHASE');
            //console.log(this.api.Shipment)
            let s = yield this.api.Shipment.retrieve(id);
            let x = yield s.buy(rate);
            console.log(x);
            console.log('END BACKEND SHIPPING PURCHASE');
            let obj = {
                tracking: x.tracker.tracking_code,
                public_url: x.tracker.public_url,
                shippingLabel: x.postage_label.label_url
            };
            return obj;
        });
    }
    toAddr(address) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('TO ADDR');
            this.toAddress = new this.api.Address(address);
            console.log(this.toAddress);
            let tmp = yield this.toAddress.save().catch((error) => {
                return false;
            });
            if (tmp) {
                return tmp.verifications.delivery.success;
            }
            else {
                return false;
            }
            console.log(tmp);
            let bool = (yield this.toAddress.save()).verifications.delivery.success;
            console.log(bool);
            return bool;
        });
    }
    fromAddr() {
        return __awaiter(this, void 0, void 0, function* () {
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
            });
            yield this.fromAddress.save();
        });
    }
    refund(id) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('WE made it to shipping.js');
            let shipment = yield this.api.Shipment.retrieve(id);
            let refundStatus = (yield shipment.refund()).refund_status;
            return refundStatus;
        });
    }
};
//# sourceMappingURL=shipping.js.map