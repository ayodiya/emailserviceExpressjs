import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

// database function
import connectDB from "./config/db";

dotenv.config();

// connect to database
connectDB();

const app = express();

//import routes
import userRoutes from "./routes/userRoutes";
import messageRoutes from "./routes/messageRoutes";
// Init Middleware
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

// routes
app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
