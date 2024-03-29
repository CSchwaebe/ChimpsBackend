
import mongoose = require('mongoose');
import { Group, GroupModel } from '../models/group';

import { Product, ProductModel } from '../models/product';
import { Home, HomeModel } from '../models/home';
import { UserModel, User } from '../models/user';
import { OrderModel, Order } from '../models/order'
import { Message, MessageModel } from '../models/message';
import { Subscriber, SubscriberModel } from '../models/subscriber';
import { Page, PageModel } from '../models/page';
import { Account, AccountModel } from '../models/account';
import { Style, StyleModel } from '../models/style';


export class Database {

    //variables
    //private databaseUrl: string = 'mongodb://localhost/bko';
    private databaseUrl: string = 'mongodb://localhost:27017/bko';
    //private databaseUrl: string = 'mongodb://' + process.env.MONGO_USERNAME + ':' + process.env.MONGO_PW + '@localhost:27017/bigkat?authSource=bigkat';
    private databaseOptions: Object = { useNewUrlParser: true };

    constructor() {
        mongoose.connect(this.databaseUrl, this.databaseOptions);
    }

    //disconnects from the database
    public disconnect(): boolean {
        mongoose.disconnect();
        console.log('Disconnected from mongoDB')
        return true;
    }



    /////////////////////////////////////////////////////////////////////////////////
    ///             USER
    /////////////////////////////////////////////////////////////////////////////////

    public async findUserById(id, cb) {
        let result = await UserModel.findById(id).exec();
        //console.log('FIND BY ID\n');
        //console.log(result);
        if (result !== null) {
            cb(null, result);
        } else {
            cb(new Error('User ' + id + ' does not exist'));
        }
    }

    public async findUserByUsername(username, cb) {
        let result = await UserModel.findOne({ username: username }).exec();
        //console.log('FIND BY USERNAME\n');
        //console.log(result);
        if (result !== null) {
            return cb(null, result);
        } else {
            return cb(null, null);
        }
    }

    public async verifyAdmin(username, cb) {
        let result = await UserModel.findOne({ username: username }).exec();
        if (result !== null) {
            return cb(null, result);
        } else {
            return cb(null, null);
        }
    }

    public async addUser(user) {
        return new Promise(async function (resolve, reject) {
            let userModel = new UserModel(user);
            userModel.save(function (err, success) {
                if (err) {
                    console.log('Error in Add User')
                    console.log(err)
                    reject(err);
                }
                else {
                    console.log("Success in Add user");
                    console.log(success)
                    resolve(success)
                }
            })
        })
    }


    /////////////////////////////////////////////////////////////////////////////////
    ///             HOME
    /////////////////////////////////////////////////////////////////////////////////


