import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { TrendingUp, TrendingDown, TriangleAlert as AlertTriangle, ArrowRight } from 'lucide-react-native';

interface InsightCardProps {
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'warning' | 'neutral';
  onPress?: () => void;
}

const InsightCard: React.FC<InsightCardProps> = ({
  title,
  description,
  type,
  onPress,
}) => {
  const getCardStyle = () => {
    switch (type) {
      case 'positive':
        return {
          backgroundColor: colors.success[50],
          borderColor: colors.success[200],
          iconColor: colors.success[600],
          icon: <TrendingUp size={20} color={colors.success[600]} />,
        };
      case 'negative':
        return {
          backgroundColor: colors.error[50],
          borderColor: colors.error[200],
          iconColor: colors.error[600],
          icon: <TrendingDown size={20} color={colors.error[600]} />,
        };
      case 'warning':
        return {
          backgroundColor: colors.warning[50],
          borderColor: colors.warning[200],
          iconColor: colors.warning[600],
          icon: <AlertTriangle size={20} color={colors.warning[600]} />,
        };
      default:
        return {
          backgroundColor: colors.primary[50],
          borderColor: colors.primary[200],
          iconColor: colors.primary[600],
          icon: <TrendingUp size={20} color={colors.primary[600]} />,
        };
    }
  };

  const cardStyle = getCardStyle();

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: cardStyle.backgroundColor, borderColor: cardStyle.borderColor }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={[styles.iconContainer, { backgroundColor: cardStyle.backgroundColor }]}>
          {cardStyle.icon}
        </View>
        <ArrowRight size={16} color={colors.gray[500]} />
      </View>
      
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 260,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[900],
    marginBottom: 8,
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[700],
    lineHeight: 20,
  },
});

export default InsightCard;