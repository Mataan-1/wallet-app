import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUpRight, Plus, Wallet } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';
import { mockCards } from '@/data/mockCards';
import { mockTransactions } from '@/data/mockTransactions';
import CardCarousel from '@/components/home/CardCarousel';
import InsightSection from '@/components/home/InsightSection';
import TransactionItem from '@/components/TransactionItem';

export default function HomeScreen() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [cards, setCards] = useState(mockCards);
  const [recentTransactions, setRecentTransactions] = useState(mockTransactions.slice(0, 4));
  const [totalBalance, setTotalBalance] = useState(0);

  useEffect(() => {
    calculateTotalBalance();
  }, [cards]);

  const calculateTotalBalance = () => {
    const total = cards.reduce((sum, card) => sum + card.balance, 0);
    setTotalBalance(total);
  };

  const onRefresh = () => {
    setIsRefreshing(true);
    // Simulate API fetch with timeout
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning</Text>
            <Text style={styles.userName}>Alex Johnson</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Wallet size={24} color={colors.primary[700]} />
          </TouchableOpacity>
        </View>

        <Animated.View entering={FadeIn.delay(100)} style={styles.balanceContainer}>
          <Text style={styles.balanceLabel}>Total Balance</Text>
          <Text style={styles.balanceAmount}>{formatCurrency(totalBalance)}</Text>
          <View style={styles.balanceChangeContainer}>
            <ArrowUpRight size={16} color={colors.success[500]} />
            <Text style={styles.balanceChangeText}>2.4% from last month</Text>
          </View>
        </Animated.View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>My Cards</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <CardCarousel cards={cards} />
          <TouchableOpacity style={styles.addCardButton}>
            <Plus size={20} color={colors.primary[700]} />
            <Text style={styles.addCardText}>Add New Card</Text>
          </TouchableOpacity>
        </View>

        <InsightSection />

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          {recentTransactions.map((transaction, index) => (
            <TransactionItem key={index} transaction={transaction} />
          ))}
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
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
  },
  userName: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: colors.gray[900],
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  balanceContainer: {
    padding: 24,
    backgroundColor: colors.primary[700],
    borderRadius: 16,
    marginBottom: 24,
  },
  balanceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary[200],
    marginBottom: 8,
  },
  balanceAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: colors.white,
    marginBottom: 12,
  },
  balanceChangeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  balanceChangeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.white,
    marginLeft: 4,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.gray[900],
  },
  seeAllButton: {},
  seeAllText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary[700],
  },
  addCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary[300],
    borderRadius: 12,
    paddingVertical: 12,
    marginTop: 16,
  },
  addCardText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary[700],
    marginLeft: 8,
  },
});