var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
module.exports = class Square {
    constructor() {
        const SquareConnect = require('square-connect');
        this.defaultClient = SquareConnect.ApiClient.instance;
        this.oauth2 = this.defaultClient.authentications['oauth2'];
        this.oauth2.accessToken = process.env.SQUARE_ACCESSTOKEN;
        this.locationId = process.env.SQUARE_LOCATIONID;
        this.api = new SquareConnect.LocationsApi();
        this.transactions_api = new SquareConnect.TransactionsApi();
    }
    listLocations() {
        this.api.listLocations().then(function (data) {
            console.log('API called successfully. Returned data: ' + data);
        }, function (error) {
            console.error(error);
        });
    }
    processPayment(payment) {
        return __awaiter(this, void 0, void 0, function* () {
            var idempotency_key = require('crypto').randomBytes(64).toString('hex');
            payment.idempotency_key = idempotency_key;
            /*
            var request_body = {
                card_nonce: nonce,
                amount_money: {
                    amount: amount, // $1.00 charge
                    currency: 'USD'
                },
                idempotency_key: idempotency_key
            };
            */
            //console.log(payment)
            return this.transactions_api.charge(this.locationId, payment).then((data) => {
                //console.log('data')
                //console.log(data)
                let tenders = [];
                for (let i = 0; i < data.transaction.tenders.length; i++) {
                    if (data.transaction.tenders[i].card_details.status === 'FAILED')
                        return null;
                    let amount_money = {
                        amount: data.transaction.tenders[i].amount_money.amount,
                        currency: data.transaction.tenders[i].amount_money.currency
                    };
                    let status = data.transaction.tenders[i].card_details.status;
                    let tender = {
                        type: data.transaction.tenders[i].type,
                        id: data.transaction.tenders[i].id,
                        location_id: data.transaction.tenders[i].location_id,
                        transaction_id: data.transaction.tenders[i].transaction_id,
                        amount_money: amount_money,
                        status: status,
                    };
                    tenders.push(tender);
                }
                let ret = {
                    transactionId: data.transaction.id,
                    locationId: data.transaction.location_id,
                    idempotency_key: idempotency_key,
                    tenders: tenders,
                };
                // console.log('ret')
                //console.log(ret)
                //console.log(ret.tenders)
                return ret;
            }, function (error) {
                console.log('Square Payment Processing Error' + error.response.text);
                let e = JSON.parse(error.response.text);
                return { error: e.errors[0].detail };
            });
        });
    }
    refund(order, amount) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                let amount_money = {
                    amount: (amount * 100).toFixed(0),
                    currency: order.payment.square.tenders[0].amount_money.currency
                };
                let square = order.payment.square;
                let to_refund = amount_money.amount;
                for (let i = 0; i < square.tenders.length; i++) {
                    if (to_refund > square.tenders[i].amount_money.amount) {
                    }
                    else if (to_refund <= square.tenders[i].amount_money.amount) {
                        //issue refund
                        var idempotency_key = require('crypto').randomBytes(64).toString('hex');
                        let refund_request = {
                            idempotency_key: idempotency_key,
                            tender_id: square.tenders[i].id,
                            amount_money: {
                                amount: to_refund,
                                currency: square.tenders[i].amount_money.currency
                            }
                        };
                        let refundResponse = yield this.transactions_api.createRefund(square.locationId, square.transactionId, refund_request);
                        refundResponse = JSON.stringify(refundResponse);
                        refundResponse = JSON.parse(refundResponse);
                        refundResponse = refundResponse.refund;
                        console.log(refundResponse);
                        if (refundResponse.status === 'APPROVED' || refundResponse.status === 'PENDING') {
                            //ok
                            //update tender
                            console.log('In square js refundResponse is approved');
                            square.tenders[i].amount_money.amount -= refundResponse.amount_money.amount;
                            resolve(true);
                        }
                        else if (refundResponse.status === 'REJECTED' || refundResponse.status === 'FAILED') {
                            resolve(false);
                        }
                    }
                }
            }));
        });
    }
};
//# sourceMappingURL=square.js.map