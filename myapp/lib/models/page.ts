import { Document, model, Model, Schema } from 'mongoose';


const MenuSchema: Schema = new Schema({       
    location: String,
    level: String,
    shop: String,
    category: String,
});

const PageSchema: Schema = new Schema({       
    title: String,
    stub: String,
    blocks:  [Schema.Types.Mixed],
    menu: MenuSchema
}, { timestamps: true });

let PageModel: Model<Page> = model<Page>('Page', PageSchema);

interface Page extends Document {       
    //_id: string,
    title: string,
    stub: string,
    blocks: any[];
};

interface Menu extends Document {
    location: string,
    level: string,
    shop?: string,
    category?: string,
}

export { Page, PageModel, PageSchema, Menu, MenuSchema };