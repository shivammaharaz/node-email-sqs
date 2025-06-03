import transporter from "../config/email";

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
    return await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
