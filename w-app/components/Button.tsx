import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ActivityIndicator, 
  StyleProp, 
  ViewStyle, 
  TextStyle 
} from 'react-native';
import { colors } from '@/constants/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getButtonStyles = () => {
    let baseStyle: ViewStyle = styles.button;
    
    // Add variant styles
    if (variant === 'primary') {
      baseStyle = { ...baseStyle, ...styles.primaryButton };
    } else if (variant === 'outlined') {
      baseStyle = { ...baseStyle, ...styles.outlinedButton };
    } else if (variant === 'text') {
      baseStyle = { ...baseStyle, ...styles.textButton };
    }
    
    // Add size styles
    if (size === 'small') {
      baseStyle = { ...baseStyle, ...styles.smallButton };
    } else if (size === 'large') {
      baseStyle = { ...baseStyle, ...styles.largeButton };
    }
    
    // Add disabled styles
    if (disabled || loading) {
      if (variant === 'primary') {
        baseStyle = { ...baseStyle, ...styles.disabledPrimaryButton };
      } else if (variant === 'outlined') {
        baseStyle = { ...baseStyle, ...styles.disabledOutlinedButton };
      } else if (variant === 'text') {
        baseStyle = { ...baseStyle, ...styles.disabledTextButton };
      }
    }
    
    return baseStyle;
  };
  
  const getTextStyles = () => {
    let baseStyle: TextStyle = styles.buttonText;
    
    // Add variant styles
    if (variant === 'primary') {
      baseStyle = { ...baseStyle, ...styles.primaryButtonText };
    } else if (variant === 'outlined') {
      baseStyle = { ...baseStyle, ...styles.outlinedButtonText };
    } else if (variant === 'text') {
      baseStyle = { ...baseStyle, ...styles.textButtonText };
    }
    
    // Add size styles
    if (size === 'small') {
      baseStyle = { ...baseStyle, ...styles.smallButtonText };
    } else if (size === 'large') {
      baseStyle = { ...baseStyle, ...styles.largeButtonText };
    }
    
    // Add disabled styles
    if (disabled || loading) {
      if (variant === 'primary') {
        baseStyle = { ...baseStyle, ...styles.disabledPrimaryButtonText };
      } else if (variant === 'outlined' || variant === 'text') {
        baseStyle = { ...baseStyle, ...styles.disabledOutlinedButtonText };
      }
    }
    
    return baseStyle;
  };
  
  const getSpinnerColor = () => {
    if (variant === 'primary') {
      return colors.white;
    } else {
      return colors.primary[700];
    }
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={getSpinnerColor()} size="small" />
      ) : (
        <Text style={[getTextStyles(), textStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary[700],
    borderWidth: 0,
  },
  outlinedButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.primary[700],
  },
  textButton: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    paddingHorizontal: 0,
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledPrimaryButton: {
    backgroundColor: colors.gray[300],
    borderWidth: 0,
  },
  disabledOutlinedButton: {
    borderColor: colors.gray[300],
  },
  disabledTextButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
  },
  primaryButtonText: {
    color: colors.white,
  },
  outlinedButtonText: {
    color: colors.primary[700],
  },
  textButtonText: {
    color: colors.primary[700],
  },
  smallButtonText: {
    fontSize: 14,
  },
  largeButtonText: {
    fontSize: 18,
  },
  disabledPrimaryButtonText: {
    color: colors.white,
  },
  disabledOutlinedButtonText: {
    color: colors.gray[500],
  },
});

export default Button;