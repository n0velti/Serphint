import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();



export const usePostOperations = () => { 

    const createPost = async (postData: any) => {
        try {
            const post = await client.models.Post.create(postData, {
                authMode: 'userPool',
            });
            return post;
        } catch (error) {
            console.error('Error creating post:', error);
            throw error;
        }
    }

    const getPosts = async () => {
        try {
            const postsResponse = await client.models.Post.list({
                authMode: 'userPool',
              });
          
              const enrichedPosts = await Promise.all(
                postsResponse.data.map(async (post) => {
                  const { data: product } = await post.postProduct();
                  const { data: user } = await post.postUser();
                  const { data: likes } = await post.postLikes();
                  const { data: dislikes } = await post.postDislikes();
                  const { data: comments } = await post.postComments();
          
                  return {
                    ...post,
                    postProduct: product,
                    postUser: user,
                    postLikes: likes,
                    postDislikes: dislikes,
                    postComments: comments,
                  };
                })
              );
          
              return { data: enrichedPosts };
        } catch (error) {
            console.error('Error fetching posts:', error);
            throw error;
        }
    }

    const getPostsByProduct = async (productId: string) => {
        try {
            const postsResponse = await client.models.Post.list({
                filter: {
                    postProductId: { eq: productId },
                },
                authMode: 'userPool',
            });

            const enrichedPosts = await Promise.all(
                postsResponse.data.map(async (post) => {
                    const { data: product } = await post.postProduct();
                    const { data: user } = await post.postUser();
                    const { data: likes } = await post.postLikes();
                    const { data: dislikes } = await post.postDislikes();
                    const { data: comments } = await post.postComments();

                    return {
                        ...post,
                        postProduct: product,
                        postUser: user,
                        postLikes: likes,
                        postDislikes: dislikes,
                        postComments: comments,
                    };
                })
            );

            return { data: enrichedPosts };
        } catch (error) {
            console.error('Error fetching posts by product:', error);
            throw error;
        }
    }


    const getPost = async (postId: string) => {
        try {
            const post = await client.models.Post.get(
                { id: postId },
                { authMode: 'userPool' }
            );
    
            const [productResult, userResult, likesResult, dislikesResult, commentsResult] = await Promise.all([
                post?.data?.postProduct(),
                post?.data?.postUser(),
                post?.data?.postLikes(),
                post?.data?.postDislikes(),
                post?.data?.postComments(),
            ]);
    
            const enrichedPost = {
                ...post.data,
                postProduct: productResult,
                postUser: userResult,
                postLikes: likesResult,
                postDislikes: dislikesResult,
                postComments: commentsResult,
            };
    
            return { data: enrichedPost };
        } catch (error) {
            console.error('Error fetching post:', error);
            throw error;
        }
    };


    const setLike = async (postId: string, userId: string, type: string) => {
        try {

            const like = await client.models.Like.create({
                likeTargetId: postId,
                likeUserId: userId,
                targetType: type,
            }, {
                authMode: 'userPool',
            });
            return like;
        } catch (error) {
            console.error('Error creating like:', error);
            throw error;
        }
    }

    const setDislike = async (postId: string, userId: string, type: string) => {
        try {
            const dislike = await client.models.Dislike.create({
                dislikeTargetId: postId,
                dislikeUserId: userId,
                targetType: type,
            }, {
                authMode: 'userPool',
            });
            return dislike;
        } catch (error) {
            console.error('Error creating dislike:', error);
            throw error;
        }
    }

    const removeLike = async (postId: string, userId: string, type: string) => {
        try {
            const like = await client.models.Like.delete({
                likeTargetId: postId,
                likeUserId: userId,
                targetType: type,
            }, {
                authMode: 'userPool',
            });
            return like;
        } catch (error) {
            console.error('Error deleting like:', error);
            throw error;
        }
    }

    const removeDislike = async (postId: string, userId: string, type: string) => {
        try {
            const dislike = await client.models.Dislike.delete({
                dislikeTargetId: postId,
                dislikeUserId: userId,
                targetType: type,
            }, {
                authMode: 'userPool',
            });
            return dislike;
        } catch (error) {
            console.error('Error deleting dislike:', error);
            throw error;
        }
    }

    const addComment = async (postId: string, commentData: any) => {
        try {
            const comment = await client.models.Comment.create({
                commentPostId: postId,
                commentProductId: commentData.commentProductId,
                commentUserId: commentData.commentUserId,
                commentText: commentData.commentText,
                parentCommentID: commentData.parentCommentID || null,
            }, {
                authMode: 'userPool',
            });
            return comment;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }


    return {
        createPost,
        getPosts,
        getPostsByProduct,
        getPost,
        setLike,
        setDislike,
        removeLike,
        removeDislike,
        addComment,
    };

 


}