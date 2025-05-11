import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { mockBudgets } from '@/data/mockBudgets';
import { formatCurrency } from '@/utils/formatters';
import BudgetProgressBar from '@/components/budget/BudgetProgressBar';
import ExpenseBreakdown from '@/components/budget/ExpenseBreakdown';

export default function BudgetScreen() {
  const [budgets, setBudgets] = useState(mockBudgets);
  const [selectedMonth, setSelectedMonth] = useState('August 2025');
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [monthlySpent, setMonthlySpent] = useState(4250);
  const [monthlyBudget, setMonthlyBudget] = useState(6000);

  // Calculate the total spent and total budget
  const totalSpent = budgets.reduce((acc, budget) => acc + budget.spent, 0);
  const totalBudget = budgets.reduce((acc, budget) => acc + budget.limit, 0);
  
  // Calculate the percentage of total budget spent
  const totalSpentPercentage = (totalSpent / totalBudget) * 100;

  const toggleMonthPicker = () => {
    setShowMonthPicker(!showMonthPicker);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Budget</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.monthSelector}>
          <TouchableOpacity 
            style={styles.monthSelectorButton}
            onPress={toggleMonthPicker}
          >
            <Text style={styles.monthText}>{selectedMonth}</Text>
            {showMonthPicker ? (
              <ChevronUp size={20} color={colors.gray[700]} />
            ) : (
              <ChevronDown size={20} color={colors.gray[700]} />
            )}
          </TouchableOpacity>
          
          {showMonthPicker && (
            <Animated.View 
              entering={FadeIn}
              style={styles.monthPickerContainer}
            >
              <TouchableOpacity 
                style={styles.monthOption}
                onPress={() => {
                  setSelectedMonth('July 2025');
                  setShowMonthPicker(false);
                }}
              >
                <Text style={styles.monthOptionText}>July 2025</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.monthOption, styles.selectedMonthOption]}
                onPress={() => {
                  setSelectedMonth('August 2025');
                  setShowMonthPicker(false);
                }}
              >
                <Text style={[styles.monthOptionText, styles.selectedMonthOptionText]}>
                  August 2025
                </Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.monthOption}
                onPress={() => {
                  setSelectedMonth('September 2025');
                  setShowMonthPicker(false);
                }}
              >
                <Text style={styles.monthOptionText}>September 2025</Text>
              </TouchableOpacity>
            </Animated.View>
          )}
        </View>

        <View style={styles.overviewCard}>
          <View style={styles.summaryRow}>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Monthly Budget</Text>
              <Text style={styles.summaryValue}>{formatCurrency(monthlyBudget)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Spent So Far</Text>
              <Text style={styles.summaryValue}>{formatCurrency(monthlySpent)}</Text>
            </View>
          </View>
          
          <View style={styles.overallProgress}>
            <View style={styles.progressLabelRow}>
              <Text style={styles.progressLabel}>
                {totalSpentPercentage.toFixed(0)}% of budget used
              </Text>
              <Text style={styles.progressAmount}>
                {formatCurrency(totalSpent)} / {formatCurrency(totalBudget)}
              </Text>
            </View>
            <BudgetProgressBar 
              percentage={totalSpentPercentage} 
              color={totalSpentPercentage > 90 ? colors.error[500] : 
                    totalSpentPercentage > 75 ? colors.warning[500] : 
                    colors.success[500]} 
            />
          </View>
        </View>

        <View style={styles.breakdownSection}>
          <Text style={styles.sectionTitle}>Expense Breakdown</Text>
          <ExpenseBreakdown />
        </View>

        <View style={styles.categoriesSection}>
          <Text style={styles.sectionTitle}>Categories</Text>
          
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.limit) * 100;
            const progressColor = percentage > 90 ? colors.error[500] : 
                                percentage > 75 ? colors.warning[500] : 
                                colors.success[500];
            
            return (
              <View key={index} style={styles.categoryCard}>
                <View style={styles.categoryHeader}>
                  <View style={styles.categoryInfo}>
                    <View 
                      style={[styles.categoryIcon, { backgroundColor: budget.color }]}
                    >
                      {/* Icon would go here */}
                    </View>
                    <Text style={styles.categoryName}>{budget.category}</Text>
                  </View>
                  <View style={styles.categoryAmounts}>
                    <Text style={styles.amountSpent}>{formatCurrency(budget.spent)}</Text>
                    <Text style={styles.amountLimit}>/ {formatCurrency(budget.limit)}</Text>
                  </View>
                </View>
                
                <BudgetProgressBar 
                  percentage={percentage} 
                  color={progressColor} 
                />
              </View>
            );
          })}
          
          <TouchableOpacity style={styles.addCategoryButton}>
            <Plus size={20} color={colors.primary[700]} />
            <Text style={styles.addCategoryText}>Add Category</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[700],
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
  },
  monthSelector: {
    position: 'relative',
    zIndex: 10,
    marginBottom: 16,
  },
  monthSelectorButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  monthText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[800],
  },
  monthPickerContainer: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    borderRadius: 12,
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.gray[200],
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 20,
  },
  monthOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  selectedMonthOption: {
    backgroundColor: colors.primary[50],
  },
  monthOptionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[800],
  },
  selectedMonthOptionText: {
    color: colors.primary[700],
  },
  overviewCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 4,
  },
  summaryValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.gray[900],
  },
  overallProgress: {
    marginTop: 8,
  },
  progressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[700],
  },
  progressAmount: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[700],
  },
  breakdownSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.gray[900],
    marginBottom: 16,
  },
  categoriesSection: {
    marginBottom: 32,
  },
  categoryCard: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary[500],
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryName: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[800],
  },
  categoryAmounts: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountSpent: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[900],
  },
  amountLimit: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.gray[500],
  },
  addCategoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary[300],
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 8,
  },
  addCategoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary[700],
    marginLeft: 8,
  },
});