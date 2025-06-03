import { queueEmail } from "../services/sqsProducer";
export const sendMail = async function (req, res, next) {
  try {
    let { to, cc, bcc, body, attachments, html, subject } = req.body;
    let emailData = {
      to: to,
      cc: cc || [],
      bcc: bcc || [],
      subject: subject,
      text: body,
      html: html,
      attachments: attachments || [],
    };
    let response = await queueEmail(emailData);
    return res.status(200).json({
      success: true,
      message: "email added to the queue",
      result: response,
    });
  } catch (error) {
    console.log(err);
    next(err);
  }
};
