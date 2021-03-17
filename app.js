import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
const app = express();
dotenv.config();

app.use(morgan('dev'));

app.use('/api',productRouter);
app.use('/api',categoryRouter);
// Connection
// mongoose.connect(process.env.MONGO_URL,{
//     useNewUrlParser: true,
//     createIndex: true 
// }).then(()=>console.log('DB Connected'));
// mongoose.connection.on('error',err =>{
//     console.log(`DB connection error:${err.message}`)
// })
const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running on port', port)
 })

