import { defineStorage } from '@aws-amplify/backend';

export const serphintBrandStorage = defineStorage({
  name: 'SerphintBrandMedia',
  access: (allow) => ({
    'media/images/{entity_id}/*': [
        allow.guest.to(['read', 'write', 'delete']),
        allow.authenticated.to(['read', 'write', 'delete']),
      ],
  })
});
