import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from '../auth/post-confirmation/resource';

const schema = a.schema({

  Media: a.customType({
    mediaType: a.string().required(),
    mediaUri: a.string().required(),
  }),

  User: a.model({
    
    userEmail: a.string().required(),
    userPhoneNumber: a.string().required(),
    userFirstName: a.string(),
    userLastName: a.string(),
    userAvatarUri: a.string(),
    userName: a.string(),

    userPost: a.hasMany('Post', 'postUserId'),
    userComment: a.hasMany('Comment', 'commentUserId'),
    userLike: a.hasMany('Like', 'likeUserId'),
    userDislike: a.hasMany('Dislike', 'dislikeUserId'),
    
  })
  .authorization((allow) => [
    allow.ownerDefinedIn('userEmail'),
    allow.guest(),
    allow.authenticated(),
  ]),


Product: a.model({
  productName: a.string(),
  productDescription: a.string(),
  productDollarFigureCost: a.float(), 
  productCentFigureCost: a.float(), 
  productBaseCurrency: a.string(),


  productMedia: a.ref('Media').array(),

  productPost: a.hasMany('Post', 'postProductId'),
  productComment: a.hasMany('Comment', 'commentProductId'),

  product_variants: a.hasMany('productVariant', 'product_id'),

  createdAt: a.string(),
  updatedAt: a.string(),
})
.authorization((allow) => [
  allow.ownerDefinedIn('userEmail'),
  allow.guest(),
  allow.authenticated(),
]),

productVariant: a.model({
  
  product_id: a.id().required(), // Link variant to a product
  product: a.belongsTo('Product', 'product_id'),

  vendor_id: a.id().required(), // Link variant to a vendor
  vendor: a.belongsTo('vendor', 'vendor_id'),

  oem_id: a.id().required(), // Link variant to an OEM
  oem: a.belongsTo('oem', 'oem_id'),

  name: a.string().required(), // Name of the variant (e.g., "Size", "Color")
  format: a.string().required(), // Format of the variant (e.g., "Small", "Red")
  delivery_method: a.string().required(), // Delivery method (e.g., "Digital", "Physical")
  package_type: a.string().required(), // Package type (e.g., "Box", "Bottle")
  subsciption_type: a.string().required(), // Subscription type (e.g., "Monthly", "Yearly")
  subscription_interval: a.string().required(), // Subscription interval (e.g., "1 month", "3 months")
  is_subscription: a.boolean().required(), // Whether the variant is a subscription

  price_dollar: a.float().required(), // Price in dollars
  price_cent: a.float().required(), // Price in cents
  base_currency: a.string().required(), // Currency code (e.g., "USD", "EUR")

  sku: a.string().required(), // Stock Keeping Unit
  
  product_variant_regional_info: a.hasMany('productVariantRegionalInfo', 'product_variant_id'),


  createdAt: a.string(),
  updatedAt: a.string(),
}).authorization((allow) => [
  allow.ownerDefinedIn('userEmail'),
  allow.guest(),
  allow.authenticated(),
]),

vendor: a.model({
  name: a.string().required(), // Name of the vendor
  contact_email: a.string(), // Contact email of the vendor
  secondary_contact_email: a.string(), // Secondary contact email of the vendor
  phone_number: a.string(), // Phone number of the vendor
  address: a.string(), // Address of the vendor
  license_number: a.string(), // License number of the vendor

  product_variants: a.hasMany('productVariant', 'vendor_id'),

  createdAt: a.string(),
  updatedAt: a.string(),
}).authorization((allow) => [
  allow.ownerDefinedIn('userEmail'),
  allow.guest(),
  allow.authenticated(),
]),


oem: a.model({
  name: a.string().required(), // Name of the vendor
  contact_email: a.string().required(), // Contact email of the vendor
  secondary_contact_email: a.string(), // Secondary contact email of the vendor
  phone_number: a.string(), // Phone number of the vendor
  address: a.string(), // Address of the vendor
  license_number: a.string(), // License number of the vendor
  gmp_certified: a.boolean().required(), // Whether the OEM is GMP certified

  product_variants: a.hasMany('productVariant', 'oem_id'),

  createdAt: a.string(),
  updatedAt: a.string(),
}).authorization((allow) => [
  allow.ownerDefinedIn('userEmail'),
  allow.guest(),
  allow.authenticated(),
]),


productVariantRegionalInfo: a.model({
  region: a.string().required(), // Region code (e.g., "US", "EU")
  country_code: a.string().required(), // Country code (e.g., "US", "CA")
  regulatory_id: a.string().required(), // Regulatory ID for the region
  is_controlled: a.boolean().required(), // Whether the product is controlled in this region
  approval_status: a.string().required(), // Approval status (e.g., "Approved", "Pending")
  approved_by: a.string(), // Who approved the product
  notes: a.string(), // Additional notes about the product in this region
  insurance_code: a.string(), // Insurance code for the product in this region
  created_at: a.string(), // Creation timestamp
  updated_at: a.string(), // Update timestamp

  product_variant_id: a.id().required(), // Link to the product variant
  product_variant: a.belongsTo('productVariant', 'product_variant_id'),


}).authorization((allow) => [
  allow.ownerDefinedIn('userEmail'),
  allow.guest(),
  allow.authenticated(),
]),

Post: a.model({
  
  postComments: a.hasMany('Comment', 'commentPostId'),
  postLikes: a.hasMany('Like', 'likeTargetId'),
  postDislikes: a.hasMany('Dislike', 'dislikeTargetId'),
  postProductName: a.string(),
  postProductId: a.id(), // Link post to a product 
  postProduct: a.belongsTo('Product', 'postProductId'),
  postTitle: a.string(),
  postContent: a.string(),
  postUserId: a.id(), // Link post to the user
  postUser: a.belongsTo('User', 'postUserId'),
  postMedia: a.ref('Media').array(),
  createdAt: a.string(),
  updatedAt: a.string(),
})
.authorization((allow) => [
  allow.guest().to(['read']), // <-- allow IAM unauthenticated read
  allow.authenticated().to(['read', 'create', 'update', 'delete']),
]),

Comment: a.model({
  commentPostId: a.id().required(), // Link comment to a post
  commentPost: a.belongsTo('Post', 'commentPostId'),
  commentProductId: a.id(), // Link comment to a product
  commentProduct: a.belongsTo('Product', 'commentProductId'),
  commentUserId: a.id(), // Link comment to the user
  commentUser: a.belongsTo('User', 'commentUserId'),
  commentLikes: a.hasMany('Like', 'likeTargetId'),
  commentDislikes: a.hasMany('Dislike', 'dislikeTargetId'),
  commentMedia: a.ref('Media').array(),
  commentText: a.string(),
  parentCommentID: a.id(), // Null if it's a top-level comment
  createdAt: a.string(),
  updatedAt: a.string(),
})
.authorization((allow) => [
  allow.ownerDefinedIn('userEmail'),
  allow.guest(),
  allow.authenticated(),
]),

Like: a.model({
  likeUserId: a.id().required(),
  likeUser: a.belongsTo('User', 'likeUserId'),

  likeTargetId: a.id().required(),
  likeTarget: a.belongsTo('Post', 'likeTargetId'),// Link to Post
  likeTargetComment: a.belongsTo('Comment', 'likeTargetId'), // Link to Comment

  targetType: a.string().required(), // "post" or "comment"
  createdAt: a.string(),
})
.identifier(['likeTargetId', 'likeUserId', 'targetType'])
.authorization((allow) => [
  allow.ownerDefinedIn('userEmail'),
  allow.guest(),
  allow.authenticated(),
]),

Dislike: a.model({
  dislikeUserId: a.id().required(),
  dislikeUser: a.belongsTo('User', 'dislikeUserId'),

  dislikeTargetId: a.id().required(),
  dislikeTarget: a.belongsTo('Post', 'dislikeTargetId'), // Link to Post
  dislikeTargetComment: a.belongsTo('Comment', 'dislikeTargetId'), // Link to Comment

  targetType: a.string().required(), // "post" or "comment"
  createdAt: a.string(),
})
.identifier(['dislikeTargetId', 'dislikeUserId', 'targetType'])
.authorization((allow) => [
  allow.ownerDefinedIn('userEmail'),
  allow.guest(),
  allow.authenticated(),
]),




})
.authorization((allow) => [

  allow.authenticated(),
  allow.resource(postConfirmation),
  allow.guest()
]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam',
    
  
  },
});

