import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '@/constants/colors';
import { formatCurrency, formatMonthDay } from '@/utils/formatters';

interface Transaction {
  id: string;
  title: string;
  amount: number;
  date: Date;
  type: 'expense' | 'income';
  category: string;
  merchant: string;
}

interface TransactionItemProps {
  transaction: Transaction;
  onPress?: () => void;
}

const TransactionItem: React.FC<TransactionItemProps> = ({ transaction, onPress }) => {
  // Get category color based on category name
  const getCategoryColor = (category: string): string => {
    const categoryColors = {
      'Food': colors.secondary[500],
      'Shopping': colors.accent[500],
      'Transport': colors.primary[500],
      'Entertainment': colors.warning[500],
      'Bills': colors.error[500],
      'Salary': colors.success[500],
      'Transfer': colors.primary[300],
    };
    
    // Default to primary if category not found
    return categoryColors[category] || colors.primary[500];
  };
  
  // Get first letter of category
  const getCategoryInitial = (category: string): string => {
    return category.charAt(0).toUpperCase();
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View 
        style={[
          styles.categoryIcon, 
          { backgroundColor: getCategoryColor(transaction.category) }
        ]}
      >
        <Text style={styles.categoryInitial}>
          {getCategoryInitial(transaction.category)}
        </Text>
      </View>
      
      <View style={styles.infoContainer}>
        <View style={styles.mainInfo}>
          <Text style={styles.title}>
            {transaction.title}
          </Text>
          <Text 
            style={[
              styles.amount, 
              transaction.type === 'income' ? styles.incomeText : styles.expenseText
            ]}
          >
            {transaction.type === 'income' ? '+' : '-'} {formatCurrency(transaction.amount)}
          </Text>
        </View>
        
        <View style={styles.secondaryInfo}>
          <Text style={styles.merchant}>
            {transaction.merchant}
          </Text>
          <Text style={styles.date}>
            {formatMonthDay(transaction.date)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  categoryIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  categoryInitial: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.white,
  },
  infoContainer: {
    flex: 1,
  },
  mainInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[900],
  },
  amount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
  },
  incomeText: {
    color: colors.success[600],
  },
  expenseText: {
    color: colors.error[600],
  },
  secondaryInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  merchant: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: colors.gray[600],
  },
  date: {
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    color: colors.gray[500],
  },
});

export default TransactionItem;