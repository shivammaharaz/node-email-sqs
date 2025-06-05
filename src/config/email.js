import nodemailer from "nodemailer";
import { EMAIL } from "../utils/constants.js";

const transporter = nodemailer.createTransport(EMAIL);

export default transporter;
