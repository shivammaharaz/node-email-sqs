import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler.js";
import connection from "./config/database.js";
import router from "./routes/emailRoutes.js";
import consumer from "./consumer.js";
import { port } from "./utils/constants.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  res.sendFile("./public/index.html");
});

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
  console.log("app is running on ", port);
});
