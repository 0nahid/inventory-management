"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
exports.app = app;
/* middleware  */
app.use((0, cors_1.default)());
app.use(express_1.default.json());
/* here will be all the imports routes */
const brandRoute_1 = __importDefault(require("./routes/v1/brandRoute"));
const catagoryRoute_1 = __importDefault(require("./routes/v1/catagoryRoute"));
const productRoute_1 = __importDefault(require("./routes/v1/productRoute"));
const stockRoute_1 = __importDefault(require("./routes/v1/stockRoute"));
const storeRoute_1 = __importDefault(require("./routes/v1/storeRoute"));
const supplierRoute_1 = __importDefault(require("./routes/v1/supplierRoute"));
/* here will be the all the routes */
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
/* Here is the User Routes */
app.use("/api/v1/products", productRoute_1.default);
app.use("/api/v1/brand", brandRoute_1.default);
app.use("/api/v1/store", storeRoute_1.default);
app.use("/api/v1/supplier", supplierRoute_1.default);
app.use("/api/v1/catagory", catagoryRoute_1.default);
app.use("/api/v1/stock", stockRoute_1.default);
// 404 response
app.all("*", (req, res) => {
    res.status(404).send({
        message: "Not Found",
        status: 404,
    });
});
