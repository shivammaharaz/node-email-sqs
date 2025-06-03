import { SQSClient } from "@aws-sdk/client-sqs";
import { AWS } from "../utils/constants";

export const sqsClient = new SQSClient({
  region: AWS.region,
  credentials: AWS.credentials,
});

export const queueUrl = AWS.sqsQueueUrl;
