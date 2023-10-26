
import { Order } from '@/models/Order';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SK)

export const POST=async(req)=>{
    const {cartProducts,orderInfo}=await req.json();
    let line_items=cartProducts.map((product)=>{
        return {
            quantity:product.quantity,
            price_data:{
                currency:"INR",
                product_data:{name:product.title},
                unit_amount: product.price*100

            }
        }
    })
    let res=await Order.create({line_items,...orderInfo,paid:false});
    const session = await stripe.checkout.sessions.create({
        line_items: line_items,
        mode: 'payment',
        success_url:process.env.successUrl,
        cancel_url:process.env.cancelUrl,
        customer_email: orderInfo.email,
        metadata:{orderId:res._id.toString()}
      });
    
    return new Response(JSON.stringify({url:session.url,res}))
}

