 import express from 'express';
import 'dotenv/config';
import router from './router';
import { connectDb } from './config/db';

const app = express();

connectDb();
//ller datos form
app.use(express.json());

app.use('/', router)


export default app;