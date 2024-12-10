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
exports.start = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const UserRoute_1 = __importDefault(require("./routes/UserRoute"));
const MenuRoute_1 = __importDefault(require("./routes/MenuRoute"));
const OrderRoute_1 = __importDefault(require("./routes/OrderRoute"));
const path_1 = __importDefault(require("path"));
const PORT = process.env.PORT || 3000;
mongoose_1.default.connect(process.env.MONGODB_URI).then(() => console.log("DB connection done!"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, cors_1.default)());
app.get("/health", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send({ message: "health OK!" });
}));
app.use('/api/v1/user/profile', UserRoute_1.default);
app.use('/api/v1/menu', MenuRoute_1.default);
app.use('/api/order', OrderRoute_1.default);
app.use('/api/order/checkout/webhook', express_1.default.raw({ type: "*/*" }));
function start() {
    app.listen(PORT, () => { console.log(`Server is running on http://localhost:${PORT}`); });
}
exports.start = start;
