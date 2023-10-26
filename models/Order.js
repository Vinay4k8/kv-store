import mongoose, {Schema,models,model} from "mongoose";


const OrderSchema=new Schema({
    line_items:Object,
    name:String,email:String,city:String,postalcode:String,
    streetAddress:String,country:String,paid:Boolean,
    userId:{type:mongoose.Types.ObjectId, ref:'user'},

},{timestamps:true})


export const Order=models?.order || model("order",OrderSchema);

