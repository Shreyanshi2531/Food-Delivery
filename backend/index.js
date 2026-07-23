import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import connectDB from './config/db.js'
import cookieParser from 'cookie-parser'
import authRouter from './routes/auth.routes.js'
import cors from 'cors'
import userRouter from './routes/user.routes.js'
import shopRouter from './routes/shop.routes.js'
import itemRouter from './routes/item.routes.js'
import orderRoutes from "./routes/order.routes.js";
import reviewRouter from "./routes/review.routes.js";
import deliveryRoutes from "./routes/delivery.routes.js";
import notificationRoutes from "./routes/notification.routes.js";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express()

const httpServer = createServer(app);
import { initSocket } from "./socket.js";

const io = initSocket(httpServer);

const PORT = process.env.PORT || 5000

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("join-room", (userId) => {
    socket.join(userId);

    console.log("🏠", socket.id, "joined room", userId);
  });

  socket.on("disconnect", () => {
    console.log(" User disconnected:", socket.id);
  });
});

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/shop", shopRouter)
app.use("/api/item", itemRouter)
app.use("/api/order", orderRoutes);
app.use("/api/review", reviewRouter);
app.use("/api/notification", notificationRoutes);
app.use("/api/delivery", deliveryRoutes);

httpServer.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port ${PORT}`);
});

export { io };