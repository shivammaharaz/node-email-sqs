import express from "express";
import { sendMail } from "../controllers/emailController";

const router = express.Router;

router.post("/sendEmail", sendMail);

export default router;
