import mongoose,{Schema, model, models} from "mongoose";
const ProductSchema=new Schema({
    title:{type:String,required:true},
    category:{type:mongoose.Types.ObjectId,ref:"category",required:true},
    description:{type:String},
    price:{type:Number,required:true},
    images:{type:[{fileKey:String,fileUrl:String}],},
    properties:{type:Object},

},{timestamps:true})

export const Product= models.product ||model('product',ProductSchema);