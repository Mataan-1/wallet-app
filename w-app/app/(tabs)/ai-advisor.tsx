import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, SlideInUp } from 'react-native-reanimated';
import { Send, Info, Sparkles } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import ChatMessage from '@/components/advisor/ChatMessage';
import { mockMessages } from '@/data/mockMessages';
import { mockSuggestions } from '@/data/mockSuggestions';

export default function AIAdvisorScreen() {
  const [messages, setMessages] = useState(mockMessages);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestions, setSuggestions] = useState(mockSuggestions);
  
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = () => {
    if (inputText.trim() === '') return;
    
    // Add user message
    const newUserMessage = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prevMessages => [...prevMessages, newUserMessage]);
    setInputText('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Scroll to bottom
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const responseOptions = [
        "Based on your spending habits, I recommend setting aside 20% of your income for savings each month.",
        "Looking at your recent transactions, I notice you've been spending more on dining out. Would you like me to suggest a budget for this category?",
        "I've analyzed your accounts and noticed a recurring subscription you haven't used in 3 months. Would you like to consider canceling it to save money?",
        "Based on your financial goals, you're on track to reach your savings target by December. Great job!",
      ];
      
      const newAIMessage = {
        id: (Date.now() + 1).toString(),
        text: responseOptions[Math.floor(Math.random() * responseOptions.length)],
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages(prevMessages => [...prevMessages, newAIMessage]);
      setIsTyping(false);
      
      // Scroll to bottom again after AI responds
      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }, 1500);
  };

  const handleSuggestionPress = (suggestion: string) => {
    setInputText(suggestion);
  };

  // Auto scroll to bottom when keyboard appears
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        scrollViewRef.current?.scrollToEnd({ animated: true });
      }
    );

    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI Financial Advisor</Text>
        <TouchableOpacity style={styles.infoButton}>
          <Info size={20} color={colors.primary[700]} />
        </TouchableOpacity>
      </View>

      <View style={styles.aiInfoCard}>
        <View style={styles.aiInfoIconContainer}>
          <Sparkles size={20} color={colors.white} />
        </View>
        <View style={styles.aiInfoContent}>
          <Text style={styles.aiInfoTitle}>Smart Financial Assistant</Text>
          <Text style={styles.aiInfoDescription}>
            Ask questions about your finances, get budgeting tips, or request savings recommendations.
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 90}
        style={styles.chatContainer}
      >
        <ScrollView
          ref={scrollViewRef}
          style={styles.messagesContainer}
          contentContainerStyle={styles.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, index) => (
            <ChatMessage
              key={message.id}
              message={message}
              isFirst={index === 0 || messages[index - 1].sender !== message.sender}
            />
          ))}
          
          {isTyping && (
            <Animated.View 
              entering={FadeIn}
              style={[styles.messageContainer, styles.aiMessageContainer, styles.firstInGroup]}
            >
              <View style={styles.typingIndicator}>
                <View style={styles.typingDot} />
                <View style={[styles.typingDot, styles.typingDotMiddle]} />
                <View style={styles.typingDot} />
              </View>
            </Animated.View>
          )}
        </ScrollView>

        <View style={styles.suggestionsContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsList}
          >
            {suggestions.map((suggestion, index) => (
              <TouchableOpacity
                key={index}
                style={styles.suggestionItem}
                onPress={() => handleSuggestionPress(suggestion)}
              >
                <Text style={styles.suggestionText}>{suggestion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything about your finances..."
            placeholderTextColor={colors.gray[400]}
            value={inputText}
            onChangeText={setInputText}
            multiline
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              !inputText.trim() && styles.sendButtonDisabled
            ]}
            onPress={sendMessage}
            disabled={!inputText.trim()}
          >
            <Send size={20} color={inputText.trim() ? colors.white : colors.gray[400]} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  headerTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.gray[900],
  },
  infoButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary[50],
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  aiInfoIconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary[700],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  aiInfoContent: {
    flex: 1,
  },
  aiInfoTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[900],
    marginBottom: 4,
  },
  aiInfoDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[700],
    lineHeight: 20,
  },
  chatContainer: {
    flex: 1,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  messageContainer: {
    maxWidth: '80%',
    marginBottom: 8,
    borderRadius: 16,
    padding: 12,
  },
  aiMessageContainer: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray[200],
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  firstInGroup: {
    marginTop: 8,
  },
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 60,
  },
  typingDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.gray[400],
    marginHorizontal: 2,
    opacity: 0.6,
    // Animation would be added with useAnimatedStyle in a real implementation
  },
  typingDotMiddle: {
    opacity: 0.8,
  },
  suggestionsContainer: {
    padding: 8,
  },
  suggestionsList: {
    paddingHorizontal: 8,
  },
  suggestionItem: {
    backgroundColor: colors.white,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  suggestionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[800],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    flex: 1,
    backgroundColor: colors.gray[100],
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    paddingRight: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.gray[900],
    maxHeight: 100,
  },
  sendButton: {
    position: 'absolute',
    right: 24,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.primary[700],
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.gray[300],
  },
});