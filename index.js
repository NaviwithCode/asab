import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors"
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productsRoutes.js'
import orderRouter from "./routes/orderRoute.js";
import path from "path";
import { fileURLToPath } from "url";
// import addressRouter from './routes/addressRoutes.js'
// import paymentRoutes from './routes/paymentRoutes.js'
// import addressRouter from './routes/address.js'
// import createRouter from './routes/CreateOrder.js'
// import orderRoute from './routes/orderRoute.js'
// import orderRouter from './routes/order.js'
// import orderRouter from './routes/order.js'
// import orderRoute from './routes/orderRoutes.js'
// import orderRouter from './routes/orderRoutes.js'

//configure env
dotenv.config();
// rest object
const app = express();

// databse config
connectDB();

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// middelwares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors())
app.use(express.static(path.join(__dirname,"./client/build")))

// routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category",categoryRoute)
app.use("/api/v1/product",productRoute)
app.use('/api/v1/order',orderRouter)
// app.use('/api/v1/address',addressRouter)
// app.use("/api/v1/order",paymentRoutes)
// app.use('/api/v1/address',addressRouter)
// app.use('/api/v1/createorder',createRouter)
// app.use('/api/v1/order',orderRoute)
// app.use("/api/v1/orders", orderRouter);
// app.use("/api/v1/order",orderRoute)
// app.use("/api/v1/order",orderRouter)

// rest api
// app.get("/", (req, res) => {
//   res.send({
//     message: "welcome to mva group",
//   });
// });
// app.use("*",function(req,res){
//   res.sendFile(path.join(__dirname,"./client/build/index.html"))
// })
// port
const PORT = process.env.PORT || 8000;

// run listen
app.listen(PORT, () => {
  console.log(`server running on ${PORT}`);
});
