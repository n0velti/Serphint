import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';
import { formatDistanceToNow } from 'date-fns';


import { usePostOperations } from '@/hooks/data/usePostOperations';
import { useAccountOperations } from '@/hooks/S3/useAccountOperations';
import { Ionicons } from '@expo/vector-icons';
import { useCommentOperations } from '@/hooks/data/useCommentOperations';

import {useAuthProvider} from '@/hooks/auth/useAuthProvider';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';

import LiveDot from '@/components/ui/web/LiveDot';

type PostViewProps = {
  postId: string;

};

const PostViewTwo = ({postId}: PostViewProps) => {
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
  const [commentReactions, setCommentReactions] = useState<Record<string, 'like' | 'dislike' | null>>({});
  
  const {user} = useAuthProvider();

  const [post, setPost] = useState({
    id: postId,
    title: 'Sample Post Title',
    content: 'This is the content of the post.',
  });

  const { getPost, setLike, setDislike, removeLike, removeDislike,  addComment } = usePostOperations();
  const {getComments} = useCommentOperations();
  const {getS3ImageUrl} = useAccountOperations();



 

  useEffect(() => {
    // Fetch post data based on postId

    console.log("USSER ID:", user);

    if(!postId) return;

    const fetchPost = async () => {
      // Simulate fetching post data

      try{
        const fetchedPost = await getPost(postId);
        const profilePictureUrl = await getS3ImageUrl(fetchedPost.data.postUser?.data.userAvatarUri);
        setPost({
          ...fetchedPost.data,
          profilePictureUrl: profilePictureUrl.href,
        });


        if (fetchedPost?.data) {
          if(user)
          {
          
          const userId = await user?.currentUser?.userId;
          console.log("User ID:", userId);
          
          const liked = fetchedPost.data.postLikes?.data.some(like => like.likeUserId === userId);
          const disliked = fetchedPost.data.postDislikes?.data.some(dislike => dislike.dislikeUserId === userId);
          if (liked) setUserReaction('like');
          else if (disliked) setUserReaction('dislike');

          console.log("User reaction:", liked, disliked);
        }
      }

        console.log("Fetched post:", fetchedPost);

      }catch(e){
        console.error("Error fetching post:", e);
      }
     
    };

    const fetchComments = async () => {
      try {
        const fetchedComments = await getComments(postId);
        const nested = await nestComments(fetchedComments);

        
      
        setComments(nested);
    
        if (user) {
          console.log("sersersersers:", user);
          const reactions: Record<string, 'like' | 'dislike' | null> = {};
          fetchedComments.forEach(comment => {
            const userId = user?.currentUser?.userId;
            const liked = comment.commentLikes?.data?.some(l => l.likeUserId === userId);
            const disliked = comment.commentDislikes?.data?.some(d => d.dislikeUserId === userId);
            if (liked) reactions[comment.id] = 'like';
            else if (disliked) reactions[comment.id] = 'dislike';
            else reactions[comment.id] = null;
          });
          console.log("Reactions:", reactions);
          setCommentReactions(reactions);
        }
      } catch (e) {
        console.error("Error fetching comments:", e);
      }
    };

    fetchPost();
    fetchComments();
    

    
  }, [user, postId]);






  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  useEffect(() => {
    console.log("Comments state changed:", comments);
  }, [comments]);

  type Comment = {
    id: string;
    parentCommentID?: string | null;
    children?: Comment[];
    [key: string]: any; // Allow extra fields
  };
  
  const nestComments = async (flatComments: Comment[]): Promise<Comment[]> => {
    const commentMap: Record<string, Comment> = {};
    const nestedComments: Comment[] = [];
  
    // Map over comments and fetch profile image URIs
    const enrichedComments = await Promise.all(
      flatComments.map(async (comment) => {
        const profilePictureUrl = await getS3ImageUrl(comment.commentUser?.data?.userAvatarUri);
        return {
          ...comment,
          profilePictureUrl: profilePictureUrl?.href || 'https://via.placeholder.com/150',
          children: [],
        };
      })
    );
  
    // Populate map
    enrichedComments.forEach(comment => {
      commentMap[comment.id] = comment;
    });
  
    // Build tree
    enrichedComments.forEach(comment => {
      const parentId = comment.parentCommentID;
      if (parentId && commentMap[parentId]) {
        commentMap[parentId].children!.push(comment);
      } else {
        nestedComments.push(comment);
      }
    });
  
    return nestedComments;
  };

  const addCommentToPost = async () => {
    if (newComment.trim()) {

      // Call the addComment function from usePostOperations


      const commentData = {
        commentProductId: post.postProduct?.data.id,
        commentUserId: post.postUser?.data.id,
        commentText: newComment,
        parentCommentID: null, // Assuming this is a top-level comment
      }

      setComments((prevComments) => [
        commentData,
        ...prevComments,
      ]);


      const commentResponse = await addComment(post.id, commentData);
      console.log("Comment response:", commentResponse);


    }
  };

  
  const setCommentLike = async (commentId: string) => {
    const userId = user?.currentUser?.userId;
    if (!userId) return;
  
    const currentReaction = commentReactions[commentId] || null;
  
    // Handle async database changes first
    if (currentReaction === 'like') {
      await removeLike(commentId, userId, 'comment');
      setCommentReactions(prev => ({ ...prev, [commentId]: null }));
    } else {
      if (currentReaction === 'dislike') {
        await removeDislike(commentId, userId, 'comment');
      }
      await setLike(commentId, userId, 'comment');
      setCommentReactions(prev => ({ ...prev, [commentId]: 'like' }));
    }
  
    // Then update UI state
    setComments(prevComments =>
      updateNestedComment(prevComments, commentId, (comment) => {
        const updated = { ...comment };
  
        // Remove like
        if (currentReaction === 'like') {
          updated.commentLikes = {
            ...updated.commentLikes,
            data: updated.commentLikes?.data.filter(
              (like: any) => like.likeUserId !== userId
            ),
          };
        } else {
          // Remove dislike if switching
          if (currentReaction === 'dislike') {
            updated.commentDislikes = {
              ...updated.commentDislikes,
              data: updated.commentDislikes?.data.filter(
                (dislike: any) => dislike.likeUserId !== userId
              ),
            };
          }
  
          // Add new like
          updated.commentLikes = {
            ...updated.commentLikes,
            data: [
              ...(updated.commentLikes?.data || []),
              {
                likeUserId: userId,
                createdAt: new Date().toISOString(),
                likeTargetId: commentId,
                targetType: 'comment',
              },
            ],
          };
        }
  
        return updated;
      })
    );
  };

  const setCommentDisLike = async (commentId: string) => {
    const userId = user?.currentUser?.userId;
    if (!userId) return;
  
    const currentReaction = commentReactions[commentId] || null;
  
    // Handle async DB state
    if (currentReaction === 'dislike') {
      await removeDislike(commentId, userId, 'comment');
      setCommentReactions(prev => ({ ...prev, [commentId]: null }));
    } else {
      if (currentReaction === 'like') {
        await removeLike(commentId, userId, 'comment');
      }
      await setDislike(commentId, userId, 'comment');
      setCommentReactions(prev => ({ ...prev, [commentId]: 'dislike' }));
    }
  
    // Update local UI state
    setComments(prevComments =>
      updateNestedComment(prevComments, commentId, (comment) => {
        const updated = { ...comment };
  
        if (currentReaction === 'dislike') {
          updated.commentDislikes = {
            ...updated.commentDislikes,
            data: updated.commentDislikes?.data.filter(
              (dislike: any) => dislike.likeUserId !== userId
            ),
          };
        } else {
          if (currentReaction === 'like') {
            updated.commentLikes = {
              ...updated.commentLikes,
              data: updated.commentLikes?.data.filter(
                (like: any) => like.likeUserId !== userId
              ),
            };
          }
  
          updated.commentDislikes = {
            ...updated.commentDislikes,
            data: [
              ...(updated.commentDislikes?.data || []),
              {
                likeUserId: userId,
                createdAt: new Date().toISOString(),
                likeTargetId: commentId,
                targetType: 'comment',
              },
            ],
          };
        }
  
        return updated;
      })
    );
  };
  
  function updateNestedComment(
    comments: Comment[],
    commentId: string,
    updater: (comment: Comment) => Comment
  ): Comment[] {
    return comments.map(comment => {
      if (comment.id === commentId) {
        return updater({ ...comment }); // update matched comment
      } else if (comment.children && comment.children.length > 0) {
        return {
          ...comment,
          children: updateNestedComment(comment.children, commentId, updater),
        };
      }
      return comment; // unchanged
    });
  }

  const addReply = async (parentId: string) => {
    if (newReply.trim()) {
      const replyData = {
        commentProductId: post.postProduct?.data.id,
        commentUserId: post.postUser?.data.id,
        commentText: newReply,
        parentCommentID: parentId,
      };
  
      const replyResponse = await addComment(post.id, replyData);
      const reply = replyResponse.data;
  
      setComments(prevComments => {
        const updateComments = [...prevComments];
  
        const findAndInsert = (commentsArray) => {
          for (let comment of commentsArray) {
            if (comment.id === parentId) {
              comment.children = comment.children || [];
              comment.children.unshift(reply);
              return true;
            } else if (comment.children) {
              if (findAndInsert(comment.children)) return true;
            }
          }
          return false;
        };
  
        findAndInsert(updateComments);
        return [...updateComments];
      });
  
      setNewReply('');
      setReplyingTo(null);
    }
  };


  const renderComment = ({ item }) => (
    console.log("Rendering comment:", item),
    console.log("Item:", item),
    <View style={styles.commentCard}>
      
   
      <View style={styles.commentInnerContainer}>
      <View style={styles.userAvatarContainer}>
        <Image
        source={{ uri: item?.profilePictureUrl || 'https://via.placeholder.com/150' }}
        style={styles.commentAvatar}
        />
      </View>

      <View style={styles.commentSection}>
      <Text style={styles.username}>{item?.commentUser?.data?.userName}</Text>

      <Text style={styles.commentContent}>{item.commentText}</Text>

      <View style={styles.commentOptions}>

        <View style={styles.commentVotingContainer}>

        <TouchableOpacity onPress={() => setCommentLike(item.id)}>
        <FontAwesome name="thumbs-o-up" size={14} color="black" />
        </TouchableOpacity>

        <View>
          <Text style={styles.metaText}>{item?.commentLikes?.data?.length - item?.commentDislikes?.data?.length}</Text>
        </View>

        <TouchableOpacity onPress={() => setCommentDisLike(item.id)}>
        <FontAwesome name="thumbs-o-down" size={14} color="black" />
        </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => setReplyingTo(item.id)} style={styles.replyBtn}>
        <Text style={styles.replyLink}>Reply</Text>
      </TouchableOpacity>
        </View>
        </View>
      </View>
        

  
      {replyingTo === item.id && (
        <View style={styles.replyInputGroup}>
          <TextInput
            value={newReply}
            onChangeText={setNewReply}
            placeholder="Write a reply..."
            style={styles.replyInput}
          />
          <Button title="Post Reply" onPress={() => addReply(item.id)} />
        </View>
      )}
  
      {item.children && item.children.length > 0 && (
        <View style={styles.repliesList}>
          {item.children.map(child => (
            <View key={child.id} style={{ paddingLeft: 20 }}>
              {renderComment({ item: child })}
            </View>
          ))}
        </View>
      )}
    </View>
  );




  const handleLike = async () => {
    if (userReaction === 'like') {

      console.log('Post unliked');
      // Undo like
      setPost(prev => ({
        ...prev,
        postLikes: { data: prev.postLikes.data.filter(l => l.likeUserId !== user.currentUser.userId) },
      }));
      await removeLike(post.id, user.currentUser.userId, 'post');
   
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') {
        // Remove dislike first
        setPost(prev => ({
          ...prev,
          postDislikes: { data: prev.postDislikes.data.filter(d => d.dislikeUserId !== user.currentUser.userId) },
        }));
        await removeDislike(post.id, user.currentUser.userId, 'post');
     
      }
      setPost(prev => ({
        ...prev,
        postLikes: { data: [...prev.postLikes.data, { likeUserId: user.currentUser.userId }] },
      }));
      await setLike(post.id, user.currentUser.userId, 'post');

      setUserReaction('like');
    }
  };

  const handleDislike = async () => {
    if (userReaction === 'dislike') {
      // Undo dislike
      setPost(prev => ({
        ...prev,
        postDislikes: { data: prev.postDislikes.data.filter(d => d.dislikeUserId !== user.currentUser.userId) },
      }));
      await removeDislike(post.id, user.currentUser.userId, 'post');
    
      setUserReaction(null);
    } else {
      if (userReaction === 'like') {
        // Remove like first
        setPost(prev => ({
          ...prev,
          postLikes: { data: prev.postLikes.data.filter(l => l.likeUserId !== user.currentUser.userId) },
        }));
        await removeLike(post.id, user.currentUser.userId, 'post');
     
      }
      setPost(prev => ({
        ...prev,
        postDislikes: { data: [...prev.postDislikes.data, { dislikeUserId: user.currentUser.userId }] },
      }));
      await setDislike(post.id, user.currentUser.userId, 'post');
      
      setUserReaction('dislike');
    }
  };


  const handleComment = () => {
    console.log('Commented');
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <View style={styles.postView}>

          <View style={styles.postUserInfoHeader}>
              <View style={styles.postUserInfoLeft}>
                <Image
                  source={{ uri: post.profilePictureUrl || 'https://via.placeholder.com/150' }}
                  style={styles.postUserAvatar}
                />
              </View>

              <View style={styles.postUserInfoRight}>
                <View style={styles.postUserInfoTop}>
              <Text style={styles.username}>{post.postUser?.data?.userName}</Text>
              <Entypo name="dot-single" size={10} color="#888" />
              <Text style={styles.createdAtText}>{post.createdAt && formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}</Text>  

              </View>

                <Text style={styles.productSubHeader}>Finasteride</Text>  
              </View>

        </View>


    
        



        <Text style={styles.postTitle}>
          {/* {post.title} */}
          Finasteride Doesn't work at all it is a scam
        </Text>
        <Text style={styles.postContent}>{post.postContent}</Text>

        <View style={styles.postDetails}>
          <View style={styles.votingContainer}>
          <TouchableOpacity style={styles.postDetailsButton} onPress={handleLike}>
          <FontAwesome name="thumbs-o-up" size={16} color="black" />
           </TouchableOpacity>

          <Text style={styles.metaText}>{post.postLikes?.data.length - post.postDislikes?.data.length}</Text>

          <TouchableOpacity style={styles.postDetailsButton} onPress={handleDislike}>
          <FontAwesome name="thumbs-o-down" size={16} color="black" />
          </TouchableOpacity>
          </View>
          
          <View style={styles.commentContainer}>
          <Text style={styles.metaText}>{post.postComments?.data.length}</Text>

          <TouchableOpacity style={styles.postDetailsButton} onPress={handleComment}>
                      <FontAwesome6 name="comments" size={16} color="black" />
          </TouchableOpacity>
          </View>

          <View style={styles.shareContainer}>
          <Text style={styles.metaText}>12</Text>

          <TouchableOpacity style={styles.postDetailsButton} onPress={handleComment}>
          <FontAwesome name="share" size={16} color="black" />
          </TouchableOpacity>
          </View>

          <View style={styles.viewersContainer}>
            <LiveDot/>

            <View style={styles.liveViewers}>
            <Text style={styles.metaTextCount}>12</Text>
            <Text style={styles.metaTextViews}>Active Viewers</Text>

            </View>
            {/* <View style={styles.totalViews}>
              <Text style={styles.metaTextCount}>332</Text>
              <Text style={styles.metaTextViews}>Total Views</Text>
            </View> */}

          </View>
        </View>

        <View style={styles.commentInputGroup}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          style={styles.commentInput}
  
        />
        <TouchableOpacity title="Post" style={styles.newCommentBtn} onPress={addCommentToPost}>
          <Text style={{color: '#fff'}}>Post</Text>
        </TouchableOpacity>
      </View>
      </View>
    
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={{ paddingBottom: 80 }}
        
      />

      {/* <View style={styles.commentInputGroup}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          style={styles.commentInput}
        />
        <Button title="Post" onPress={addCommentToPost} />
      </View> */}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 10,

  },
  commentCard: {
    marginBottom: 6,
  
  },
  username: {
    fontWeight: '600',
    color: '#333',
    fontSize: 14,

  },
  commentText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
  replyLink: {
    color: '#007AFF',
    fontSize: 13,
 

  },
  replyInputGroup: {
    marginTop: 10,
  },
  commentOptions:{
    flexDirection: 'row',
    gap: 13,
    alignItems: 'center',

  },
  replyInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  repliesList: {
    marginTop: 10,
    marginLeft: 15,
  },
  commentInputGroup: {
   
    flexDirection: 'row',
  
    marginTop: 13,
    backgroundColor: '#fff',
    gap: 5,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 99,
    paddingHorizontal: 10,
    paddingVertical: 6,
    alignContent: 'center',
    alignItems: 'center',
  },
  commentInput: {
    flex: 1,

 
  },
  newCommentBtn: {
    backgroundColor: '#007AFF',
    paddingVertical: 4,
    paddingHorizontal: 15,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'flex-end',

    color: '#fff',
    
  },
  seperator: {
    width: 1,
    height: 15,
    backgroundColor: '#ddd',
    marginHorizontal: 5,
  },
  postView: {
    marginBottom: 24,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 5,
  },
  postContent: {
    fontSize: 15,
    color: '#444',
    paddingBottom: 10,
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
   
  },
  postUserName: {
    fontSize: 16,
    fontWeight: 'bold',

    
  },
  postUserAvatar: {
    width: 36,
    height: 36,
    borderRadius: 25,
    marginRight: 10,
  },
  postUserInfoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 7,
  },
  postUserInfoLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postUserInfoRight: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  postUserInfoTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,

  },
  createdAtText: {
    fontSize: 12,
    color: '#888',
  },
  productSubHeader: {
    fontSize: 13,
    color: '#888',
    fontWeight: '500',
    marginTop: 1,

  },
  postDetails: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 10,
  },
  postDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  metaText: {
    marginHorizontal: 2,
    fontSize: 14,
    fontWeight: '500',
    color: '#555',
  },
  votingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderColor: '#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 99,
    paddingVertical: 6,
    paddingHorizontal: 13,

  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: '#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 99,
    paddingVertical: 6,
    paddingHorizontal: 13,
    
  },
  shareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: '#ddd',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 99,
    paddingVertical: 6,
    paddingHorizontal: 13,
    
  },
  viewersContainer: {
    flexDirection: 'row',
    alignItems: 'center',



    
  },
  liveViewers: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 3,
    gap: 4,
  },
  metaTextCount: {
    fontSize: 12,
    fontWeight: '500',

  },
  totalViews: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  metaTextViews: {
    fontSize: 12,
    color: '#888',
  },

  userAvatarContainer: {
    flexDirection: 'row',
    
  },
  commentInnerContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 10,
  },
  commentSection: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 8,

  },
  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 20,

    borderWidth: 1,
    borderColor: '#ddd',
  },
  commentContent: {
    fontSize: 14,
    color: '#444',
    marginBottom: 8,
  },
  commentVotingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,

    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
    borderRadius: 99,
    paddingHorizontal: 13,
    paddingVertical: 6,
  },
  replyBtn: {
    


  },
});

export default PostViewTwo;