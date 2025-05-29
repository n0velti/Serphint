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

import { usePostOperations } from '@/hooks/data/usePostOperations';
import { useAccountOperations } from '@/hooks/S3/useAccountOperations';
import { Ionicons } from '@expo/vector-icons';

type PostViewProps = {
  postId: string;
};

const PostView = ({postId}: PostViewProps) => {

  const [post, setPost] = useState({
    id: postId,
    title: 'Sample Post Title',
    content: 'This is the content of the post.',
  });

  const { getPost, setLike, addComment } = usePostOperations();
  const {getS3ImageUrl} = useAccountOperations();


  useEffect(() => {
    // Fetch post data based on postId

    if(!postId){
      console.error("Post ID is not provided");
      return;
    }

    console.log("Post ID here:", postId);

    const fetchPost = async () => {
      // Simulate fetching post data

      try{
        const fetchedPost = await getPost(postId);
        const profilePictureUrl = await getS3ImageUrl(fetchedPost.data.postUser?.data.userAvatarUri);
        setPost({
          ...fetchedPost.data,
          profilePictureUrl: profilePictureUrl.href,
        });

        console.log("Fetched post:", fetchedPost);

      }catch(e){
        console.error("Error fetching post:", e);
      }
     
    };

    fetchPost();
  }, [postId]);





  const [comments, setComments] = React.useState([
    {
      id: '1',
      user: 'User1',
      comment: 'This is a great post!',
      replies: [
        {
          id: '1-1',
          user: 'User4',
          comment: 'I agree with you!',
          replies: [
            { id: '1-1-1', user: 'User6', comment: 'Absolutely!', replies: [] },
            { id: '1-1-2', user: 'User7', comment: 'Same here!', replies: [] },
          ],
        },
        { id: '1-2', user: 'User5', comment: 'Nice take!', replies: [] },
      ],
    },
    {
      id: '2',
      user: 'User2',
      comment: 'I disagree, but nice try!',
      replies: [],
    },
  ]);
  const [newComment, setNewComment] = React.useState('');
  const [newReply, setNewReply] = React.useState('');
  const [replyingTo, setReplyingTo] = React.useState<string | null>(null);

  const addCommentToPost = async () => {
    if (newComment.trim()) {

      // Call the addComment function from usePostOperations


      const commentData = {
        commentProductId: post.postProduct?.data.id,
        commentUserId: post.postUser?.data.id,
        commentText: newComment,
        parentCommentID: null, // Assuming this is a top-level comment
      }


      const commentResponse = await addComment(post.id, commentData);
      console.log("Comment response:", commentResponse);


      setComments([
        ...comments,
        { id: String(comments.length + 1), user: 'NewUser', comment: newComment, replies: [] },
      ]);
      setNewComment('');
    }
  };

  const addReply = (parentId: string) => {
    if (newReply.trim()) {

      // Call the addComment function from usePostOperations
      const replyData = {
        commentProductId: post.postProduct?.data.id,
        commentUserId: post.postUser?.data.id,
        commentText: newReply,
        parentCommentID: parentId,
      }
      const replyResponse = addComment(post.id, replyData);
      console.log("Reply response:", replyResponse);

      const updatedComments = addReplyRecursively(comments, parentId, newReply);
      setComments(updatedComments);
      setNewReply('');
      setReplyingTo(null);
    }
  };

  const addReplyRecursively = (commentsList, parentId, replyText) => {
    return commentsList.map((comment) => {
      if (!comment.replies) comment.replies = [];
      if (comment.id === parentId) {
        comment.replies.push({
          id: `${parentId}-${comment.replies.length + 1}`,
          user: 'NewUser',
          comment: replyText,
          replies: [],
        });
      } else {
        comment.replies = addReplyRecursively(comment.replies, parentId, replyText);
      }
      return comment;
    });
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentCard}>
      <Text style={styles.username}>{item.user}</Text>
      <Text style={styles.commentText}>{item.comment}</Text>

      <TouchableOpacity onPress={() => setReplyingTo(item.id)}>
        <Text style={styles.replyLink}>Reply</Text>
      </TouchableOpacity>

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

      {item.replies?.length > 0 && (
        <FlatList
          data={item.replies}
          renderItem={renderComment}
          keyExtractor={(reply) => reply.id}
          style={styles.repliesList}
        />
      )}
    </View>
  );

  const handleLike = async () => {
    console.log('Post liked');

    const response = await setLike(post.id, post.postUser?.data.id, 'post');
    console.log("Like response:", response);
  }
  const handleDislike = () => {
    console.log('Post disliked');
  }
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
              <View style={styles.postUserInfo}>
                <Image
                  source={{ uri: post.profilePictureUrl || 'https://via.placeholder.com/150' }}
                  style={styles.postUserAvatar}
                />
                <Text style={styles.username}>{post.postUser?.data?.userName}</Text>
              </View>

              <View style={styles.postUserInfo}>
            
                <Text style={styles.createdAtText}>{post.createdAt}</Text>  
              </View>

        </View>


    
        



        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.postContent}</Text>

        <View style={styles.postDetails}>
          <TouchableOpacity style={styles.postDetailsButton} onPress={handleLike}>
            <Ionicons name="heart" size={18} color="black" />
            <Text style={styles.metaText}>{post.postLikes?.data.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postDetailsButton} onPress={handleDislike}>
          <Ionicons name="heart-dislike" size={18} color="red" />
            <Text style={styles.metaText}>{post.postDislikes?.data.length}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.postDetailsButton} onPress={handleComment}>
          <Ionicons name="chatbubble-ellipses-sharp" size={18} color="black" />
            <Text style={styles.metaText}>{post.postComments?.data.length}</Text>
          </TouchableOpacity>
       
        </View>
      </View>
    
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 80 }}
        
      />

      <View style={styles.commentInputGroup}>
        <TextInput
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment..."
          style={styles.commentInput}
        />
        <Button title="Post" onPress={addCommentToPost} />
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f7fa',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  commentCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  username: {
    fontWeight: '600',
    color: '#333',
    fontSize: 14,
    marginBottom: 4,
  },
  commentText: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },
  replyLink: {
    color: '#007AFF',
    fontSize: 14,
    marginBottom: 8,
  },
  replyInputGroup: {
    marginTop: 10,
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: '#f9f9f9',
  },
  postView: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 2,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  postContent: {
    fontSize: 16,
    color: '#444',
  },
  postUserInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postUserName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postUserAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  postUserInfoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  postDetails: {
    flexDirection: 'row',
    marginTop: 12,
    gap: 5,
  },
  postDetailsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 8,
  },
  metaText: {
    marginLeft: 4,
    fontSize: 14,
    color: '#555',
  },
});

export default PostView;