    /**
     * Used to retrieve the images for the HomePage
     * 
     */
    public async getHome(): Promise<Home> {
        return new Promise<Home>((resolve, reject) => {
            HomeModel.findOne().exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results);
            })
        });
    }

    /**
     * Used to initialize the HomePage
     * 
     */
    public async postHome(home: Home) {
        return new Promise(async function (resolve, reject) {
            let homeModel = new HomeModel(home);
            homeModel.save(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to replace the HomePage
    * 
    */
    public async updateHome(home: Home) {
        return new Promise(async function (resolve, reject) {
            HomeModel.findOneAndUpdate({}, home, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            });
        })
    }


    /////////////////////////////////////////////////////////////////////////////////
    ///             Subscribers
    /////////////////////////////////////////////////////////////////////////////////


    /**
     * Used to retrieve all subscribers
     * 
     */
    public async getSubscribers(): Promise<Subscriber[]> {
        return new Promise<Subscriber[]>((resolve, reject) => {
            SubscriberModel.find().exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

    /**
     * Used to add a subscriber to the mailing list
     * 
     */
    public async postSubscriber(subscriber: Subscriber) {

        let c = await new Promise<Subscriber[]>((resolve, reject) => {
            SubscriberModel.find({ email: subscriber.email }).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });

        if (c.length) {
            return null;
        } else {
            return new Promise(async function (resolve, reject) {
                let subscriberModel = new SubscriberModel(subscriber);
                subscriberModel.save(function (err, success) {
                    if (err)
                        reject(err)
                    else
                        resolve(success)
                })
            })
        }

    }

    /**
    * Used to remove a Subscriber from the mailing list
    * 
    */
    public async removeSubscriber(subscriber: Subscriber) {
        return new Promise(async function (resolve, reject) {
            SubscriberModel.findOneAndDelete({ email: subscriber.email }, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            });
        })
    }


    /////////////////////////////////////////////////////////////////////////////////
    ///             HEADERS
    /////////////////////////////////////////////////////////////////////////////////


    /**
    * Used to check the database for a Shop ('Collection' in frontend)
    * 
    * @param shopName - the name of the Shop that we are searching for
    */
    public async getHeader(stub: string): Promise<Group> {
        return new Promise<Group>((resolve, reject) => {
            GroupModel.findOne({ stub: stub }, "name image").exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
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
    public async getGroupByStub(stub: string): Promise<Group> {
        return new Promise<Group>((resolve, reject) => {
            GroupModel.findOne({ stub: stub }).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

    /**
    * Used to check the database for a Group ('Collection')
    * 
    * @param stub - the Location (stub) of the Group that we are searching for
    */
    public async getGroupById(id: string): Promise<Group> {
        return new Promise<Group>((resolve, reject) => {
            GroupModel.findById(id).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }


    /**
    * Used to get the names of all the Groups ('Collections')
    * 
    */
    public async getAllGroups(): Promise<Group[]> {
        return new Promise<Group[]>((resolve, reject) => {
            GroupModel.find().exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });


    }


    /**
     * Used to add a Group to the database ('Collection' in frontend)
     * 
     * @param group - the group that we are adding
     */
    public async postGroup(group: Group) {
        return new Promise<Group>(async function (resolve, reject) {
            let groupModel = new GroupModel(group);

            groupModel.save(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to update a Group ('Collection')
    * 
    * @param group - The Shop we are updating
    */
    public async updateGroup(group: Group) {
        return new Promise<Group>(async function (resolve, reject) {
            GroupModel.findByIdAndUpdate(group._id, group, { new: true }, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }


    /**
    * Used to delete a Group in the database ('Collection' in frontend)
    * 
    * @param shopName - the Group that we are deleting
    */
    public async deactivateGroup(group: Group) {
        return new Promise<Group>(async function (resolve, reject) {
            GroupModel.findByIdAndUpdate(group._id, { active: false }, { new: true }, function (err, success) {
                if (err)
                    reject(err)
                else {
                    resolve(success)
                }

            })
        })
    }

    /**
       * Used to delete a Group in the database ('Collection' in frontend)
       * 
       * @param shopName - the Group that we are deleting
       */
    public async deleteGroup(group: Group) {
        return new Promise<Group>(async function (resolve, reject) {
            GroupModel.findByIdAndRemove(group._id).exec(function (err, success) {
                if (err)
                    reject(err)
                else {
                    resolve(success)
                }

            })
        })
    }

    /////////////////////////////////////////////////////////////////////////////////
    ///             ORDERS
    /////////////////////////////////////////////////////////////////////////////////


    /**
     * Used to add an Order
     * 
     * @param order - The Order we are adding
     */
    public async postOrder(order: Order) {
        return new Promise(async function (resolve, reject) {
            let orderModel = new OrderModel(order);
            orderModel.save(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to update an Order
    * 
    * @param order - The Order we are updating
    */
    public async updateOrder(order: Order) {
        return new Promise(async function (resolve, reject) {
            let orderModel = new OrderModel(order);
            OrderModel.findByIdAndUpdate(order._id, order, { new: true }, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }


    /**
     * Used to get All Orders
     * 
     */
    public async getOrders() {
        return new Promise<Order[]>(async function (resolve, reject) {
            OrderModel.find().sort({ createdAt: -1 }).exec(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }


    /**
     * Used to get Recent Orders
     * 
     */
    public async getRecentOrders() {
        return new Promise<Order[]>(async function (resolve, reject) {
            OrderModel.find().sort({ createdAt: -1 }).limit(50).exec(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }


    /**
     * Used to get Unfulfilled Orders
     * 
     */
    public async getUnfulfilledOrders() {
        return new Promise<Order[]>(async function (resolve, reject) {
            OrderModel.find({ shipped: false }).exec(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to get an Order by its ID
    * 
    */
    public async getOrderById(id) {
        return new Promise<Order>(async function (resolve, reject) {
            OrderModel.findById(id).exec(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
     * Used to get Orders by Email
     * 
     */
    public async getOrderByEmail(email) {
        return new Promise<Order[]>(async function (resolve, reject) {
            OrderModel.find({ 'address.email': email }).exec(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
     * Used to get Orders by Email
     * 
     */
    public async getOrderByPhone(phone) {
        return new Promise<Order[]>(async function (resolve, reject) {
            OrderModel.find({ 'address.phone': phone }).exec(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }




    /////////////////////////////////////////////////////////////////////////////////
    ///             PRODUCTS
    /////////////////////////////////////////////////////////////////////////////////

    /**
     * Used to add a Product
     * 
     * @param product - The Product we are adding
     */
    public async postProduct(product: Product) {
        return new Promise(async function (resolve, reject) {
            let productModel = new ProductModel(product);

            productModel.save(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }


    /**
     * Used to update a Product
     * 
     * @param product - The Product we are updating
     */
    public async updateProduct(product: Product) {
        return new Promise<Product>(async function (resolve, reject) {
            //let productModel = new ProductModel(product);
            ProductModel.findByIdAndUpdate(product._id, product, { new: true }, function (err, success) {
                if (err)
                    reject(err)
                else {
                    resolve(success)
                }

            })
        })
    }

    /**
    * Used to delete a Product
    * 
    * @param product - The Product we are delete
    */
    public async deleteProduct(product: Product) {
        return new Promise<Product>(async function (resolve, reject) {
            ProductModel.findByIdAndRemove(product._id).exec((err, success) => {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to get the names of all the Subcategories within a Category
    * 
    */
    public async getFeaturedProducts(): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            ProductModel.find({ featured: true }).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }


    /**
    * Used to get the names of all the Subcategories within a Category
    * 
    */
    public async getProducts(loc: string): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            //console.log('Get Products - Location then regex \n');
            //console.log(loc);
            let regex = new RegExp(loc.substring(1));
            //console.log(regex);
            ProductModel.find({ location: regex }).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

    /**
    * Used to get the names of all the Subcategories within a Category
    * 
    */
    public async getActiveProducts(loc: string): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            //console.log('Get Products - Location then regex \n');
            //console.log(loc);
            let regex = new RegExp(loc.substring(1));
            //console.log(regex);
            ProductModel.find({ location: regex, active: true }).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

     /**
    * Used to get one random active product (for admin preview page)
    * 
    */
   public async getOneProduct(): Promise<Product> {
    return new Promise<Product>((resolve, reject) => {
        ProductModel.findOne({ active: true }).exec(function (err, results) {
            if (err)
                reject(err)
            else
                resolve(results)
        })
    });
}

    /**
       * Used to get the names of all the Subcategories within a Category
       * 
       */
    public async getAllActiveProducts(): Promise<Product[]> {
        return new Promise<Product[]>((resolve, reject) => {
            ProductModel.find({ active: true }).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }


    /**
    * Used to get the names of all the Subcategories within a Category
    * 
    */
    public async getProduct(stub: string): Promise<Product> {
        return new Promise<Product>((resolve, reject) => {
            //console.log(stub);
            //let regex =  new RegExp(loc.substring(1));
            //console.log(regex);
            ProductModel.findOne({ stub: stub }).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }


    /**
    * Used to get a product by Id
    * 
    */
    public async getProductById(id: string): Promise<Product> {
        return new Promise<Product>((resolve, reject) => {
            ProductModel.findById(id).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

    /**
    * Used to put a product back if Checkout is not completed
    * 
    */
    public async restockProduct(id: string, size: string, quantity: number): Promise<Product> {
        let product: Product = await this.getProductById(id);
        for (let i = 0; i < product.inventory.length; i++) {
            if (product.inventory[i].size === size) {
                product.inventory[i].quantity += quantity;
                break;
            }
        }
        return this.updateProduct(product);
    }

    ///////////////////////////////////////////////////////////////////////
    //                      Messages
    ///////////////////////////////////////////////////////////////////////

    /**
    * Used to add a Message
    * 
    * @param message - The Message we are adding
    */
    public async postMessage(message: Message) {
        return new Promise(async function (resolve, reject) {
            let messageModel = new MessageModel(message);

            messageModel.save(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to update a Message
    * 
    * @param message - The Message we are updating
    */
    public async updateMessage(message: Message) {
        return new Promise(async function (resolve, reject) {
            MessageModel.findByIdAndUpdate(message._id, message, { new: true }, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to add a Message
    * 
    * @param message - The Message we are adding
    */
    public async deleteMessage(message: Message) {
        return new Promise(async function (resolve, reject) {
            MessageModel.findByIdAndDelete(message._id, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /** 
    * 
    * 
    */
    public async getMessages(): Promise<Message[]> {
        return new Promise<Message[]>((resolve, reject) => {
            MessageModel.find().exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

    /** 
       * 
       * 
       */
    public async getMessageById(id: string): Promise<Message> {
        return new Promise<Message>((resolve, reject) => {
            MessageModel.findById(id).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }


    ///////////////////////////////////////////////////////////////////////
    //                      Styles
    ///////////////////////////////////////////////////////////////////////

    /**
    * Used to add a Style
    * 
    * @param style - The Style we are adding
    */
    public async postStyle(style: Style) {
        return new Promise(async function (resolve, reject) {
            let styleModel = new StyleModel(style);

            styleModel.save(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to update a Style
    * 
    * @param style - The Style we are updating
    */
    public async updateStyle(style: Style) {
        return new Promise(async function (resolve, reject) {
            StyleModel.findByIdAndUpdate(style._id, style, { new: true }, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to add a Style
    * 
    * @param style - The Style we are adding
    */
    public async deleteStyle(style: Style) {
        return new Promise(async function (resolve, reject) {
            StyleModel.findByIdAndDelete(style._id, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /** 
    * 
    * 
    */
    public async getStyle(): Promise<Style> {
        return new Promise<Style>((resolve, reject) => {
            StyleModel.findOne().exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

    /** 
    * 
    * 
    */
    public async getStyles(): Promise<Style[]> {
        return new Promise<Style[]>((resolve, reject) => {
            StyleModel.find().exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }



    /** 
       * 
       * 
       */
    public async getStyleById(id: string): Promise<Style> {
        return new Promise<Style>((resolve, reject) => {
            StyleModel.findById(id).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

    ///////////////////////////////////////////////////////////////////////
    //                      Pages
    ///////////////////////////////////////////////////////////////////////

    /**
    * Used to add a Page
    * 
    * @param page - The Page we are adding
    */
    public async postPage(page: Page) {
        return new Promise(async function (resolve, reject) {
            let pageModel = new PageModel(page);

            pageModel.save(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to update a Page
    * 
    * @param page - The Page we are updating
    */
    public async updatePage(page: Page) {
        return new Promise(async function (resolve, reject) {
            PageModel.findByIdAndUpdate(page._id, page, { new: true }, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to add a Page
    * 
    * @param page - The Page we are adding
    */
    public async deletePage(page: Page) {
        return new Promise(async function (resolve, reject) {
            PageModel.findByIdAndDelete(page._id, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /** 
   * 
   * 
   */
    public async getAllPages(): Promise<Page[]> {
        return new Promise<Page[]>((resolve, reject) => {
            PageModel.find().exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

    /** 
    * 
    * 
    */
    public async getPageByStub(stub: string): Promise<Page> {
        return new Promise<Page>((resolve, reject) => {
            PageModel.findOne({ stub: stub }).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }

    /** 
       * 
       * 
       */
    public async getPageById(id: string): Promise<Page> {
        return new Promise<Page>((resolve, reject) => {
            PageModel.findById(id).exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }


    ///////////////////////////////////////////////////////////////////////
    //                      Accounts
    ///////////////////////////////////////////////////////////////////////

    /**
    * Used to add a Page
    * 
    * @param acct - The Page we are adding
    */
    public async postAccount(acct: Account) {
        return new Promise(async function (resolve, reject) {
            let accountModel = new AccountModel(acct);

            accountModel.save(function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /**
    * Used to update a Account
    * 
    * @param acct - The Account we are updating
    */
    public async updateAccount(acct: Account) {
        return new Promise(async function (resolve, reject) {
            AccountModel.findByIdAndUpdate(acct._id, acct, { new: true }, function (err, success) {
                if (err)
                    reject(err)
                else
                    resolve(success)
            })
        })
    }

    /** 
       * 
       * 
       */
    public async getAccount(): Promise<Account> {
        return new Promise<Account>((resolve, reject) => {
            AccountModel.findOne().exec(function (err, results) {
                if (err)
                    reject(err)
                else
                    resolve(results)
            })
        });
    }








}