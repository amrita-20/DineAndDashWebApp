"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const OrderController_1 = __importDefault(require("../controller/OrderController"));
const router = express_1.default.Router();
//router.get('/', jwtCheck, jwtParse, OrderController.getOrders);
router.post("/checkout/create-checkout-session", auth_1.jwtCheck, auth_1.jwtParse, OrderController_1.default.createCheckoutSession);
router.post("/checkout/webhook", OrderController_1.default.stripeWebhookHandler);
router.get("/", auth_1.jwtCheck, auth_1.jwtParse, OrderController_1.default.getMyOrders);
router.get("/all", auth_1.jwtCheck, auth_1.jwtParse, OrderController_1.default.getAllOrders);
router.patch("/:orderId/status", auth_1.jwtCheck, auth_1.jwtParse, OrderController_1.default.updateOrderStatus);
exports.default = router;
