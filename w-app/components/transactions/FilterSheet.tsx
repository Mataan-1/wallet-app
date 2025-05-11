import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  ScrollView, 
  Pressable 
} from 'react-native';
import { X, Check } from 'lucide-react-native';
import { colors } from '@/constants/colors';
import Button from '@/components/Button';

interface FilterSheetProps {
  isVisible: boolean;
  onClose: () => void;
  onApply: (filters: any) => void;
  initialValues: {
    sortBy: string;
    sortOrder: string;
    dateRange: {
      start: Date | null;
      end: Date | null;
    };
  };
}

const FilterSheet: React.FC<FilterSheetProps> = ({
  isVisible,
  onClose,
  onApply,
  initialValues,
}) => {
  const [sortBy, setSortBy] = useState(initialValues.sortBy);
  const [sortOrder, setSortOrder] = useState(initialValues.sortOrder);
  const [dateRange, setDateRange] = useState(initialValues.dateRange);

  const handleApply = () => {
    onApply({
      sortBy,
      sortOrder,
      dateRange,
    });
  };

  const handleReset = () => {
    setSortBy('date');
    setSortOrder('desc');
    setDateRange({ start: null, end: null });
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Pressable style={styles.dismissArea} onPress={onClose} />
        
        <View style={styles.sheetContainer}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter Transactions</Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <X size={24} color={colors.gray[600]} />
            </TouchableOpacity>
          </View>
          
          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort By</Text>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => setSortBy('date')}
              >
                <Text style={styles.optionText}>Date</Text>
                {sortBy === 'date' && (
                  <Check size={20} color={colors.primary[700]} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => setSortBy('amount')}
              >
                <Text style={styles.optionText}>Amount</Text>
                {sortBy === 'amount' && (
                  <Check size={20} color={colors.primary[700]} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => setSortBy('name')}
              >
                <Text style={styles.optionText}>Alphabetical</Text>
                {sortBy === 'name' && (
                  <Check size={20} color={colors.primary[700]} />
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sort Order</Text>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => setSortOrder('asc')}
              >
                <Text style={styles.optionText}>
                  {sortBy === 'date' ? 'Oldest First' : 
                   sortBy === 'amount' ? 'Lowest First' : 
                   'A to Z'}
                </Text>
                {sortOrder === 'asc' && (
                  <Check size={20} color={colors.primary[700]} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => setSortOrder('desc')}
              >
                <Text style={styles.optionText}>
                  {sortBy === 'date' ? 'Newest First' : 
                   sortBy === 'amount' ? 'Highest First' : 
                   'Z to A'}
                </Text>
                {sortOrder === 'desc' && (
                  <Check size={20} color={colors.primary[700]} />
                )}
              </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Date Range</Text>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => setDateRange({ start: null, end: null })}
              >
                <Text style={styles.optionText}>All Time</Text>
                {!dateRange.start && !dateRange.end && (
                  <Check size={20} color={colors.primary[700]} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => {
                  const today = new Date();
                  const lastMonth = new Date();
                  lastMonth.setMonth(lastMonth.getMonth() - 1);
                  setDateRange({ start: lastMonth, end: today });
                }}
              >
                <Text style={styles.optionText}>Last 30 Days</Text>
                {dateRange.start && dateRange.end && 
                  dateRange.start.getMonth() === new Date().getMonth() - 1 && (
                  <Check size={20} color={colors.primary[700]} />
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.optionItem}
                onPress={() => {
                  const today = new Date();
                  const lastWeek = new Date();
                  lastWeek.setDate(lastWeek.getDate() - 7);
                  setDateRange({ start: lastWeek, end: today });
                }}
              >
                <Text style={styles.optionText}>Last 7 Days</Text>
                {dateRange.start && dateRange.end && 
                  dateRange.start.getDate() === new Date().getDate() - 7 && (
                  <Check size={20} color={colors.primary[700]} />
                )}
              </TouchableOpacity>
              
              {/* In a real app, we would have a custom date range picker here */}
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <Button
              title="Reset"
              onPress={handleReset}
              variant="outlined"
              style={styles.resetButton}
            />
            <Button
              title="Apply Filters"
              onPress={handleApply}
              style={styles.applyButton}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  dismissArea: {
    flex: 1,
  },
  sheetContainer: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '50%',
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.gray[900],
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[800],
    marginBottom: 12,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  optionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[700],
  },
  footer: {
    flexDirection: 'row',
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: colors.gray[200],
  },
  resetButton: {
    flex: 1,
    marginRight: 8,
  },
  applyButton: {
    flex: 2,
    marginLeft: 8,
  },
});

export default FilterSheet;