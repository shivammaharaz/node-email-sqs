# Node.js Email Queue with Amazon SQS and Nodemailer

A simple Node.js Express application that uses Amazon SQS to queue emails and Nodemailer to send them. The project is built with ES Modules for modern JavaScript syntax.

## Features

- Queues emails using Amazon SQS for reliable processing.
- Sends emails via Nodemailer (supports SMTP services like Gmail).
- Basic error handling for API requests.
- Uses ES Modules (`import`/`export`).

## Project Structure

```
project-root/
├── src/
│   ├── config/
│   │   ├── aws.js          # AWS SQS configuration
│   │   └── index.js        # Email and AWS settings
│   ├── controllers/
│   │   └── emailController.js  # Handles email queue requests
│   ├── services/
│   │   ├── emailService.js     # Sends emails with Nodemailer
│   │   ├── sqsProducer.js      # Queues emails in SQS
│   │   └── sqsConsumer.js      # Processes SQS email jobs
│   ├── routes/
│   │   └── emailRoutes.js      # API routes
│   ├── middleware/
│   │   └── errorHandler.js     # Error handling
│   └── app.js                  # Express server
├── .env                        # Environment variables
├── package.json                # Dependencies and scripts
├── consumer.js                 # Runs SQS consumer
└── README.md                   # Documentation
```

## Prerequisites

- Node.js (v18.x or higher)
- AWS account with SQS access and IAM credentials
- SMTP service (e.g., Gmail with app-specific password)
- Git

## Setup

1. **Clone the Repository**:

   ```bash
   git clone <repository-url>
   cd node-email-sqs
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up AWS SQS**:

   - Create an SQS queue in the AWS Console (region: `ap-south-1`).
   - Copy the queue URL (e.g., `https://sqs.ap-south-1.amazonaws.com/your-account-id/your-queue-name`).
   - Ensure your IAM user has permissions:
     ```json
     {
       "Version": "2012-10-17",
       "Statement": [
         {
           "Effect": "Allow",
           "Action": [
             "sqs:SendMessage",
             "sqs:ReceiveMessage",
             "sqs:DeleteMessage"
           ],
           "Resource": "arn:aws:sqs:ap-south-1:your-account-id:your-queue-name"
         }
       ]
     }
     ```

4. **Configure Environment Variables**:
   - Create a `.env` file:
     ```
     AWS_REGION=ap-south-1
     AWS_ACCESS_KEY_ID=your_access_key
     AWS_SECRET_ACCESS_KEY=your_secret_key
     SQS_QUEUE_URL=https://sqs.ap-south-1.amazonaws.com/your-account-id/your-queue-name
     SMTP_HOST=smtp.gmail.com
     SMTP_PORT=465
     SMTP_SECURE=true
     SMTP_USER=your_email@gmail.com
     SMTP_PASS=your_app_specific_password
     EMAIL_FROM=your_email@gmail.com
     PORT=3000
     ```
   - For Gmail, generate an app-specific password in Google Account settings.

## Running the Application

1. **Start the Express Server**:

   ```bash
   npm start
   ```

   Runs on `http://localhost:3000`.

2. **Start the SQS Consumer**:
   ```bash
   npm run consumer
   ```
   Polls the SQS queue to process emails.

## API Endpoint

- **POST /api/send-email**
  - Queues an email.
  - **Request Body**:
    ```json
    {
      "to": "recipient@example.com",
      "subject": "Test Email",
      "body": "Hello!"
    }
    ```
  - **Response**:
    - Success: `200 OK` with `{ "message": "Email queued successfully" }`
    - Error: `400` or `500` with error details
  - **Example**:
    ```bash
    curl -X POST http://localhost:3000/api/send-email \
    -H "Content-Type: application/json" \
    -d '{"to":"recipient@example.com","subject":"Test Email","body":"Hello!"}'
    ```

## Environment Variables

| Variable                | Description        | Example Value                |
| ----------------------- | ------------------ | ---------------------------- |
| `AWS_REGION`            | AWS region         | `ap-south-1`                 |
| `AWS_ACCESS_KEY_ID`     | AWS IAM access key | `AKIA...`                    |
| `AWS_SECRET_ACCESS_KEY` | AWS IAM secret key | `your_secret_key`            |
| `SQS_QUEUE_URL`         | SQS queue URL      | `https://sqs.ap-south-1...`  |
| `SMTP_HOST`             | SMTP host          | `smtp.gmail.com`             |
| `SMTP_PORT`             | SMTP port          | `465`                        |
| `SMTP_SECURE`           | Use SSL/TLS        | `true`                       |
| `SMTP_USER`             | SMTP username      | `your_email@gmail.com`       |
| `SMTP_PASS`             | SMTP password      | `your_app_specific_password` |
| `EMAIL_FROM`            | Sender email       | `your_email@gmail.com`       |
| `PORT`                  | Server port        | `3000`                       |

## Troubleshooting

- **SignatureDoesNotMatch Error**:

  - **Check AWS Credentials**:
    - Verify `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` in `.env`.
    - Test with AWS CLI:
      ```bash
      aws configure set aws_access_key_id your_access_key
      aws configure set aws_secret_access_key your_secret_key
      aws configure set region ap-south-1
      aws sqs list-queues
      ```
    - Regenerate credentials in AWS IAM if needed.
  - **Sync System Clock**:
    - Ensure system time is accurate:
      ```bash
      date -u
      ```
    - Sync clock:
      - Linux: `sudo ntpdate pool.ntp.org`
      - Windows: `w32tm /resync`
  - **Verify Queue URL**:
    - Confirm `SQS_QUEUE_URL` matches the queue in `ap-south-1`.
    - Log `QueueUrl` in `src/config/aws.js`:
      ```javascript
      console.log("SQS Queue URL:", process.env.SQS_QUEUE_URL);
      ```
  - **Update AWS SDK**:
    ```bash
    npm install @aws-sdk/client-sqs@latest
    ```

- **Email Not Sending**:
  - Check SMTP credentials in `.env`.
  - Ensure `SMTP_PASS` is an app-specific password for Gmail.
  - Test Nodemailer in `src/services/emailService.js`:
    ```javascript
    console.log("Sending email:", { to, subject });
    ```

## License

MIT License.
