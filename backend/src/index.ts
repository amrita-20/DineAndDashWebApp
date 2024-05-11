import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import { getMenu } from '../models/dishes';
import { runCartTest } from '../models/cart';


const port = 3000;
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI as string).then(() => console.log("DB connection done!"));

const app = express();
app.use(express.json());
app.use(cors());


runCartTest()

//TEST
app.post('/cart', async (req: Request, res: Response) => {

})

app.get('/menu', async (req: Request, res: Response) => {
    const menu = await getMenu()
    res.json({ menu });
})

app.listen(port, () => {
    console.log("server is running");
})