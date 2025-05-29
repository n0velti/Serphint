import type { PostConfirmationTriggerHandler } from "aws-lambda";
import { type Schema } from "../../data/resource";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from "$amplify/env/post-confirmation";

const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig(
  env
);

Amplify.configure(resourceConfig, libraryOptions);

const client = generateClient<Schema>();

export const handler: PostConfirmationTriggerHandler = async (event) => {
  console.log("Post confirmation event update: ", event);
  await client.models.User.create({
    id: event.request.userAttributes.sub,
    userEmail: event.request.userAttributes.email,
    userPhoneNumber: event.request.userAttributes.phone_number,
    userFirstName: event.request.userAttributes.given_name,
    userLastName: event.request.userAttributes.family_name,
    userAvatarUri: event.request.userAttributes.picture,
    userName: event.request.userAttributes.preferred_username,
  });

  return event;
};