import emailLogs from "../models/emailLogs.js";

export const createdLog = async function (params) {
  try {
    return await emailLogs.create(params);
  } catch (err) {
    console.log("error saving logs", err);
    throw err;
  }
};
