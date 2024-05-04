import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from '../api/routes/userRoute.js';
import authRoute from '../api/routes/authRouth.js'
dotenv.config()

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log('mongodb connection established')
}).catch((err) => {
    console.log(err);
});

const app = express();

app.use(express.json());

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)


app.listen(4000, () => {
    console.log('Server listening on port 4000')
} );

