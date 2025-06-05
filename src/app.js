import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import connection from "./config/database.js";
import router from "./routes/emailRoutes.js";
import consumer from "./consumer.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(errorHandler);

app.get("/", async (req, res) => {
  res.send("hello");
});

app.use(router);

app.listen(3000, () => {
  console.log("app is running on ", 3000);
});
