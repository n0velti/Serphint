import { defineStorage } from '@aws-amplify/backend';

export const nowMedUserStorage = defineStorage({
  name: 'NowMedUserStorage',
  
  access: (allow) => ({
    'media/images/{entity_id}/*': [
        allow.guest.to(['read', 'write', 'delete']),
        allow.authenticated.to(['read', 'write', 'delete']),
      ],
  }),

});
