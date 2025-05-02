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

    return {
        createPost,
        getPosts,
    };

}