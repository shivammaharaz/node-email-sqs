import transporter from "../config/email.js";

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
      attachments: attachments || [],
    };

    if (body) {
      mailOption.text = body;
    } else {
      mailOption.html = html;
    }
    let ems = await transporter.sendMail(mailOption);
    console.log(ems);
    return ems;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
