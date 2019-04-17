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
const jwt = require("jsonwebtoken");
class Routes {
    //database: Database = new Database();
    routes(app, database, passport, shipping, Paypal, Square) {
        app.route('/')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        app.route('/products')
            .get((req, res) => {
            res.status(200).send({
                data: 'GET request successfulll!!!!'
            });
        });
        app.route('/orders')
            .get((req, res) => {
            res.status(200).send({
                message: 'GET request successfulll!!!!'
            });
        });
        /////////////////////////////////////////////////////////////////////////
        //              LOGIN
        /////////////////////////////////////////////////////////////////////////
        //Faiure redirect isnt what we want because express doesnt handle the views
        app.route('/login')
            .post(passport.authenticate('local', { session: true }), function (req, res) {
            console.log('Route /login');
            console.log('USER:\n');
            console.log(req.user);
            res.send({ data: 'Verified' });
        });
        //Faiure redirect isnt what we want because express doesnt handle the views
        app.route('/admin/login')
            .post(passport.authenticate('local'), function (req, res) {
            console.log('Route /login');
            console.log('In Post\n');
            console.log(req.user);
            if (req.user.role) {
                //TODO - CHANGE SECRET TO ENVIRONMENT VARIABLE
                const payload = { admin: req.user.role };
                const token = jwt.sign(payload, process.env.SECRET, {
                    expiresIn: 86400 // expires in 24 hours
                });
                res.send({ data: token });
            }
            else {
                res.send({ data: 'NOT VERIFIED' });
            }
        });
        app.route('/admin/verify')
            .post((req, res) => {
            //console.log(" IN ADMIN VERIFY ROUTE")
            //console.log(req.body.token);
            let result = jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
                if (err)
                    return false;
                if (decoded)
                    return true;
            });
            //console.log(result);
            res.status(200).send({
                data: result
            });
        });
        app.route('/signup')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.addUser(req.body).catch((err) => {
                return false;
            });
            res.status(200).send({
                data: result
            });
        }));
        /////////////////////////////////////////////////////////////////////////
        //              HOME
        /////////////////////////////////////////////////////////////////////////
        app.route('/api/home')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.getHome();
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/home')
            .post((req, res) => {
            let result = database.postHome(req.body);
            res.status(200).send({
                data: result
            });
        });
        app.route('/api/home/update')
            .post((req, res) => {
            console.log(req.body);
            let result = database.updateHome(req.body);
            res.status(200).send({
                data: result
            });
        });
        /////////////////////////////////////////////////////////////////////////
        //              HEADERS
        /////////////////////////////////////////////////////////////////////////
        app.route('/api/headers/:collection')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let x = yield database.getHeader(req.path.substring(13));
            res.status(200).send({
                data: x
            });
        }));
        app.route('/api/headers/:collection/:category')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let x = yield database.getHeader(req.path.substring(13));
            res.status(200).send({
                data: x
            });
        }));
        app.route('/api/headers/:collection/:category/:subcategory')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let x = yield database.getHeader(req.path.substring(13));
            res.status(200).send({
                data: x
            });
        }));
        /////////////////////////////////////////////////////////////////////////
        //              SHOPS / COLLECTIONS
        /////////////////////////////////////////////////////////////////////////
        app.route('/api/collections/update')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            //console.log(req.body);
            let result = yield database.updateGroup(req.body);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/collections/delete')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.deleteGroup(req.body);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/collections/deactivate')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let result = yield database.deactivateGroup(req.body);
            res.status(200).send({
                data: result
            });
            /*
            let result;
            try {
                result = await database.deactivateShop(req.body);
                res.status(200).send({
                    data: result
                })
            } catch (err) {
                console.log(err);
                res.status(500).send()
            }
            */
        }));
        app.route('/api/collections/id/:id')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let shop = yield database.getGroupById(req.params.id);
            res.status(200).send({
                data: shop
            });
        }));
        app.route('/api/collections/:collection')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let shop = yield database.getGroupByStub(req.params.collection);
            res.status(200).send({
                data: shop
            });
        }));
        app.route('/api/collections/:collection/:category')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let stub = req.params.collection + '/' + req.params.category;
            let shop = yield database.getGroupByStub(stub);
            res.status(200).send({
                data: shop
            });
        }));
        app.route('/api/collections/:collection/:category/:subcategory')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let stub = req.params.collection + '/' + req.params.category + '/' + req.params.subcategory;
            let shop = yield database.getGroupByStub(stub);
            res.status(200).send({
                data: shop
            });
        }));
        /*
        .delete(async (req: Request, res: Response) => {
            let x = await database.deactivateShop(req.params.name);
            res.status(200).send({
                data: x
            })
        })
        */
        app.route('/api/collections')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.postGroup(req.body);
            res.status(200).send({
                data: result
            });
        }))
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let groupArray = yield database.getAllGroups();
            res.status(200).send({
                data: groupArray
            });
        }));
        /////////////////////////////////////////////////////////////////////////
        //              SHIPPING
        /////////////////////////////////////////////////////////////////////////
        app.route('/api/shipping')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield shipping.createShipment(req.body.address, req.body.weight);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/shipping/purchase')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield shipping.purchase(req.body.id, req.body.rate);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/shipping/refund')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield shipping.refund(req.body.id);
            res.status(200).send({
                data: result
            });
        }));
        /////////////////////////////////////////////////////////////////////////
        //              ORDERS
        /////////////////////////////////////////////////////////////////////////
        app.route('/api/orders')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.postOrder(req.body);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/orders/update')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.updateOrder(req.body);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/orders/recent')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.getRecentOrders();
            console.log(result);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/orders/unfulfilled')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.getUnfulfilledOrders();
            console.log(result);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/orders/id/:orderID')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.getOrderById(req.params.orderID);
            console.log(result);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/orders/email/:email')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.getOrderByEmail(req.params.email);
            console.log(result);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/orders/phone/:phone')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.getOrderByPhone(req.params.phone);
            console.log(result);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/orders/refund')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            if (req.body.order.payment.processor === 'Square') {
                let response = yield Square.refund(req.body.order, req.body.amount);
                if (response) {
                    let result = yield database.updateOrder(req.body.order);
                    res.status(200).send({
                        data: result
                    });
                }
                else {
                    res.status(200).send({
                        data: null
                    });
                }
            }
            else if (req.body.order.payment.processor === 'Paypal') {
                let response = yield Paypal.refund(req.body.order.transactionId, req.body.amount);
                if (response) {
                    let result = yield database.updateOrder(req.body.order);
                    res.status(200).send({
                        data: result
                    });
                }
                else {
                    res.status(500).send({
                        message: 'Could not complete refund'
                    });
                }
            }
        }));
        /////////////////////////////////////////////////////////////////////////
        //              PRODUCTS
        /////////////////////////////////////////////////////////////////////////
        app.route('/api/products')
            .post((req, res) => {
            let result = database.postProduct(req.body);
            res.status(200).send({
                data: result
            });
        });
        app.route('/api/products/update')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.updateProduct(req.body);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/products/delete')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.deleteProduct(req.body);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/products/restock')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log('In route');
            let result = yield database.restockProduct(req.body.id, req.body.size, req.body.quantity);
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/products/id/:id')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let product = yield database.getProductById(req.params.id);
            res.status(200).send({
                data: product
            });
        }));
        app.route('/api/products/featured')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let productArray = yield database.getFeaturedProducts();
            res.status(200).send({
                data: productArray
            });
        }));
        app.route('/api/products/active')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let products = yield database.getAllActiveProducts();
            res.status(200).send({
                data: products
            });
        }));
        app.route('/api/products/active/:collection')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let location = req.path.substring(20);
            let products = yield database.getActiveProducts(location);
            res.status(200).send({
                data: products
            });
        }));
        app.route('/api/products/active/:collection/:category')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let location = req.path.substring(20);
            let products = yield database.getActiveProducts(location);
            res.status(200).send({
                data: products
            });
        }));
        app.route('/api/products/active/:collection/:category/:subcategory')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let location = req.path.substring(20);
            let products = yield database.getActiveProducts(location);
            res.status(200).send({
                data: products
            });
        }));
        app.route('/api/products/:stub')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let product = yield database.getProduct(req.params.stub);
            res.status(200).send({
                data: product
            });
        }));
        /////////////////////////////////////////////////////////////////////////
        //              Messages
        /////////////////////////////////////////////////////////////////////////
        app.route('/api/messages')
            .post((req, res) => {
            let result = database.postMessage(req.body);
            res.status(200).send({
                data: result
            });
        })
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let messages = yield database.getMessages();
            res.status(200).send({
                data: messages
            });
        }));
        app.route('/api/messages/:id')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let message = yield database.getMessageById(req.params.id);
            res.status(200).send({
                data: message
            });
        }));
        app.route('/api/messages/update')
            .post((req, res) => {
            let result = database.updateMessage(req.body);
            res.status(200).send({
                data: result
            });
        });
        app.route('/api/messages/delete')
            .post((req, res) => {
            let result = database.deleteMessage(req.body);
            res.status(200).send({
                data: result
            });
        });
        /////////////////////////////////////////////////////////////////////////
        //              Subscribers
        /////////////////////////////////////////////////////////////////////////  
        app.route('/api/subscribers')
            .post((req, res) => {
            let result = database.postSubscriber(req.body);
            res.status(200).send({
                data: result
            });
        })
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let result = yield database.getSubscribers();
            res.status(200).send({
                data: result
            });
        }));
        app.route('/api/subscribers/remove')
            .post((req, res) => {
            let result = database.removeSubscriber(req.body);
            res.status(200).send({
                data: result
            });
        });
        /////////////////////////////////////////////////////////////////////////
        //              Square
        /////////////////////////////////////////////////////////////////////////  
        app.route('/api/square/pay')
            .post((req, res) => __awaiter(this, void 0, void 0, function* () {
            console.log(req.body);
            let result = yield Square.processPayment(req.body);
            console.log('result');
            console.log(result);
            //let result = database.removeSubscriber(req.body);
            res.status(200).send({
                data: result
            });
        }));
        //REMOVE THESE NEXT THREE METHODS ?? - todo
        app.route('/:collection/:category/:subcategory')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let productArray = yield database.getProducts(req.path);
            res.status(200).send({
                data: productArray
            });
        }));
        app.route('/:collection/:category')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let productArray = yield database.getProducts(req.path);
            res.status(200).send({
                data: productArray
            });
        }));
        app.route('/:collection')
            .get((req, res) => __awaiter(this, void 0, void 0, function* () {
            let productArray = yield database.getProducts(req.path);
            res.status(200).send({
                data: productArray
            });
        }));
    }
}
exports.Routes = Routes;
//# sourceMappingURL=routes.js.map