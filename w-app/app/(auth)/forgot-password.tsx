import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Mail, ArrowLeft } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Button from '@/components/Button';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleResetPassword = async () => {
    // Form validation
    if (!email) {
      setError('Email is required');
      return;
    }
    
    setIsLoading(true);
    setError(null);
    
    // Simulate API call for demo purposes
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      // Normally we would trigger a password reset email via Firebase Auth here
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color={colors.gray[900]} />
        </TouchableOpacity>
        
        <View style={styles.content}>
          <View style={styles.headerContainer}>
            <Text style={styles.title}>Forgot Password?</Text>
            <Text style={styles.subtitle}>
              {isSubmitted
                ? "Check your email for a link to reset your password."
                : "Enter your email address and we'll send you a link to reset your password."}
            </Text>
          </View>

          {!isSubmitted ? (
            <View style={styles.formContainer}>
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              )}

              <View style={styles.inputContainer}>
                <Mail size={20} color={colors.gray[600]} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  placeholderTextColor={colors.gray[400]}
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>

              <Button
                title="Reset Password"
                onPress={handleResetPassword}
                loading={isLoading}
                style={styles.resetButton}
              />
            </View>
          ) : (
            <View style={styles.formContainer}>
              <Button
                title="Back to Login"
                onPress={() => router.push('/login')}
                style={styles.loginButton}
              />
              <Button
                title="Resend Email"
                onPress={handleResetPassword}
                variant="outlined"
                loading={isLoading}
                style={styles.resendButton}
              />
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 32,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 28,
    color: colors.primary[800],
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.gray[600],
    lineHeight: 24,
  },
  formContainer: {
    width: '100%',
  },
  errorContainer: {
    backgroundColor: colors.error[50],
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.error[300],
  },
  errorText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.error[700],
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.gray[300],
    borderRadius: 8,
    backgroundColor: colors.white,
    height: 56,
  },
  inputIcon: {
    marginLeft: 16,
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.gray[900],
  },
  resetButton: {
    marginBottom: 16,
  },
  loginButton: {
    marginBottom: 16,
  },
  resendButton: {
    marginBottom: 16,
  }
});