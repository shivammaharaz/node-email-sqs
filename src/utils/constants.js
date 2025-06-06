import "dotenv/config";

export const EMAIL = {
  host: process.env.EMAIL_HOST_SKM,
  port: process.env.EMAIL_PORT_SKM,
  secure: process.env.EMAIL_SECURE_SKM === "true",
  auth: {
    user: process.env.EMAIL_USER_SKM,
    pass: process.env.EMAIL_PASS_SKM,
  },
};

export const AWS = {
  region: process.env.AWS_REGION_SKM,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_SKM,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY_SKM,
  },
  sqsQueueUrl: process.env.SQS_QUEUE_URL_SKM,
};

export const DB = {
  dbUrl: process.env.DB_URL_SKM,
  options: {
    maxPoolSize: process.env.DB_POOL_SIZE_SKM,
  },
};

export const port = process.env.PORT_SKM;
