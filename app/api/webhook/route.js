import { text,json,raw } from 'micro';
import Stripe from 'stripe';
import { headers } from 'next/headers'
import { Order } from '@/models/Order';
import connectToDB from '@/lib/connectToDB';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// export const headers = {
//   'Content-Type': 'application/json',
// };

export const POST= async (req, res) => {
  await connectToDB()

  const body = await req.text();
  const sig = headers().get('Stripe-Signature') ;

    let event;
    // console.log(body,endpointSecret,sig);
  
    try {
      event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
    } catch (err) {
      console.error(`Webhook Error: ${err},\n\nbuf${buf}buf`);
      return new Response(`Webhook Error: ${err.message}`,{ status:400});
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const data = event.data.object;
        let id=data.metadata.orderId
        console.log(id,data)
        const res = await Order.findByIdAndUpdate(id, { paid: true });

        // Define and call a function to handle the event payment_intent.succeeded
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    // return res.status(200).end();
    return new Response("ok hell yeah",{status:200})
 
};


//gems-gusto-oasis-rapid
//4242 4242 4242 4242


