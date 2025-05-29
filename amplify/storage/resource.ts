import { defineStorage } from '@aws-amplify/backend';

export const nowMedUserStorage = defineStorage({
  name: 'NowMedUserStorage',
  
  access: (allow) => ({
    'media/*': [
        allow.guest.to(['read', 'write', 'delete']),
        allow.authenticated.to(['read', 'write', 'delete']),
      ],
  }),

});
