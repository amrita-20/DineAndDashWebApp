import Stripe from "stripe";
import { Request, Response } from "express";
import Order from "../models/orders";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string);
const FRONTEND_URL = process.env.FRONTEND_URL as string;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET as string;

type CheckoutSessionRequest = {
    cartItems: {
      dishId: string;
      name: string;
      quantity: string;
      price: number
    }[];
    deliveryDetails: {
      email: string;
      name: string;
      phone: number;
      addresses: [];
    };
  };

  const createLineItems = (checkoutSessionReq: CheckoutSessionRequest) => {
    const lineItems = checkoutSessionReq.cartItems.map((cartItem) => {
  
      const line_item: Stripe.Checkout.SessionCreateParams.LineItem = {
        price_data: {
          currency: "$",
          unit_amount: cartItem.price,
          product_data: {
            name: cartItem.name,
          },
        },
        quantity: parseInt(cartItem.quantity),
      };
  
      return line_item;
    });
  
    return lineItems;
  }

  const createSession =  async (
    lineItems: Stripe.Checkout.SessionCreateParams.LineItem[],
    orderId: string,
    deliveryPrice: number
  ) => {
    const sessionData = await STRIPE.checkout.sessions.create({
      line_items: lineItems,
      shipping_options: [
        {
          shipping_rate_data: {
            display_name: "Delivery",
            type: "fixed_amount",
            fixed_amount: {
              amount: deliveryPrice,
              currency: "$",
            },
          },
        },
      ],
      mode: "payment",
      metadata: {
        orderId
      },
      success_url: `${FRONTEND_URL}/order-status?success=true`,
      cancel_url: `${FRONTEND_URL}/detail?cancelled=true`,
    });
  
    return sessionData;

  }

const createCheckoutSession = async (req: Request, res: Response) => {
    try{
      const checkoutSessionRequest: CheckoutSessionRequest = req.body;
      const lineItems = createLineItems(checkoutSessionRequest);

      const newOrder = new Order({
        user: req.userId,
        status: "placed",
        deliveryDetails: checkoutSessionRequest.deliveryDetails,
        cartItems: checkoutSessionRequest.cartItems,
        createdAt: new Date(),
      });
  
      const session = await createSession(
        lineItems,
        newOrder._id.toString(),
          20   //deliveryPrice update later
      );
      if(!session.url){
        return res.status(500).json({message: "error occur while creating stripe session"});
      }
      await newOrder.save();
      res.json({uel : session.url});

    }catch(error: any){
        console.log(error);
        res.status(500).json({message: error.raw.message})
    }
}

const stripeWebhookHandler = async (req: Request, res: Response) => {

  // console.log("Received event");
  // console.log("==============");
  // console.log("event: ", req.body);
  // res.send();


  let event;

  try {
    const sig = req.headers["stripe-signature"];
    event = STRIPE.webhooks.constructEvent(
      req.body,
      sig as string,
      STRIPE_ENDPOINT_SECRET
    );
  } catch (error: any) {
    console.log(error);
    return res.status(400).send(`Webhook error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const order = await Order.findById(event.data.object.metadata?.orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.totalAmount = event.data.object.amount_total;
    order.status = "paid";

    await order.save();
  }

  res.status(200).send();
};

const getOrders = async (req: Request, res: Response) => {
    try{
        const checkoutSessionReq : CheckoutSessionRequest = req.body;
    } catch(error) {

    }
}

export default {
  createCheckoutSession,
  stripeWebhookHandler
}