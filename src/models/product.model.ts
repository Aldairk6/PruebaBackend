import mongoose, { Schema } from "mongoose";

const productSchema: Schema = new Schema({
    name : { type:String, require: true },
    category : { type:String, require: true, enum: ['electronics', 'grocery_store'] }
}, {collection: 'Product'})

export default mongoose.model('Product',productSchema)