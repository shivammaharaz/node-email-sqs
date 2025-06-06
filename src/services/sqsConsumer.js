import {
  ReceiveMessageCommand,
  DeleteMessageCommand,
} from "@aws-sdk/client-sqs";
import { sqsClient, queueUrl } from "../config/aws.js";
import { sendEmail } from "./emailService.js";

export const consumeMessage = async function () {
  try {
    const params = {
      QueueUrl: queueUrl,
      MaxNumberOfMessages: 10,
      WaitTimeSeconds: 10,
    };
    while (true) {
      const { Messages } = await sqsClient.send(
        new ReceiveMessageCommand(params)
      );
      if (Messages) {
        for (const message of Messages) {
          let emailData = JSON.parse(message.Body);
          try {
            await sendEmail(emailData);
            await sqsClient.send(
              new DeleteMessageCommand({
                QueueUrl: queueUrl,
                ReceiptHandle: message.ReceiptHandle,
              })
            );
          } catch (error) {
            console.error("error sending emails", error);
          }
        }
      }
    }
  } catch (error) {
    console.error(error);
    throw new Error("Error polling SQS:", error);
  }
};
