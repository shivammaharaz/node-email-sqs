import transporter from "../config/email.js";
import { createdLog } from "./emailLogService.js";

export const sendEmail = async function ({
  to,
  subject,
  body,
  html,
  attachments,
  cc,
  bcc,
}) {
  try {
    let mailOption = {
      to: to,
      subject: subject,
      cc: cc || [],
      bcc: bcc || [],
      // attachments: attachments || [],
    };
    if (attachments && Array.isArray(attachments)) {
      mailOption.attachments = attachments.map((url, index) => ({
        filename: `attachment-${index + 1}.${url.split(".").pop() || "file"}`,
        path: url,
        contentTransferEncoding: "base64",
      }));
    }

    if (body) {
      mailOption.body = body;
    } else {
      mailOption.html = html;
    }
    let ems = await transporter.sendMail(mailOption);
    mailOption.nodemailerResponse = ems;
    await createdLog(mailOption);
    console.log(ems);
    return ems;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
