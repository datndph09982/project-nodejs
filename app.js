import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import expressValidator from 'express-validator';
import expressJwt from 'express-jwt';
// import mongoose from 'mongoose';
import productRouter from './routes/product';
import categoryRouter from './routes/category';
import authRouter from './routes/auth';
import userRouter from './routes/user';
import newRouter from './routes/new';
import contactRouter from './routes/contact';
const app = express();
dotenv.config();
app.use(bodyParser.json())
app.use(cors({credentials:'same-origin'}));
app.use(expressValidator());
app.use(express.json())
// app.use('/api', expressJwt({secret: secret}));
//Routes
app.use(morgan('dev'));
app.use('/api',productRouter);
app.use('/api',categoryRouter);
app.use('/api',authRouter);
app.use('/api',userRouter);
app.use('/api',newRouter);
app.use('/api',contactRouter);
// Connection
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useCreateIndex: true 
}).then(()=>console.log('DB Connected'));

mongoose.connection.on('Error',err =>{
    console.log(`DB connection error:${err.message}`)
})

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log('Server is running on port', port)
 })

