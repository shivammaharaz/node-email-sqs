import mongoose from "mongoose";
import { DB } from "../utils/constants.js";

export default mongoose
  .connect(DB.dbUrl, DB.options)
  .then((connected) => {
    console.log("db connected successfully");
  })
  .catch((err) => {
    console.log("error connecting database", err);
  });
