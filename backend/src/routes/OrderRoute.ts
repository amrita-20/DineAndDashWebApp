import express from "express";
import { jwtCheck, jwtParse } from "../middleware/auth";
import OrderController from "../controller/OrderController";

const router = express.Router();

//router.get('/', jwtCheck, jwtParse, OrderController.getOrders);

router.post(
  "/checkout/create-checkout-session",
  jwtCheck,
  jwtParse,
  OrderController.createCheckoutSession
);

router.post("/checkout/webhook", OrderController.stripeWebhookHandler);

router.get("/", jwtCheck, jwtParse, OrderController.getMyOrders);

router.get("/all", jwtCheck, jwtParse, OrderController.getAllOrders);

router.patch(
  "/:orderId/status",
  jwtCheck,
  jwtParse,
  OrderController.updateOrderStatus
);

export default router;
