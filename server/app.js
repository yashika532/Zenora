import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // Allow requests from your frontend's origin
  credentials: true // Allow cookies and other credentials to be sent
}));

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true}));
app.use(express.static("public"));
app.use(cookieParser());

import AuthRoutes from './Routes/user.js';
app.use('/auth', AuthRoutes);
import videoRoutes from './Routes/video.js';
app.use('/api', videoRoutes);
import commentRoutes from './Routes/comment.js';
app.use('/commentApi', commentRoutes);
import subscribeRoutes from './Routes/subscribe.js'
app.use('/api/subscription' ,subscribeRoutes);

export { app };
