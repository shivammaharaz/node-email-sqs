import express from "express";
import cors from "cors";

const app = express();

app.get("/", async (req, res) => {
  res.send("hello");
});

app.listen(3000, () => {
  console.log("app is running on ", 3000);
});
