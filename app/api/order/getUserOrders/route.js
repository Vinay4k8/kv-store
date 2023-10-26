import connectToDB from "@/lib/connectToDB";
import { Order } from "@/models/Order"
import { ObjectId } from "mongodb";
import mongoose from "mongoose";

export const POST=async(req)=>{
    await connectToDB()
    const {id}=await req.json();
  
    const mongooseId = new ObjectId(id);
let userId=id
    const orders = await Order.find();
  
    return new Response(JSON.stringify(orders));
}