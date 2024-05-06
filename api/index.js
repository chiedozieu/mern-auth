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

// middleware 
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success: false, 
        message,
        statusCode,
    })
})


app.listen(3000, () => {
    console.log('Server listening on port 3000')
} );

