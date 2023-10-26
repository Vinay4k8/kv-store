import connectToDB from "@/lib/connectToDB"
import { Product } from "@/models/product"



export const GET=async()=>{
    await connectToDB();
    let products=await Product.find().sort({createdAt:-1})
    return new Response(JSON.stringify(products))
}