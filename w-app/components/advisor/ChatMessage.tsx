import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { formatTime } from '@/utils/formatters';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isFirst: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isFirst }) => {
  const isUserMessage = message.sender === 'user';
  
  return (
    <View 
      style={[
        styles.container,
        isUserMessage ? styles.userContainer : styles.aiContainer,
        isFirst && styles.firstInGroup
      ]}
    >
      <Text style={isUserMessage ? styles.userText : styles.aiText}>
        {message.text}
      </Text>
      <Text style={isUserMessage ? styles.userTimestamp : styles.aiTimestamp}>
        {formatTime(message.timestamp)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
    borderRadius: 16,
  },
  userContainer: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary[700],
    borderBottomRightRadius: 4,
  },
  aiContainer: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  firstInGroup: {
    marginTop: 8,
  },
  userText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.white,
  },
  aiText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.gray[900],
  },
  userTimestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  aiTimestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.gray[500],
    marginTop: 4,
    alignSelf: 'flex-end',
  },
});

export default ChatMessage;