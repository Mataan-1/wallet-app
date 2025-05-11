import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Plus, ArrowLeft, ArrowRight } from 'lucide-react-native';
import Animated, { FadeIn, SlideInRight } from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { mockCards } from '@/data/mockCards';
import { formatCurrency } from '@/utils/formatters';
import CardDetails from '@/components/cards/CardDetails';

export default function CardsScreen() {
  const [cards, setCards] = useState(mockCards);
  const [selectedCard, setSelectedCard] = useState(mockCards[0]);
  const [showCardDetails, setShowCardDetails] = useState(false);

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const toggleCardDetails = () => {
    setShowCardDetails(!showCardDetails);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>My Cards</Text>
        <TouchableOpacity style={styles.addButton}>
          <Plus size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      {!showCardDetails ? (
        <Animated.View entering={FadeIn} style={styles.content}>
          <View style={styles.cardsList}>
            <FlatList
              data={cards}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
              snapToInterval={340}
              decelerationRate="fast"
              contentContainerStyle={styles.cardsContainer}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.cardContainer,
                    selectedCard.id === item.id && styles.selectedCardContainer
                  ]}
                  onPress={() => handleCardSelect(item)}
                >
                  <View 
                    style={[
                      styles.card, 
                      { backgroundColor: item.color }
                    ]}
                  >
                    <View style={styles.cardHeader}>
                      <Text style={styles.cardType}>{item.type}</Text>
                      <Text style={styles.cardNetwork}>{item.network}</Text>
                    </View>
                    <Text style={styles.cardNumber}>
                      **** **** **** {item.lastFourDigits}
                    </Text>
                    <View style={styles.cardFooter}>
                      <View>
                        <Text style={styles.cardHolderLabel}>CARD HOLDER</Text>
                        <Text style={styles.cardHolder}>{item.cardHolder}</Text>
                      </View>
                      <View>
                        <Text style={styles.expiryLabel}>EXPIRES</Text>
                        <Text style={styles.expiry}>{item.expiry}</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>

          <View style={styles.cardInfo}>
            <View style={styles.balanceSection}>
              <Text style={styles.balanceLabel}>Available Balance</Text>
              <Text style={styles.balanceAmount}>
                {formatCurrency(selectedCard.balance)}
              </Text>
              <View style={styles.limitsRow}>
                <View style={styles.limitItem}>
                  <Text style={styles.limitLabel}>Daily Limit</Text>
                  <Text style={styles.limitValue}>
                    {formatCurrency(selectedCard.dailyLimit)}
                  </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.limitItem}>
                  <Text style={styles.limitLabel}>Monthly Limit</Text>
                  <Text style={styles.limitValue}>
                    {formatCurrency(selectedCard.monthlyLimit)}
                  </Text>
                </View>
              </View>
            </View>

            <TouchableOpacity style={styles.detailsButton} onPress={toggleCardDetails}>
              <Text style={styles.detailsButtonText}>View Card Details</Text>
              <ArrowRight size={16} color={colors.primary[700]} />
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <Animated.View entering={SlideInRight} style={styles.fullScreenCard}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={toggleCardDetails}
          >
            <ArrowLeft size={20} color={colors.gray[800]} />
            <Text style={styles.backButtonText}>Back to Cards</Text>
          </TouchableOpacity>
          
          <CardDetails card={selectedCard} />
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[50],
  },
  headerContainer: {
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
  },
  cardsList: {
    height: 240,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  cardContainer: {
    width: 320,
    height: 200,
    marginRight: 16,
    borderRadius: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCardContainer: {
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  card: {
    flex: 1,
    borderRadius: 16,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.white,
  },
  cardNetwork: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.white,
  },
  cardNumber: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.white,
    letterSpacing: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolderLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  cardHolder: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
  },
  expiryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  expiry: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
  },
  cardInfo: {
    flex: 1,
    padding: 24,
  },
  balanceSection: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  balanceAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: colors.gray[900],
    marginBottom: 24,
  },
  limitsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  limitItem: {
    flex: 1,
    alignItems: 'center',
  },
  limitLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: colors.gray[600],
    marginBottom: 4,
  },
  limitValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[900],
  },
  divider: {
    width: 1,
    height: 40,
    backgroundColor: colors.gray[200],
    marginHorizontal: 8,
  },
  detailsButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingVertical: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  detailsButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.primary[700],
    marginRight: 8,
  },
  fullScreenCard: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  backButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[800],
    marginLeft: 8,
  },
});