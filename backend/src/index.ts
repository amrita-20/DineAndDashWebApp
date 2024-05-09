import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

const port = 3000;
console.log("MongoDB URI:", process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI as string).then(() => console.log("DB connection done!"));

const app = express();
app.use(express.json());
app.use(cors());


app.get('/test', (req: Request, res: Response) => {
    res.json({ message: "first call" });
})

app.listen(port, () => {
    console.log("server is running");
})