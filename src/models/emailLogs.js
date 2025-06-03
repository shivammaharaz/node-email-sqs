import { Schema, model } from "mongoose";

const collectionSchema = new Schema(
  {
    to: {
      type: String,
      required: true,
    },
    from: { type: String },
    cc: { type: [] },
    bcc: { type: [] },
    attachments: { type: [] },
    text: { type: String },
    html: { type: String },
    nodemailerResponse: {
      type: {},
    },
  },
  {
    timestamps: true,
  }
);

export default model("emailLogs", collectionSchema);
