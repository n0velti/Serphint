import React, { useEffect, useState, useRef } from 'react';
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
  Image,
  ScrollView,
} from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import Animated, { interpolate, useAnimatedRef, useAnimatedStyle, useScrollViewOffset, useSharedValue, useAnimatedScrollHandler } from 'react-native-reanimated';
import { Picker } from '@react-native-picker/picker';
import { usePostOperations } from '@/hooks/data/usePostOperations';
import { useAccountOperations } from '@/hooks/S3/useAccountOperations';
import { Ionicons } from '@expo/vector-icons';
import { useCommentOperations } from '@/hooks/data/useCommentOperations';
import { useAuthProvider } from '@/hooks/auth/useAuthProvider';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import LiveDot from '@/components/ui/web/LiveDot';
import { post } from 'aws-amplify/api';

type PostViewProps = {
  postId: string;
};

const HEADER_HEIGHT = 200;

const PostViewTwo = ({ postId }: PostViewProps) => {
  const [userReaction, setUserReaction] = useState<'like' | 'dislike' | null>(null);
  const [commentReactions, setCommentReactions] = useState<Record<string, 'like' | 'dislike' | null>>({});
  const { user } = useAuthProvider();
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const [post, setPost] = useState({
    id: postId,
    title: 'Sample Post Title',
    content: 'This is the content of the post.',
  });

  const { getPost, setLike, setDislike, removeLike, removeDislike, addComment } = usePostOperations();
  const { getComments } = useCommentOperations();
  const { getS3ImageUrl } = useAccountOperations();
  const [contentType, setContentType] = useState('Popular');
  const [contentTime, setContentTime] = useState('Recent');

  useEffect(() => {
    console.log("USER ID:", user);
    if (!postId) return;

    const fetchPost = async () => {
      try {
        const fetchedPost = await getPost(postId);
        const profilePictureUrl = await getS3ImageUrl(fetchedPost.data.postUser?.data.userAvatarUri);
        setPost({
          ...fetchedPost.data,
          profilePictureUrl: profilePictureUrl.href,
        });

        if (fetchedPost?.data) {
          if (user) {
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
      } catch (e) {
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
    [key: string]: any;
  };

  const nestComments = async (flatComments: Comment[]): Promise<Comment[]> => {
    const commentMap: Record<string, Comment> = {};
    const nestedComments: Comment[] = [];

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

    enrichedComments.forEach(comment => {
      commentMap[comment.id] = comment;
    });

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
      const commentData = {
        commentProductId: post.postProduct?.data.id,
        commentUserId: post.postUser?.data.id,
        commentText: newComment,
        parentCommentID: null,
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

    setComments(prevComments =>
      updateNestedComment(prevComments, commentId, (comment) => {
        const updated = { ...comment };

        if (currentReaction === 'like') {
          updated.commentLikes = {
            ...updated.commentLikes,
            data: updated.commentLikes?.data.filter(
              (like: any) => like.likeUserId !== userId
            ),
          };
        } else {
          if (currentReaction === 'dislike') {
            updated.commentDislikes = {
              ...updated.commentDislikes,
              data: updated.commentDislikes?.data.filter(
                (dislike: any) => dislike.likeUserId !== userId
              ),
            };
          }

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

  const [showCommentBtn, setShowCommentBtn] = useState(false);

  const newCommentChange = (text: string) => {
    setNewComment(text);
    if (text.trim() !== '') {
      setShowCommentBtn(true);
    } else {
      setShowCommentBtn(false);
    }
  }

  const setCommentDisLike = async (commentId: string) => {
    const userId = user?.currentUser?.userId;
    if (!userId) return;

    const currentReaction = commentReactions[commentId] || null;

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
        return updater({ ...comment });
      } else if (comment.children && comment.children?.length > 0) {
        return {
          ...comment,
          children: updateNestedComment(comment.children, commentId, updater),
        };
      }
      return comment;
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
      <View style={styles.commentContainer}>
        <View style={styles.commentAvatarContainer}>
          <Image
            source={{ uri: item?.profilePictureUrl || 'https://via.placeholder.com/150' }}
            style={styles.commentAvatar}
          />
        </View>

        <View style={styles.commentContent}>
          <Text style={styles.commentUsername}>{item?.commentUser?.data?.userName}</Text>
          <Text style={styles.commentText}>{item.commentText}</Text>

          <View style={styles.commentActions}>
            <View style={styles.commentVoting}>
              <TouchableOpacity onPress={() => setCommentLike(item.id)} style={styles.voteButton}>
                <FontAwesome name="thumbs-o-up" size={14} color="#666" />
              </TouchableOpacity>
              <Text style={styles.voteCount}>{item?.commentLikes?.data?.length - item?.commentDislikes?.data?.length}</Text>
              <TouchableOpacity onPress={() => setCommentDisLike(item.id)} style={styles.voteButton}>
                <FontAwesome name="thumbs-o-down" size={14} color="#666" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => setReplyingTo(item.id)} style={styles.replyButton}>
              <Text style={styles.replyText}>Reply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {replyingTo === item.id && (
        <View style={styles.replyInputContainer}>
          <TextInput
            value={newReply}
            onChangeText={setNewReply}
            placeholder="Write a reply..."
            style={styles.replyInput}
          />
          <Button title="Post Reply" onPress={() => addReply(item.id)} />
        </View>
      )}

      {item.children && item.children?.length > 0 && (
        <View style={styles.repliesContainer}>
          {item.children.map(child => (
            <View key={child.id} style={styles.nestedComment}>
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
      setPost(prev => ({
        ...prev,
        postLikes: { data: prev.postLikes.data.filter(l => l.likeUserId !== user.currentUser.userId) },
      }));
      await removeLike(post.id, user.currentUser.userId, 'post');
      setUserReaction(null);
    } else {
      if (userReaction === 'dislike') {
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
      setPost(prev => ({
        ...prev,
        postDislikes: { data: prev.postDislikes.data.filter(d => d.dislikeUserId !== user.currentUser.userId) },
      }));
      await removeDislike(post.id, user.currentUser.userId, 'post');
      setUserReaction(null);
    } else {
      if (userReaction === 'like') {
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

  const [showAddComment, setShowAddComment] = useState(false);

  const handleComment = () => {
    setShowAddComment(!showAddComment);
    if (showAddComment) {
      setNewComment('');
      setShowCommentBtn(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.postContainer}>
        <View style={styles.postHeader}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: post.profilePictureUrl || 'https://via.placeholder.com/150' }}
              style={styles.userAvatar}
            />
            <View style={styles.userDetails}>
              <View style={styles.userMeta}>
                <Text style={styles.username}>{post.postUser?.data?.userName}</Text>
                <Entypo name="dot-single" size={12} color="#999" />
                <Text style={styles.timestamp}>
                  {post.createdAt && formatDistanceToNow(new Date(post?.createdAt), { addSuffix: true })}
                </Text>
              </View>
              <Text style={styles.productTag}>Finasteride</Text>
            </View>
          </View>
        </View>

        <View style={styles.postBody}>
          <Text style={styles.postTitle}>Finasteride Doesn't work at all it is a scam</Text>
          <Text style={styles.postText}>{post.postContent}</Text>
        </View>

        <View style={styles.likeInfo}>
          <Text style={styles.likeInfoText}>
            Liked by{' '}
            <Text style={styles.likedByUsername}>
              {post.postLikes?.data?.length > 0 ? post.postLikes?.data[0].likeUser?.data?.userName : ''}
            </Text>
            {post.postLikes?.data.length > 1 && (
              <>
                {' '}and{' '}
                <Text style={styles.likedByUsername}>{post.postLikes?.data.length - 1}</Text>
                {' '}others
              </>
            )}
          </Text>
        </View>

        <View style={styles.postActions}>
          <TouchableOpacity style={styles.actionButton} onPress={handleLike}>
            <Ionicons 
              name={userReaction === 'like' ? "heart" : "heart-outline"} 
              size={20} 
              color="#333" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton} onPress={handleComment}>
            <Ionicons 
              name={showAddComment ? "chatbubble" : "chatbubble-outline"} 
              size={18} 
              color="#333" 
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={18} color="#333" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterSection}>

          <View style={styles.sortByText}>
            <Text style={{ fontSize: 14, color: '#333' }}>Sort by:</Text>
          </View>

          <View style={styles.filterRow}>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={contentType}
                onValueChange={setContentType}
                style={styles.picker}
              >
                <Picker.Item label="Popular" value="Popular" />
                <Picker.Item label="Top" value="Top" />
                <Picker.Item label="Rising" value="Rising" />
              </Picker>
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={contentTime}
                onValueChange={setContentTime}
                style={styles.picker}
              >
                <Picker.Item label="Recent" value="Recent" />
                <Picker.Item label="New" value="New" />
                <Picker.Item label="Last 7 Days" value="Last 7 Days" />
                <Picker.Item label="Last 30 Days" value="Last 30 Days" />
                <Picker.Item label="Last 90 Days" value="Last 90 Days" />
                <Picker.Item label="Last Year" value="Last Year" />
                <Picker.Item label="All Time" value="All Time" />
              </Picker>
            </View>

            <View style={styles.commentInfo}>
              <Text style={styles.commentCount}>{comments.length} comments</Text>
            </View>
          </View>
        </View>

        {showAddComment && (
          <View style={styles.commentInputSection}>
            <TextInput
              value={newComment}
              onChangeText={newCommentChange}
              placeholder="Add a comment..."
              style={styles.commentInput}
              multiline
            />
            <View style={styles.postCommands}>
            <TouchableOpacity style={styles.postButton} onPress={addCommentToPost}>
            <Ionicons name="attach" size={20} color="black" />            </TouchableOpacity>
            <TouchableOpacity style={styles.postButton} onPress={addCommentToPost}>
              <Text style={styles.postButtonText}>Post</Text>
            </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.commentsList}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  // Main Container
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 55,
  },

  // Post Styles
  postContainer: {
    backgroundColor: '#ffffff',

    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  postHeader: {
    marginBottom: 12,
  },

  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },

  userDetails: {
    flex: 1,
  },

  userMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },

  username: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },

  timestamp: {
    fontSize: 13,
    color: '#666',
  },

  productTag: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },

  postBody: {
    marginBottom: 16,
  },

  postTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    lineHeight: 24,
    marginBottom: 8,
  },

  postText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },

  likeInfo: {
    marginTop: 4,
  },

  likeInfoText: {
    fontSize: 13,
    color: '#666',
  },

  likedByUsername: {
    color: '#007AFF',
    fontWeight: '500',
  },

  postActions: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 2,
    marginBottom: 16,
  },

  actionButton: {
    paddingVertical: 8,
    
    marginRight: 22,
  },

  // Filter Section
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
    paddingTop: 4,
  },

  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },

  pickerContainer: {
    minWidth: 120,
  },

  picker: {
    fontSize: 14,
    color: '#333',
  },

  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  commentCount: {
    fontSize: 13,
    color: '#666',
    fontWeight: '500',
  },

  // Comment Input
  commentInputSection: {
    flexDirection: 'column',
    
    paddingTop: 10,
    paddingBottom: 4,
    flex: 1,
    backgroundColor: '#f8f8f8',
    gap: 5,
    marginTop: 18,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 10,
  },
  postCommands: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 6,
  },

  commentInput: {
    flex: 1,
 
    paddingHorizontal: 17,
   
    fontSize: 15,


  },

  postButton: {
  
   alignItems: 'flex-end',
   padding: 3,
  },

  postButtonText: {
    color: '#000',
    fontSize: 15,
    fontWeight: '600',
  },

  // Comments List
  commentsList: {
    paddingBottom: 20,
    marginTop: 8,
  },

  // Comment Card
  commentCard: {
    backgroundColor: '#ffffff',
   
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },

  commentContainer: {
    flexDirection: 'row',
  },

  commentAvatarContainer: {
    marginRight: 12,
  },

  commentAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },

  commentContent: {
    flex: 1,
  },

  commentUsername: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },

  commentText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 18,
    marginBottom: 8,
  },

  commentActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  commentVoting: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 12,
  },

  voteButton: {
    paddingHorizontal: 4,
  },

  voteCount: {
    fontSize: 13,
    fontWeight: '500',
    color: '#333',
    marginHorizontal: 8,
  },

  replyButton: {
    paddingVertical: 4,
  },

  replyText: {
    fontSize: 13,
    color: '#007AFF',
    fontWeight: '500',
  },

  // Reply Input
  replyInputContainer: {
    marginTop: 12,
    marginLeft: 44,
  },

  replyInput: {
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    padding: 12,
    fontSize: 14,
    marginBottom: 8,
  },

  // Nested Comments
  repliesContainer: {
    marginTop: 12,
    marginLeft: 44,
  },

  nestedComment: {
    borderLeftWidth: 2,
    borderLeftColor: '#f0f0f0',
    paddingLeft: 12,
  },
});

export default PostViewTwo;