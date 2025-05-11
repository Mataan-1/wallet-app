import { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { mockTransactions } from '@/data/mockTransactions';
import TransactionItem from '@/components/TransactionItem';
import FilterSheet from '@/components/transactions/FilterSheet';

const categories = ['All', 'Income', 'Shopping', 'Food', 'Transport', 'Bills', 'Entertainment'];

export default function TransactionsScreen() {
  const [transactions, setTransactions] = useState(mockTransactions);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isFilterSheetVisible, setIsFilterSheetVisible] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  
  const filterSheetRef = useRef(null);

  const toggleFilterSheet = () => {
    setIsFilterSheetVisible(!isFilterSheetVisible);
  };

  const applyFilters = (filters) => {
    setSortBy(filters.sortBy);
    setSortOrder(filters.sortOrder);
    setDateRange(filters.dateRange);
    setIsFilterSheetVisible(false);
    
    // Apply filtering and sorting to transactions
    // This would normally involve backend API calls or local filtering
    // For now we'll just simulate it with a timeout
    setTimeout(() => {
      // Pretend we got filtered results
      const filteredTransactions = [...mockTransactions];
      setTransactions(filteredTransactions);
    }, 500);
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    
    if (category === 'All') {
      setTransactions(mockTransactions);
    } else {
      const filteredTransactions = mockTransactions.filter(
        transaction => transaction.category.toLowerCase() === category.toLowerCase()
      );
      setTransactions(filteredTransactions);
    }
  };

  const searchTransactions = (query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      filterByCategory(selectedCategory);
      return;
    }
    
    const filteredTransactions = mockTransactions.filter(
      transaction => 
        transaction.title.toLowerCase().includes(query.toLowerCase()) ||
        transaction.merchant.toLowerCase().includes(query.toLowerCase())
    );
    
    setTransactions(filteredTransactions);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryItem,
        selectedCategory === item && styles.selectedCategoryItem
      ]}
      onPress={() => filterByCategory(item)}
    >
      <Text 
        style={[
          styles.categoryText,
          selectedCategory === item && styles.selectedCategoryText
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Transactions</Text>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={toggleFilterSheet}
        >
          <SlidersHorizontal size={20} color={colors.primary[700]} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Search size={20} color={colors.gray[500]} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions"
          placeholderTextColor={colors.gray[400]}
          value={searchQuery}
          onChangeText={searchTransactions}
        />
      </View>

      <View style={styles.categoriesContainer}>
        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesList}
        />
      </View>

      <View style={styles.sortSection}>
        <Text style={styles.sortLabel}>Sort by:</Text>
        <TouchableOpacity 
          style={styles.sortSelector}
          onPress={toggleFilterSheet}
        >
          <Text style={styles.sortValue}>
            {sortBy === 'date' ? 'Date' : sortBy === 'amount' ? 'Amount' : 'Alphabetical'}
          </Text>
          <ChevronDown size={16} color={colors.gray[700]} />
        </TouchableOpacity>
      </View>

      <Animated.View entering={FadeIn} style={styles.transactionsList}>
        <FlatList
          data={transactions}
          renderItem={({ item }) => <TransactionItem transaction={item} />}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.transactionsListContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No transactions found</Text>
            </View>
          }
        />
      </Animated.View>

      <FilterSheet
        isVisible={isFilterSheetVisible}
        onClose={() => setIsFilterSheetVisible(false)}
        onApply={applyFilters}
        initialValues={{ sortBy, sortOrder, dateRange }}
      />
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
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    marginHorizontal: 16,
    paddingHorizontal: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.gray[900],
  },
  categoriesContainer: {
    marginBottom: 16,
  },
  categoriesList: {
    paddingHorizontal: 16,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    marginRight: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  selectedCategoryItem: {
    backgroundColor: colors.primary[700],
    borderColor: colors.primary[700],
  },
  categoryText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[700],
  },
  selectedCategoryText: {
    color: colors.white,
  },
  sortSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  sortLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginRight: 8,
  },
  sortSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.gray[200],
  },
  sortValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[800],
    marginRight: 4,
  },
  transactionsList: {
    flex: 1,
  },
  transactionsListContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[500],
  },
});