import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { TrendingUp, Wallet, PiggyBank, ArrowRight } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';

interface InsightSectionProps {
  onViewAll?: () => void;
}

const InsightSection: React.FC<InsightSectionProps> = ({ onViewAll }) => {
  const insights = {
    investment: {
      performance: 12.5,
      totalValue: 25000,
      recommendations: [
        'Tech stocks showing strong growth potential',
        'Consider diversifying into emerging markets',
        'Bond yields are increasing'
      ]
    },
    savings: {
      monthlyRate: 15.8,
      totalSaved: 12750,
      goals: {
        current: 12750,
        target: 20000
      }
    },
    spending: {
      monthlyChange: -8.5,
      topCategories: [
        { name: 'Dining', amount: 450, change: 12 },
        { name: 'Shopping', amount: 380, change: -15 },
        { name: 'Transport', amount: 220, change: 5 }
      ]
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Financial Insights</Text>
        <TouchableOpacity onPress={onViewAll}>
          <Text style={styles.viewAll}>View All</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Investment Insights */}
        <View style={[styles.card, { backgroundColor: colors.primary[50] }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: colors.primary[100] }]}>
              <TrendingUp size={24} color={colors.primary[700]} />
            </View>
            <ArrowRight size={20} color={colors.primary[700]} />
          </View>
          <Text style={styles.cardTitle}>Investment Insights</Text>
          <Text style={[styles.performanceText, { color: colors.primary[700] }]}>
            +{insights.investment.performance}% growth
          </Text>
          <Text style={styles.valueText}>
            Portfolio value: {formatCurrency(insights.investment.totalValue)}
          </Text>
          <View style={styles.recommendationContainer}>
            <Text style={styles.recommendationText}>
              {insights.investment.recommendations[0]}
            </Text>
          </View>
        </View>

        {/* Savings Insights */}
        <View style={[styles.card, { backgroundColor: colors.success[50] }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: colors.success[100] }]}>
              <PiggyBank size={24} color={colors.success[700]} />
            </View>
            <ArrowRight size={20} color={colors.success[700]} />
          </View>
          <Text style={styles.cardTitle}>Savings Insights</Text>
          <Text style={[styles.performanceText, { color: colors.success[700] }]}>
            +{insights.savings.monthlyRate}% this month
          </Text>
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill,
                  { 
                    width: `${(insights.savings.goals.current / insights.savings.goals.target) * 100}%`,
                    backgroundColor: colors.success[500]
                  }
                ]} 
              />
            </View>
            <Text style={styles.progressText}>
              {formatCurrency(insights.savings.goals.current)} of {formatCurrency(insights.savings.goals.target)} goal
            </Text>
          </View>
        </View>

        {/* Spending Insights */}
        <View style={[styles.card, { backgroundColor: colors.warning[50] }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.iconContainer, { backgroundColor: colors.warning[100] }]}>
              <Wallet size={24} color={colors.warning[700]} />
            </View>
            <ArrowRight size={20} color={colors.warning[700]} />
          </View>
          <Text style={styles.cardTitle}>Spending Insights</Text>
          <Text style={[styles.performanceText, { color: colors.warning[700] }]}>
            {insights.spending.monthlyChange}% vs last month
          </Text>
          <Text style={styles.subTitle}>Top Categories</Text>
          {insights.spending.topCategories.map((category, index) => (
            <View key={index} style={styles.categoryRow}>
              <Text style={styles.categoryName}>{category.name}</Text>
              <View style={styles.categoryInfo}>
                <Text style={styles.categoryAmount}>
                  {formatCurrency(category.amount)}
                </Text>
                <Text style={[
                  styles.categoryChange,
                  { color: category.change > 0 ? colors.error[600] : colors.success[600] }
                ]}>
                  {category.change > 0 ? '+' : ''}{category.change}%
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.gray[900],
  },
  viewAll: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary[700],
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: 300,
    padding: 16,
    borderRadius: 16,
    marginRight: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[900],
    marginBottom: 8,
  },
  performanceText: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    marginBottom: 8,
  },
  valueText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[700],
    marginBottom: 12,
  },
  recommendationContainer: {
    backgroundColor: colors.white,
    padding: 12,
    borderRadius: 8,
  },
  recommendationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[700],
  },
  progressContainer: {
    marginTop: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.gray[200],
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  progressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[700],
  },
  subTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[700],
    marginBottom: 8,
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[700],
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryAmount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[900],
    marginRight: 8,
  },
  categoryChange: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
});

export default InsightSection;