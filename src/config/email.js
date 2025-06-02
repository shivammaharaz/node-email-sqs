import nodemailer from "nodemailer";
import { EMAIL } from "../utils/constants";

const transporter = nodemailer.createTransport(EMAIL);

export default transporter;
