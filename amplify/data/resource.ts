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


  createdAt: a.string(),
  updatedAt: a.string(),
})
.authorization((allow) => [
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
  userID: a.id().required(), // Link to the user
  commentText: a.string(),
  parentCommentID: a.id(), // Null if it's a top-level comment
  createdAt: a.string(),
  updatedAt: a.string(),
})
.authorization((allow) => [allow.guest()]),

Like: a.model({
  likeUserId: a.id(),
  likeUser: a.belongsTo('User', 'likeUserId'),

  likeTargetId: a.id().required(),
  likeTarget: a.belongsTo('Post', 'likeTargetId'),// Link to Post
  likeTargetComment: a.belongsTo('Comment', 'likeTargetId'), // Link to Comment

  targetType: a.string().required(), // "post" or "comment"
  createdAt: a.string(),
})
.authorization((allow) => [allow.guest()]),

Dislike: a.model({
  dislikeUserId: a.id(),
  dislikeUser: a.belongsTo('User', 'dislikeUserId'),

  dislikeTargetId: a.id().required(),
  dislikeTarget: a.belongsTo('Post', 'dislikeTargetId'), // Link to Post
  dislikeTargetComment: a.belongsTo('Comment', 'dislikeTargetId'), // Link to Comment

  targetType: a.string().required(), // "post" or "comment"
  createdAt: a.string(),
})
.authorization((allow) => [allow.guest()]),




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

