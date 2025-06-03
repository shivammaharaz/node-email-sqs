import { SendMessageCommand } from "@aws-sdk/client-sqs";
import { sqsClient, queueUrl } from "../config/aws.js";

export const queueEmail = async (emailData) => {
  const param = {
    QueuerUrl: queueUrl,
    MessageBody: JSON.stringify(emailData),
  };
  return await sqsClient.send(new SendMessageCommand(param));
};
