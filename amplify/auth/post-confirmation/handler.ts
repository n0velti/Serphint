import type { PostConfirmationTriggerHandler } from "aws-lambda";
import { type Schema } from "../../data/resource";
import { generateClient } from "aws-amplify/data";

import { Amplify } from "aws-amplify"
import outputs from "../../../amplify_outputs.json"


Amplify.configure(outputs)

const client = generateClient<Schema>();

export const handler: PostConfirmationTriggerHandler = async (event) => {
    console.log("Post confirmation event: ", event);
  await client.models.User.create({
    userEmail: event.request.userAttributes.email,
    userPhoneNumber: event.request.userAttributes.phone_number,
  });

  return event;
};