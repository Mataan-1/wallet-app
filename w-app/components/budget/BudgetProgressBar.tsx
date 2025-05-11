import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors } from '@/constants/colors';

interface BudgetProgressBarProps {
  percentage: number;
  color?: string;
  height?: number;
}

const BudgetProgressBar: React.FC<BudgetProgressBarProps> = ({
  percentage,
  color = colors.primary[700],
  height = 8,
}) => {
  // Ensure percentage is between 0 and 100
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  
  // Shared value for animating the progress
  const progress = useSharedValue(0);
  
  // Animated style for the progress bar
  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value}%`,
      backgroundColor: color,
    };
  });
  
  // Animate the progress to the current percentage
  React.useEffect(() => {
    progress.value = withTiming(clampedPercentage, { duration: 1000 });
  }, [clampedPercentage]);

  return (
    <View 
      style={[
        styles.container,
        { height }
      ]}
    >
      <Animated.View style={[styles.progress, progressStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    borderRadius: 4,
  },
});

export default BudgetProgressBar;