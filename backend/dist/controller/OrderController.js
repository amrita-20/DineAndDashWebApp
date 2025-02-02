"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const orders_1 = __importDefault(require("../models/orders"));
const STRIPE = new stripe_1.default(process.env.STRIPE_API_KEY);
const FRONTEND_URL = process.env.FRONTEND_URL;
const STRIPE_ENDPOINT_SECRET = process.env.STRIPE_WEBHOOK_SECRET;
const createLineItems = (checkoutSessionReq) => {
    //console.log("cartitem fee" , parseInt(checkoutSessionReq.cartItems[0].price))
    const lineItems = checkoutSessionReq.cartItems.map((cartItem) => {
        const line_item = {
            price_data: {
                currency: "usd",
                unit_amount: Math.round(cartItem.price * 100),
                product_data: {
                    name: cartItem.name,
                },
            },
            quantity: parseInt(cartItem.quantity),
        };
        return line_item;
    });
    return lineItems;
};
const createSession = (lineItems, orderId, deliveryPrice) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionData = yield STRIPE.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: Math.round(deliveryPrice * 100),
                        currency: "usd",
                    },
                },
            },
        ],
        mode: "payment",
        metadata: {
            orderId,
        },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail?cancelled=true`,
    });
    return sessionData;
});
const createCheckoutSession = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkoutSessionRequest = req.body;
        const lineItems = createLineItems(checkoutSessionRequest);
        console.log("delivery fee", checkoutSessionRequest.deliveryFee);
        const newOrder = new orders_1.default({
            user: req.userId,
            status: "placed",
            deliveryDetails: checkoutSessionRequest.deliveryDetails,
            cartItems: checkoutSessionRequest.cartItems,
            deliveryFee: checkoutSessionRequest.deliveryFee,
            createdAt: new Date(),
        });
        const session = yield createSession(lineItems, newOrder._id.toString(), newOrder.deliveryFee);
        if (!session.url) {
            return res
                .status(500)
                .json({ message: "error occur while creating stripe session" });
        }
        yield newOrder.save();
        res.json({ url: session.url });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: error.raw.message });
    }
});
const stripeWebhookHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let event;
    try {
        const sig = req.headers["stripe-signature"];
        event = STRIPE.webhooks.constructEvent(req.body, sig, STRIPE_ENDPOINT_SECRET);
    }
    catch (error) {
        console.log(error);
        return res.status(400).send(`Webhook error: ${error.message}`);
    }
    if (event.type === "checkout.session.completed") {
        const order = yield orders_1.default.findById((_a = event.data.object.metadata) === null || _a === void 0 ? void 0 : _a.orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        order.totalAmount = event.data.object.amount_total;
        order.status = "paid";
        yield order.save();
    }
    res.status(200).send();
});
const getMyOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_1.default.find({ user: req.userId }).populate("user");
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_1.default.find();
        res.json(orders);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
});
const updateOrderStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        const order = yield orders_1.default.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "order not found" });
        }
        order.status = status;
        yield order.save();
        res.status(200).json(order);
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: "unable to update order status" });
    }
});
exports.default = {
    createCheckoutSession,
    stripeWebhookHandler,
    getMyOrders,
    getAllOrders,
    updateOrderStatus,
};
