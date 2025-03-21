import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({

  Location: a.customType({
      city: a.string().required(),
      country: a.string().required(),
      postalCode: a.string().required(),
      fullAddress: a.string().required(),
      displayAddress: a.string().required(),
      street: a.string().required(),
      latitude: a.float().required(),
      longitude: a.float().required(),
  }),

  Media: a.customType({
    mediaType: a.string().required(),
    mediaUri: a.string().required(),
  }),


  Brand: a.model({
    brandName: a.string(),
    brandLocation: a.ref('Location'),
    brandSlogan: a.string(),
    brandDescription: a.string(),
    brandProducts: a.hasMany('Product', 'productBrandId'),
    brandHints: a.hasMany('Hint', 'hintBrandId'),
    brandLogoUri: a.string(),
    createdAt: a.string(),
    updatedAt: a.string(),
  })
  .authorization((allow) => [allow.guest()]),


Product: a.model({
  productName: a.string(),
  productBrandId: a.id(),
  productBrand: a.belongsTo('Brand', 'productBrandId'),
  productHints: a.hasMany('Hint', 'hintProductId'),
  productLocation: a.ref('Location'),
  productDescription: a.string(),
  productDollarFigureCost: a.float(), 
  productCentFigureCost: a.float(), 
  productBaseCurrency: a.string(),
  productHintValue: a.float(),
  productDollarTotalCost: a.float(),
  productCentTotalCost: a.float(), 
  productMedia: a.ref('Media').array(),
  createdAt: a.string(),
  updatedAt: a.string(),
})
.authorization((allow) => [allow.guest()]),


Hint: a.model({
  hintBrandId: a.id(),
  hintBrand: a.belongsTo('Brand', 'hintBrandId'),
  hintProductId: a.id(),
  hintProduct: a.belongsTo('Product', 'hintProductId'),
  hintLocation: a.ref('Location'),
  hintComments: a.hasMany('Comment', 'commentHintId'),
  hintlikes: a.hasMany('Like', 'likeHintId'),
  hintMedia: a.ref('Media').array(),
  createdAt: a.string(),
  updatedAt: a.string(),
})
.authorization((allow) => [allow.guest()]),


Comment: a.model({
  commentHintId: a.id(),
  hintComment: a.belongsTo('Hint', 'commentHintId'),
  content: a.string(),
  commentParentId: a.string(),
  commentType: a.string(),
  createdAt: a.string(),
  updatedAt: a.string(),
})
.authorization((allow) => [allow.guest()]),

Like: a.model({
  likeHintId: a.id(),
  likeHint: a.belongsTo('Hint', 'likeHintId'),
  type: a.string(),
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

