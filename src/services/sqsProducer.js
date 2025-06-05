import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient, queueUrl } from "../config/aws.js";

export const queueEmail = async (emailData) => {
  try {
    const param = {
      QueueUrl: queueUrl,
      MessageBody: JSON.stringify(emailData),
    };

    console.log("param", param);
    return await sqsClient.send(new SendMessageCommand(param));
  } catch (error) {
    console.log("error queueing email", error);
    throw error;
  }
};
