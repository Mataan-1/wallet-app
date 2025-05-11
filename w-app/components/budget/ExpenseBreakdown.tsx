import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '@/constants/colors';
import { mockBudgets } from '@/data/mockBudgets';
import { formatCurrency } from '@/utils/formatters';

// Calculate total spent
const totalSpent = mockBudgets.reduce((acc, budget) => acc + budget.spent, 0);

const ExpenseBreakdown: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        {mockBudgets.map((budget, index) => {
          // Calculate percentage of total spent
          const percentage = (budget.spent / totalSpent) * 100;
          
          return (
            <View 
              key={index} 
              style={[
                styles.chartItem,
                { 
                  width: `${percentage}%`,
                  backgroundColor: budget.color
                }
              ]}
            />
          );
        })}
      </View>
      
      <View style={styles.legend}>
        {mockBudgets.map((budget, index) => {
          // Calculate percentage of total spent
          const percentage = (budget.spent / totalSpent) * 100;
          
          return (
            <View key={index} style={styles.legendItem}>
              <View style={styles.legendColorContainer}>
                <View 
                  style={[
                    styles.legendColor,
                    { backgroundColor: budget.color }
                  ]}
                />
              </View>
              <View style={styles.legendInfo}>
                <Text style={styles.legendCategory}>{budget.category}</Text>
                <Text style={styles.legendPercentage}>{percentage.toFixed(1)}%</Text>
              </View>
              <Text style={styles.legendAmount}>{formatCurrency(budget.spent)}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  chart: {
    flexDirection: 'row',
    height: 16,
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  chartItem: {
    height: '100%',
  },
  legend: {
    marginTop: 8,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  legendColorContainer: {
    width: 24,
    alignItems: 'center',
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  legendInfo: {
    flex: 1,
    marginLeft: 8,
  },
  legendCategory: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[800],
  },
  legendPercentage: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.gray[500],
  },
  legendAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    color: colors.gray[900],
  },
});

export default ExpenseBreakdown;