import { defineStorage } from '@aws-amplify/backend';

export const SerphintBrandLogoStorage = defineStorage({
  name: 'SerphintBrandLogoStorage',
  access: (allow) => ({
    'brands/logos/*': [
      allow.guest.to(['read', 'write', 'delete']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
  })
});
