import { Category } from "@/models/category"


export const GET=async()=>{
    let categories=await Category.find().sort({createdAt:-1});
    return new Response(JSON.stringify(categories))
}