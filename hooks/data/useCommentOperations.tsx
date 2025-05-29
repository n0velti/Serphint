import { generateClient } from 'aws-amplify/data';
import type { Schema } from '@/amplify/data/resource';

const client = generateClient<Schema>();


export const useCommentOperations = () => { 

    const createComment = async (commentData: any) => {
        try {
            const comment = await client.models.Comment.create(commentData, {
                authMode: 'userPool',
            });
            console.log('Comment created successfully:', comment);
            return comment;
        } catch (error) {
            console.error('Error creating comment:', error);
            throw error;
        }
    }

    const getComments = async (postId: string) => {
        try {
            const comments = await client.models.Comment.list({
                authMode: 'userPool' 
            });
    
            console.log('Comments:', comments);
    
            const commentData = comments?.data ?? [];
    
            const enrichedComments = await Promise.all(
                commentData.map(async (comment) => {
                    const [likeResults, dislikeResults, userResults] = await Promise.all([
                        comment.commentLikes(),
                        comment.commentDislikes(),
                        comment.commentUser(),
                    ]);
    
                    return {
                        ...comment,
                        commentLikes: likeResults,
                        commentDislikes: dislikeResults,
                        commentUser: userResults,
                    };
                })
            );

            console.log('Enriched Comments:', enrichedComments);
    
            return enrichedComments;
        } catch (error) {
            console.error('Error fetching comments:', error);
            throw error;
        }
    };

    return {
        createComment,
        getComments,
    };

}