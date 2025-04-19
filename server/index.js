import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { connectDb } from './database/connectDb.js';
import router from './route/user.route.js'; // corrected the typo here

dotenv.config();

const app = express();
connectDb();
const PORT = process.env.PORT || 3000;

// middleware start
app.use(cookieParser()); // added missing parentheses
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api/v1/", router);

app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`); 
});
