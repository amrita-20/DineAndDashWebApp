import 'dotenv/config';

import express, { Request, Response } from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRoute from './routes/UserRoute';
//import { getMenu } from '../models/dishes';
import { updateCart, getUserCart, calculateTotal, sendToOrder } from './controller/CartController';


const port = 3000;
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI as string).then(() => console.log("DB connection done!"));

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/v1/user/profile', userRoute);

// app.get('/test', async (req: Request, res: Response) => {
//    // const menu = await getMenu()
//     res.json({ message: "Testing" });
// })

const userId2 = "663d6e6c7643576b26aa5499"; // Alice
const dishId2 = "663d80b7f6597992c77971d3";
const operator = "+";
// updateCart(userId2, dishId2, operator);
// getUserCart(userId2)
// calculateTotal(userId2)
// sendToOrder(userId2)

app.listen(port, () => {
    console.log("server is running");
})