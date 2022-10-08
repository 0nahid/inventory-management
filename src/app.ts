import cors from "cors";
import "dotenv/config";
import express, { Application, Request, Response } from "express";
import path from "path";
const app: Application = express();

/* middleware  */
app.use(cors());
app.use(express.json());

/* here will be all the imports routes */
import brandRoute from "./routes/v1/brandRoute";
import catagoryRoute from "./routes/v1/catagoryRoute";
import productRoute from "./routes/v1/productRoute";
import stockRoute from "./routes/v1/stockRoute";
import storeRoute from "./routes/v1/storeRoute";
import supplierRoute from "./routes/v1/supplierRoute";
import userRoute from "./routes/v1/userRoute";

/* here will be the all the routes */
app.get("/", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

/* Here is the User Routes */

app.use("/api/v1/products", productRoute);
app.use("/api/v1/brand", brandRoute);
app.use("/api/v1/store", storeRoute);
app.use("/api/v1/supplier", supplierRoute);
app.use("/api/v1/catagory", catagoryRoute);
app.use("/api/v1/stock", stockRoute);
app.use("/api/v1/", userRoute);

// 404 response
app.all("*", (req: Request, res: Response) => {
  res.status(404).send({
    message: "Not Found",
    status: 404,
  });
});
export { app };
