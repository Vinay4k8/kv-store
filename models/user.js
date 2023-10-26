import mongoose,{models,model,Schema} from "mongoose";

const UserSchema=new Schema({
    name:String,
    email:String,
    image:String,

})

export const User=models.user || model('user',UserSchema);