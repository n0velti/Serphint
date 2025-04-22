import React from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

const PostView = () => {
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
            { id: '1-1-1', user: 'User6', comment: 'Absolutely!' },
            { id: '1-1-2', user: 'User7', comment: 'Same here!' },
          ],
        },
        { id: '1-2', user: 'User5', comment: 'Nice take!', replies: [] },
      ],
    },
    {
      id: '2',
      user: 'User2',
      comment: 'I disagree, but nice try!',
      replies: [], // Ensure replies is always an array, even if empty
    },
  ]);
  const [newComment, setNewComment] = React.useState('');
  const [newReply, setNewReply] = React.useState('');
  const [replyingTo, setReplyingTo] = React.useState(null);

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: String(comments.length + 1), user: 'NewUser', comment: newComment, replies: [] },
      ]);
      setNewComment('');
    }
  };

  const addReply = (parentId) => {
    if (newReply.trim()) {
      const updatedComments = addReplyRecursively(comments, parentId, newReply);
      setComments(updatedComments);
      setNewReply('');
      setReplyingTo(null);
    }
  };

  const addReplyRecursively = (comments, parentId, replyText) => {
    return comments.map((comment) => {
      // Ensure replies is an array
      if (!comment.replies) {
        comment.replies = [];
      }

      if (comment.id === parentId) {
        // Push new reply to the replies array
        comment.replies.push({
          id: `${parentId}-${comment.replies.length + 1}`,
          user: 'NewUser',
          comment: replyText,
          replies: [], // Initialize empty array for replies to this reply
        });
      } else if (comment.replies && comment.replies.length > 0) {
        // Recurse into replies if not found at current level
        comment.replies = addReplyRecursively(comment.replies, parentId, replyText);
      }

      return comment;
    });
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.userName}>{item.user}</Text>
      <Text style={styles.commentText}>{item.comment}</Text>
      <TouchableOpacity onPress={() => setReplyingTo(item.id)}>
        <Text style={styles.replyText}>Reply</Text>
      </TouchableOpacity>

      {/* Ensure replies exist and render them recursively */}
      {item.replies && item.replies.length > 0 && (
        <FlatList
          data={item.replies}
          renderItem={renderComment} // Recursively render replies
          keyExtractor={(reply) => reply.id}
          style={styles.repliesContainer}
        />
      )}

      {replyingTo === item.id && (
        <View style={styles.replyInputContainer}>
          <TextInput
            style={styles.input}
            value={newReply}
            onChangeText={setNewReply}
            placeholder="Write a reply..."
          />
          <Button title="Post Reply" onPress={() => addReply(item.id)} />
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Add a comment"
        />
        <Button title="Post" onPress={addComment} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  commentContainer: {
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  repliesContainer: {
    marginLeft: 20,
  },
  reply: {
    borderLeftWidth: 2,
    borderLeftColor: '#ccc',
    marginLeft: 10,
    paddingLeft: 10,
  },
  userName: {
    fontWeight: 'bold',
  },
  commentText: {
    marginTop: 5,
    fontSize: 16,
  },
  replyText: {
    marginTop: 5,
    color: '#007bff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  replyInputContainer: {
    marginTop: 10,
    paddingTop: 5,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
});

export default PostView;