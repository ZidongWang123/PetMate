import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/users.js'

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

app.use('/user', userRoutes);

const PORT = 100;
const CONNECTION_URL = process.env.CONNECTION_URL;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => {
        console.log(`Server running on port: ${PORT}`);
        console.log(`Server running on port: ${CONNECTION_URL}`);}
        ))
    .catch((error) => console.log(error.message));

// www.mongodb.com/cloud/atlas