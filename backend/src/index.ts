import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/UserRoute';
//import { getMenu } from '../models/dishes';


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

app.listen(port, () => {
    console.log("server is running");
})