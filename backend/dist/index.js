"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const MenuRoute_1 = __importDefault(require("./routes/MenuRoute"));
const OrderRoute_1 = __importDefault(require("./routes/OrderRoute"));
const PORT = process.env.PORT || 3000;
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => console.log("DB connection done!"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static("../frontend/dist"));
app.use((0, cors_1.default)());
app.use('/api/v1/user/profile', UserRoute_1.default);
app.use('/api/v1/menu', MenuRoute_1.default);
app.use('/api/order', OrderRoute_1.default);
app.use('/api/order/checkout/webhook', express_1.default.raw({ type: "*/*" }));
// app.get('/test', async (req: Request, res: Response) => {
//    // const menu = await getMenu()
//     res.json({ message: "Testing" });
// })
app.listen(PORT, () => {
    console.log("server is running");
});
