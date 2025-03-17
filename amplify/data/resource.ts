import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  Brand: a.model({
      brandName: a.string(),
      slogan: a.string(),
      location: a.customType({
          fullAddress: a.string().required(),
          displayAddress: a.string().required(),
          city: a.string().required(),
          country: a.string().required(),
          postalCode: a.string().required(),
          latitude: a.float().required(),
          longitude: a.float().required(),
      }),
      brandHasLocation: a.boolean(),
      brandDescription: a.string(),
      products: a.hasMany('Product', 'productBrandId'),
      brandHints: a.hasMany('Hint', 'brandId'),
      logoUri: a.string(),
      createdAt: a.string(),
      updatedAt: a.string(),
    })
    .authorization((allow) => [allow.guest()]),
  Product: a.model({
    productName: a.string(),
    productBrandId: a.id(),
    productBrand: a.belongsTo('Brand', 'productBrandId'),
    productHints: a.hasMany('Hint', 'productId'),
    productLocation: a.customType({
        fullAddress: a.string().required(),
        displayAddress: a.string().required(),
        city: a.string().required(),
        country: a.string().required(),
        postalCode: a.string().required(),
        latitude: a.float().required(),
        longitude: a.float().required(),
    }),
    productHasLocation: a.boolean(),
    productDescription: a.string(),
    productUnitCost: a.float(), 
    productHintValue: a.float(),
    productTotalCost: a.float(), 
    productMedia: a.string().array(),
    createdAt: a.string(),
    updatedAt: a.string(),
  })
  .authorization((allow) => [allow.guest()]),

  Hint: a.model({
    brandId: a.id(),
    hintBrand: a.belongsTo('Brand', 'brandId'),
    productId: a.id(),
    hintProduct: a.belongsTo('Product', 'productId'),
    hintLocation: a.customType({
      city: a.string().required(),
      country: a.string().required(),
      postalCode: a.string().required(),
      region: a.string().required(),
      street: a.string().required(),
      name: a.string().required(),
      latitude: a.float().required(),
      longitude: a.float().required(),
  }),
    comments: a.hasMany('Comment', 'hintId'),
    likes: a.hasMany('Like', 'hintId'),
    hintMedia: a.string().array(),
    hintType: a.string(),
    createdAt: a.string(),
    updatedAt: a.string(),
  })
  .authorization((allow) => [allow.guest()]),


  Comment: a.model({
    hintId: a.id(),
    hintComment: a.belongsTo('Hint', 'hintId'),
    content: a.string(),
    parentCommentId: a.string(),
    commentType: a.string(),
    createdAt: a.string(),
    updatedAt: a.string(),
  })
  .authorization((allow) => [allow.guest()]),

  Like: a.model({
    hintId: a.id(),
    hintLike: a.belongsTo('Hint', 'hintId'),
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