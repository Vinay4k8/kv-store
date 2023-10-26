import connectToDB from "@/lib/connectToDB"
import { Product } from "@/models/product"



export const GET=async()=>{
    await connectToDB();
    let product=await Product.findById("6535473b7a87265d77c492ba")
    return new Response(JSON.stringify(product))
}