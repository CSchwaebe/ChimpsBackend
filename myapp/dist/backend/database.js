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
const mongoose = require("mongoose");
const group_1 = require("../models/group");
const product_1 = require("../models/product");
const home_1 = require("../models/home");
const user_1 = require("../models/user");
const order_1 = require("../models/order");
const message_1 = require("../models/message");
const subscriber_1 = require("../models/subscriber");
class Database {
    constructor() {
        //variables
        this.databaseUrl = 'mongodb://localhost:27017/bko';
        //private databaseUrl: string = 'mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PW + '@localhost:27017/bigkat?authSource=bigkat';
        this.databaseOptions = { useNewUrlParser: true };
        mongoose.connect(this.databaseUrl, this.databaseOptions);
    }
    //disconnects from the database
    disconnect() {
        mongoose.disconnect();
        console.log('Disconnected from mongoDB');
        return true;
    }
    /////////////////////////////////////////////////////////////////////////////////
    ///             USER
    /////////////////////////////////////////////////////////////////////////////////
    findUserById(id, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield user_1.UserModel.findById(id).exec();
            console.log('FIND BY ID\n');
            console.log(result);
            if (result !== null) {
                cb(null, result);
            }
            else {
                cb(new Error('User ' + id + ' does not exist'));
            }
        });
    }
    findUserByUsername(username, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield user_1.UserModel.findOne({ username: username }).exec();
            console.log('FIND BY USERNAME\n');
            console.log(result);
            if (result !== null) {
                return cb(null, result);
            }
            else {
                return cb(null, null);
            }
        });
    }
    verifyAdmin(username, cb) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield user_1.UserModel.findOne({ username: username }).exec();
            if (result !== null) {
                return cb(null, result);
            }
            else {
                return cb(null, null);
            }
        });
    }
    addUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    let userModel = new user_1.UserModel(user);
                    userModel.save(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /////////////////////////////////////////////////////////////////////////////////
    ///             HOME
    /////////////////////////////////////////////////////////////////////////////////
    /**
     * Used to retrieve the images for the HomePage
     *
     */
    getHome() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                home_1.HomeModel.findOne().exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
     * Used to initialize the HomePage
     *
     */
    postHome(home) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    let homeModel = new home_1.HomeModel(home);
                    homeModel.save(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
    * Used to replace the HomePage
    *
    */
    updateHome(home) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    home_1.HomeModel.findOneAndUpdate({}, home, function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /////////////////////////////////////////////////////////////////////////////////
    ///             Subscribers
    /////////////////////////////////////////////////////////////////////////////////
    /**
     * Used to retrieve all subscribers
     *
     */
    getSubscribers() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                subscriber_1.SubscriberModel.find().exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
     * Used to add a subscriber to the mailing list
     *
     */
    postSubscriber(subscriber) {
        return __awaiter(this, void 0, void 0, function* () {
            let c = yield new Promise((resolve, reject) => {
                subscriber_1.SubscriberModel.find({ email: subscriber.email }).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
            if (c.length) {
                return null;
            }
            else {
                return new Promise(function (resolve, reject) {
                    return __awaiter(this, void 0, void 0, function* () {
                        let subscriberModel = new subscriber_1.SubscriberModel(subscriber);
                        subscriberModel.save(function (err, success) {
                            if (err)
                                reject(err);
                            else
                                resolve(success);
                        });
                    });
                });
            }
        });
    }
    /**
    * Used to remove a Subscriber from the mailing list
    *
    */
    removeSubscriber(subscriber) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    subscriber_1.SubscriberModel.findOneAndDelete({ email: subscriber.email }, function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /////////////////////////////////////////////////////////////////////////////////
    ///             HEADERS
    /////////////////////////////////////////////////////////////////////////////////
    /**
    * Used to check the database for a Shop ('Collection' in frontend)
    *
    * @param shopName - the name of the Shop that we are searching for
    */
    getHeader(stub) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                group_1.GroupModel.findOne({ stub: stub }, "name image").exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /////////////////////////////////////////////////////////////////////////////////
    ///             New COllections 
    /////////////////////////////////////////////////////////////////////////////////
    /**
    * Used to check the database for a Group ('Collection')
    *
    * @param stub - the Location (stub) of the Group that we are searching for
    */
    getGroupByStub(stub) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                group_1.GroupModel.findOne({ stub: stub }).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
    * Used to check the database for a Group ('Collection')
    *
    * @param stub - the Location (stub) of the Group that we are searching for
    */
    getGroupById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                group_1.GroupModel.findById(id).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
    * Used to get the names of all the Groups ('Collections')
    *
    */
    getAllGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                group_1.GroupModel.find().exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
     * Used to add a Group to the database ('Collection' in frontend)
     *
     * @param group - the group that we are adding
     */
    postGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    let groupModel = new group_1.GroupModel(group);
                    groupModel.save(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
    * Used to update a Group ('Collection')
    *
    * @param group - The Shop we are updating
    */
    updateGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    group_1.GroupModel.findByIdAndUpdate(group._id, group, { new: true }, function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
    * Used to delete a Group in the database ('Collection' in frontend)
    *
    * @param shopName - the Group that we are deleting
    */
    deactivateGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    group_1.GroupModel.findByIdAndUpdate(group._id, { active: false }, { new: true }, function (err, success) {
                        if (err)
                            reject(err);
                        else {
                            resolve(success);
                        }
                    });
                });
            });
        });
    }
    /**
       * Used to delete a Group in the database ('Collection' in frontend)
       *
       * @param shopName - the Group that we are deleting
       */
    deleteGroup(group) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    group_1.GroupModel.findByIdAndRemove(group._id).exec(function (err, success) {
                        if (err)
                            reject(err);
                        else {
                            resolve(success);
                        }
                    });
                });
            });
        });
    }
    /////////////////////////////////////////////////////////////////////////////////
    ///             ORDERS
    /////////////////////////////////////////////////////////////////////////////////
    /**
     * Used to add an Order
     *
     * @param order - The Order we are adding
     */
    postOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    let orderModel = new order_1.OrderModel(order);
                    orderModel.save(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
    * Used to update an Order
    *
    * @param order - The Order we are updating
    */
    updateOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    let orderModel = new order_1.OrderModel(order);
                    order_1.OrderModel.findByIdAndUpdate(order._id, order, { new: true }, function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
     * Used to get Recent Orders
     *
     */
    getRecentOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    order_1.OrderModel.find().sort({ createdAt: -1 }).limit(50).exec(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
     * Used to get Unfulfilled Orders
     *
     */
    getUnfulfilledOrders() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    order_1.OrderModel.find({ shipped: false }).exec(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
    * Used to get an Order by its ID
    *
    */
    getOrderById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    order_1.OrderModel.findById(id).exec(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
     * Used to get Orders by Email
     *
     */
    getOrderByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    order_1.OrderModel.find({ 'address.email': email }).exec(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
     * Used to get Orders by Email
     *
     */
    getOrderByPhone(phone) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    order_1.OrderModel.find({ 'address.phone': phone }).exec(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /////////////////////////////////////////////////////////////////////////////////
    ///             PRODUCTS
    /////////////////////////////////////////////////////////////////////////////////
    /**
     * Used to add a Product
     *
     * @param product - The Product we are adding
     */
    postProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    let productModel = new product_1.ProductModel(product);
                    productModel.save(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
     * Used to update a Product
     *
     * @param product - The Product we are updating
     */
    updateProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    //let productModel = new ProductModel(product);
                    product_1.ProductModel.findByIdAndUpdate(product._id, product, { new: true }, function (err, success) {
                        if (err)
                            reject(err);
                        else {
                            console.log(success);
                            resolve(success);
                        }
                    });
                });
            });
        });
    }
    /**
    * Used to delete a Product
    *
    * @param product - The Product we are delete
    */
    deleteProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    product_1.ProductModel.findByIdAndRemove(product._id).exec((err, success) => {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
    * Used to get the names of all the Subcategories within a Category
    *
    */
    getFeaturedProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                product_1.ProductModel.find({ featured: true }).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
    * Used to get the names of all the Subcategories within a Category
    *
    */
    getProducts(loc) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                //console.log('Get Products - Location then regex \n');
                //console.log(loc);
                let regex = new RegExp(loc.substring(1));
                console.log(regex);
                product_1.ProductModel.find({ location: regex }).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
    * Used to get the names of all the Subcategories within a Category
    *
    */
    getActiveProducts(loc) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                //console.log('Get Products - Location then regex \n');
                //console.log(loc);
                let regex = new RegExp(loc.substring(1));
                //console.log(regex);
                product_1.ProductModel.find({ location: regex, active: true }).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
       * Used to get the names of all the Subcategories within a Category
       *
       */
    getAllActiveProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                product_1.ProductModel.find({ active: true }).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
    * Used to get the names of all the Subcategories within a Category
    *
    */
    getProduct(stub) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                //console.log(stub);
                //let regex =  new RegExp(loc.substring(1));
                //console.log(regex);
                product_1.ProductModel.findOne({ stub: stub }).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
    * Used to get a product by Id
    *
    */
    getProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                product_1.ProductModel.findById(id).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
    * Used to put a product back if Checkout is not completed
    *
    */
    restockProduct(id, size, quantity) {
        return __awaiter(this, void 0, void 0, function* () {
            let product = yield this.getProductById(id);
            for (let i = 0; i < product.inventory.length; i++) {
                if (product.inventory[i].size === size) {
                    product.inventory[i].quantity += quantity;
                    break;
                }
            }
            return this.updateProduct(product);
        });
    }
    ///////////////////////////////////////////////////////////////////////
    //                      Messages
    ///////////////////////////////////////////////////////////////////////
    /**
    * Used to add a Message
    *
    * @param message - The Message we are adding
    */
    postMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    let messageModel = new message_1.MessageModel(message);
                    messageModel.save(function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
    * Used to update a Message
    *
    * @param message - The Message we are updating
    */
    updateMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    message_1.MessageModel.findByIdAndUpdate(message._id, message, { new: true }, function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
    * Used to add a Message
    *
    * @param message - The Message we are adding
    */
    deleteMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(function (resolve, reject) {
                return __awaiter(this, void 0, void 0, function* () {
                    message_1.MessageModel.findByIdAndDelete(message._id, function (err, success) {
                        if (err)
                            reject(err);
                        else
                            resolve(success);
                    });
                });
            });
        });
    }
    /**
    *
    *
    */
    getMessages() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                message_1.MessageModel.find().exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
    /**
       *
       *
       */
    getMessageById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                message_1.MessageModel.findById(id).exec(function (err, results) {
                    if (err)
                        reject(err);
                    else
                        resolve(results);
                });
            });
        });
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map