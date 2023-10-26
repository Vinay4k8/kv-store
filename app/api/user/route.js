import { User } from "@/models/user";



export const POST=async(req)=>{
  
    const {email}=await req.json();
    
    const user=await User.find({email});
    return new Response(JSON.stringify(user[0]));
}