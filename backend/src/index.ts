import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/UserRoute';
import menuRoute from "./routes/MenuRoute";
import orderRoute from "./routes/OrderRoute";

const PORT = process.env.PORT || 3000;
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI as string).then(() => console.log("DB connection done!"));

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/v1/user/profile', userRoute);
app.use('/api/v1/menu', menuRoute);
app.use('/api/order', orderRoute);

app.use('/api/order/checkout/webhook', express.raw({ type: "*/*"}));

// app.get('/test', async (req: Request, res: Response) => {
//    // const menu = await getMenu()
//     res.json({ message: "Testing" });
// })

app.listen(PORT, () => {
    console.log("server is running");
})