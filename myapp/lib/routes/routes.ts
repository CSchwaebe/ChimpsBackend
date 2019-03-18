import { Request, Response } from "express";
import { Database } from '../backend/database';
import Shipping = require('../backend/shipping');
import Paypal = require('../backend/paypal');
import * as jwt from 'jsonwebtoken';

export class Routes {
    //database: Database = new Database();

    public routes(app, database: Database, passport, shipping: Shipping, Paypal: Paypal): void {
        app.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })



        app.route('/products')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    data: 'GET request successfulll!!!!'
                })
            })

        app.route('/orders')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                })
            })




        /////////////////////////////////////////////////////////////////////////
        //              LOGIN
        /////////////////////////////////////////////////////////////////////////

        //Faiure redirect isnt what we want because express doesnt handle the views
        app.route('/login')
            .post(
                passport.authenticate('local', { session: true }),
                function (req, res) {
                    console.log('USER:\n');
                    console.log(req.user);

                    res.send({ data: 'Verified' });
                })

        //Faiure redirect isnt what we want because express doesnt handle the views
        app.route('/admin/login')
            .post(
                passport.authenticate('local'),
                function (req, res) {
                    console.log('In Post\n')
                    console.log(req.user);
                    if (req.user.role) {
                        //TODO - CHANGE SECRET TO ENVIRONMENT VARIABLE
                        const payload = { admin: req.user.role };

                        const token = jwt.sign(payload, process.env.SECRET, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        res.send({ data: token });
                    } else {
                        res.send({ data: 'NOT VERIFIED' });
                    }
                })

        app.route('/admin/verify')
            .post((req: Request, res: Response) => {
                console.log(" IN ADMIN VERIFY ROUTE")
                console.log(req.body.token);
                let result = jwt.verify(req.body.token, process.env.SECRET, (err, decoded) => {
                    if (err)
                        return false;
                    if (decoded)
                        return true;
                });
                console.log(result);
                res.status(200).send({
                    data: result
                })
            })

        app.route('/signup')
            .post(async (req: Request, res: Response) => {
                let result = await database.addUser(req.body).catch((err) => {
                    return false;
                });
                res.status(200).send({
                    data: result
                })
            })






        /////////////////////////////////////////////////////////////////////////
        //              HOME
        /////////////////////////////////////////////////////////////////////////


        app.route('/api/home')
            .get(async (req: Request, res: Response) => {
                let result = await database.getHome();
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/home')
            .post((req: Request, res: Response) => {
                let result = database.postHome(req.body);
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/home/update')
            .post((req: Request, res: Response) => {
                console.log(req.body);
                let result = database.updateHome(req.body);
                res.status(200).send({
                    data: result
                })
            })


        /////////////////////////////////////////////////////////////////////////
        //              HEADERS
        /////////////////////////////////////////////////////////////////////////

        app.route('/api/headers/:collection')
            .get(async (req: Request, res: Response) => {

                let x = await database.getHeader(req.path.substring(13))

                res.status(200).send({
                    data: x
                })
            })

        app.route('/api/headers/:collection/:category')
            .get(async (req: Request, res: Response) => {

                let x = await database.getHeader(req.path.substring(13))

                res.status(200).send({
                    data: x
                })
            })

        app.route('/api/headers/:collection/:category/:subcategory')
            .get(async (req: Request, res: Response) => {

                let x = await database.getHeader(req.path.substring(13))

                res.status(200).send({
                    data: x
                })
            })

        /////////////////////////////////////////////////////////////////////////
        //              SHOPS / COLLECTIONS
        /////////////////////////////////////////////////////////////////////////

        app.route('/api/collections/update')
            .post(async (req: Request, res: Response) => {
                //console.log(req.body);
                let result = await database.updateGroup(req.body);
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/collections/delete')
            .post(async (req: Request, res: Response) => {
                let result = await database.deleteGroup(req.body);
                res.status(200).send({
                    data: result
                })

            })

        app.route('/api/collections/deactivate')
            .post(async (req: Request, res: Response) => {
                console.log(req.body);
                let result = await database.deactivateGroup(req.body);
                res.status(200).send({
                    data: result
                })
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


            })

        app.route('/api/collections/id/:id')
            .get(async (req: Request, res: Response) => {
                let shop = await database.getGroupById(req.params.id)
                res.status(200).send({
                    data: shop
                })
            })

        app.route('/api/collections/:stub')
            .get(async (req: Request, res: Response) => {
                let shop = await database.getGroupByStub(req.params.stub)
                res.status(200).send({
                    data: shop
                })
            })
        /*
        .delete(async (req: Request, res: Response) => {
            let x = await database.deactivateShop(req.params.name);
            res.status(200).send({
                data: x
            })
        })
        */

        app.route('/api/collections')
            .post(async (req: Request, res: Response) => {
                let result = await database.postGroup(req.body);

                res.status(200).send({
                    data: result
                })
            })

            .get(async (req: Request, res: Response) => {
                let groupArray = await database.getAllGroups();

                res.status(200).send({
                    data: groupArray
                })
            })


        /////////////////////////////////////////////////////////////////////////
        //              SHIPPING
        /////////////////////////////////////////////////////////////////////////

        app.route('/api/shipping')
            .post(async (req: Request, res: Response) => {
                let result = await shipping.createShipment(req.body.address, req.body.weight);
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/shipping/purchase')
            .post(async (req: Request, res: Response) => {
                let result = await shipping.purchase(req.body.id, req.body.rate);
                res.status(200).send({
                    data: result
                })
            })


        app.route('/api/shipping/refund')
            .post(async (req: Request, res: Response) => {
                let result = await shipping.refund(req.body.id);
                res.status(200).send({
                    data: result
                })
            })



        /////////////////////////////////////////////////////////////////////////
        //              ORDERS
        /////////////////////////////////////////////////////////////////////////

        app.route('/api/orders')
            .post(async (req: Request, res: Response) => {
                let result = await database.postOrder(req.body);
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/orders/update')
            .post(async (req: Request, res: Response) => {
                let result = await database.updateOrder(req.body);
                res.status(200).send({
                    data: result
                })
            })


        app.route('/api/orders/recent')
            .get(async (req: Request, res: Response) => {
                let result = await database.getRecentOrders();
                console.log(result);
                res.status(200).send({
                    data: result
                })
            })



        app.route('/api/orders/unfulfilled')
            .get(async (req: Request, res: Response) => {
                let result = await database.getUnfulfilledOrders();
                console.log(result);
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/orders/id/:orderID')
            .get(async (req: Request, res: Response) => {
                let result = await database.getOrderById(req.params.orderID);
                console.log(result);
                res.status(200).send({
                    data: result
                })
            })


        app.route('/api/orders/email/:email')
            .get(async (req: Request, res: Response) => {
                let result = await database.getOrderByEmail(req.params.email);
                console.log(result);
                res.status(200).send({
                    data: result
                })
            })


        app.route('/api/orders/phone/:phone')
            .get(async (req: Request, res: Response) => {
                let result = await database.getOrderByPhone(req.params.phone);
                console.log(result);
                res.status(200).send({
                    data: result
                })
            })


        app.route('/api/orders/refund')
            .post(async (req: Request, res: Response) => {
                let paypalResponse = await Paypal.refund(req.body.order.transactionId, req.body.amount);
                if (paypalResponse) {
                    let result = await database.updateOrder(req.body.order);
                    res.status(200).send({
                        data: result
                    })
                } else {
                    res.status(500).send({
                        message: 'Could not complete refund'
                    })
                }

            })



        /////////////////////////////////////////////////////////////////////////
        //              PRODUCTS
        /////////////////////////////////////////////////////////////////////////

        app.route('/api/products')
            .post((req: Request, res: Response) => {
                let result = database.postProduct(req.body);
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/products/update')
            .post(async (req: Request, res: Response) => {
                let result = await database.updateProduct(req.body);
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/products/delete')
            .post(async (req: Request, res: Response) => {
                let result = await database.deleteProduct(req.body);
                res.status(200).send({
                    data: result
                })
            })


        app.route('/api/products/putback')
            .post(async (req: Request, res: Response) => {
                console.log('In route');
                let result = await database.putProductBack(req.body.id, req.body.size, req.body.quantity);
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/products/id/:id')
            .get(async (req: Request, res: Response) => {
                let product = await database.getProductById(req.params.id);
                res.status(200).send({
                    data: product
                })
            })

        app.route('/api/products/featured')
            .get(async (req: Request, res: Response) => {
                let productArray = await database.getFeaturedProducts();
                res.status(200).send({
                    data: productArray
                })
            })

        app.route('/api/products/active')
            .get(async (req: Request, res: Response) => {
                let products = await database.getAllActiveProducts();
                res.status(200).send({
                    data: products
                })
            })

        app.route('/api/products/active/:collection')
            .get(async (req: Request, res: Response) => {
                let location = req.path.substring(20);

                let products = await database.getActiveProducts(location);
                res.status(200).send({
                    data: products
                })
            })

        app.route('/api/products/active/:collection/:category')
            .get(async (req: Request, res: Response) => {
                let location = req.path.substring(20);
                let products = await database.getActiveProducts(location);
                res.status(200).send({
                    data: products
                })
            })

        app.route('/api/products/active/:collection/:category/:subcategory')
            .get(async (req: Request, res: Response) => {
                let location = req.path.substring(20);
                let products = await database.getActiveProducts(location);
                res.status(200).send({
                    data: products
                })
            })




        app.route('/api/products/:stub')
            .get(async (req: Request, res: Response) => {
                let product = await database.getProduct(req.params.stub);
                res.status(200).send({
                    data: product
                })
            })


        /////////////////////////////////////////////////////////////////////////
        //              Messages
        /////////////////////////////////////////////////////////////////////////

        app.route('/api/messages')
            .post((req: Request, res: Response) => {
                let result = database.postMessage(req.body);
                res.status(200).send({
                    data: result
                })
            })

            .get(async (req: Request, res: Response) => {
                let messages = await database.getMessages();
                res.status(200).send({
                    data: messages
                })
            })

        app.route('/api/messages/:id')
            .get(async (req: Request, res: Response) => {
                let message = await database.getMessageById(req.params.id);
                res.status(200).send({
                    data: message
                })
            })

        app.route('/api/messages/update')
            .post((req: Request, res: Response) => {
                let result = database.updateMessage(req.body);
                res.status(200).send({
                    data: result
                })
            })



        /////////////////////////////////////////////////////////////////////////
        //              Subscribers
        /////////////////////////////////////////////////////////////////////////  

        app.route('/api/subscribers')
            .post((req: Request, res: Response) => {
                let result = database.postSubscriber(req.body);
                res.status(200).send({
                    data: result
                })
            })

            .get(async (req: Request, res: Response) => {
                let result = await database.getSubscribers();
                res.status(200).send({
                    data: result
                })
            })

        app.route('/api/subscribers/remove')
            .post((req: Request, res: Response) => {
                let result = database.removeSubscriber(req.body);
                res.status(200).send({
                    data: result
                })
            })




        //REMOVE THESE NEXT THREE METHODS ?? - todo


        app.route('/:collection/:category/:subcategory')
            .get(async (req: Request, res: Response) => {
                let productArray = await database.getProducts(req.path);
                res.status(200).send({
                    data: productArray
                })
            })

        app.route('/:collection/:category')
            .get(async (req: Request, res: Response) => {
                let productArray = await database.getProducts(req.path);
                res.status(200).send({
                    data: productArray
                })
            })

        app.route('/:collection')
            .get(async (req: Request, res: Response) => {
                let productArray = await database.getProducts(req.path);
                res.status(200).send({
                    data: productArray
                })
            })











    }





    /*
    private requireAdmin(database: Database) {

        return function(req, res, next) {
            database.verifyAdmin({ req.body.username }, function(err, user) {
              if (err) { return next(err); }
        
              if (!user) { 
                // Do something - the user does not exist
              }
        
              if (!user.admin) { 
                // Do something - the user exists but is no admin user
              }
        
              // Hand over control to passport
              next();
            });
          }
        }
        */



}