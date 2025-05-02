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
  console.log("Post confirmation event: ", event.request);
  await client.models.User.create({
    id: event.request.userAttributes.sub,
    userEmail: event.request.userAttributes.email,
    userPhoneNumber: '55555555',
    userFirstName: event.request.userAttributes.firstName,
    userLastName: event.request.userAttributes.lastName,
    userAvatarUri: event.request.userAttributes.profilePictureUri,
    userName: event.request.userAttributes.userName,
  });

  return event;
};