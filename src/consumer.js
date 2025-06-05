import { consumeMessage } from "./services/sqsConsumer.js";

const processMessage = async function () {
  try {
    while (true) {
      await consumeMessage();
    }
  } catch (err) {
    console.error(err);
  }
};
processMessage();

export default processMessage;
