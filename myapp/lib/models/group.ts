import { Document, model, Model, Schema } from 'mongoose';

const GroupSchema: Schema = new Schema({       
    //_id: String,
    active: Boolean,
    featured: Boolean,
    type: String,
    name: String,
    image: String,
    stub: String,
    shop: String,
    category: String,
});

let GroupModel: Model<Group> = model<Group>('Group', GroupSchema);

interface Group extends Document {       
    //_id: string,
    active: boolean,
    featured: boolean,
    type: string,
    name: string,
    image: string,
    stub: string,
    shop: string,
    category: string,
};

export { Group, GroupSchema, GroupModel };