import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Brand: a
    .model({
      brandName: a.string(),
      slogan: a.string(),
      location: a.string(),
      description: a.string(),
      logoUri: a.string(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
  },
});