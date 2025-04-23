import React from 'react';
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
} from 'react-native';

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

  const addComment = () => {
    if (newComment.trim()) {
      setComments([
        ...comments,
        { id: String(comments.length + 1), user: 'NewUser', comment: newComment, replies: [] },
      ]);
      setNewComment('');
    }
  };

  const addReply = (parentId: string) => {
    if (newReply.trim()) {
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

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
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
        <Button title="Post" onPress={addComment} />
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
});

export default PostView;