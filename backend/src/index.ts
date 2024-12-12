import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRoute from './routes/UserRoute';
import menuRoute from "./routes/MenuRoute";
import orderRoute from "./routes/OrderRoute";
import path from 'path';

const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGODB_URI as string).then(() => console.log("DB connection done!"));

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(cors());

app.get("/health", async (req: Request, res: Response) => {
  res.send({ message: "health OK!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

app.use('/api/v1/user/profile', userRoute);
app.use('/api/v1/menu', menuRoute);
app.use('/api/order', orderRoute);

app.use('/api/order/checkout/webhook', express.raw({ type: "*/*"}));

export function start(): void
{   app.listen(PORT, () => {     console.log(`Server is running on http://localhost:${PORT}`); });
}

