import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import postRouter from './routes/post.route.js';
import commentRouter from './routes/comment.route.js';
import cookieParser from "cookie-parser";
import path from 'path';
import applicationRoutes from './routes/application.route.js'; 

dotenv.config();


mongoose.connect(
    process.env.MONGODB_URI
  ).then(() => {
      console.log("MongoDB is Connected"); 
  }).catch(err => {
      console.log(err);
  });


  const __dirname = path.resolve();
  

const app = express();
app.use(express.json());
app.use(cookieParser());


app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


app.use('/api/user',userRoutes);
app.use('/api/auth',authRouter);
app.use('/api/post',postRouter);
app.use('/api/comment',commentRouter);

app.use(express.static(path.join(__dirname,'/client/dist')));

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message =err.message ||"Internal server error";
    res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})



// app.use('/api', applicationRoutes);

const PORT = process.env.PORT || 5000;

