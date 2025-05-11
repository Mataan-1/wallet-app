import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';

interface Card {
  id: string;
  type: string;
  lastFourDigits: string;
  cardHolder: string;
  expiry: string;
  balance: number;
  color: string;
  network: string;
  dailyLimit: number;
  monthlyLimit: number;
}

interface CardCarouselProps {
  cards: Card[];
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.85;
const CARD_HEIGHT = CARD_WIDTH * 0.6;

const CardCarousel: React.FC<CardCarouselProps> = ({ cards }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={CARD_WIDTH + 16}
      contentContainerStyle={styles.carouselContainer}
    >
      {cards.map((card) => (
        <View
          key={card.id}
          style={[styles.card, { backgroundColor: card.color }]}
        >
          <View style={styles.cardHeader}>
            <Text style={styles.cardType}>{card.type}</Text>
            <Text style={styles.cardNetwork}>{card.network}</Text>
          </View>
          
          <Text style={styles.cardNumber}>
            **** **** **** {card.lastFourDigits}
          </Text>
          
          <View style={styles.cardBalance}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>{formatCurrency(card.balance)}</Text>
          </View>
          
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardHolderLabel}>CARD HOLDER</Text>
              <Text style={styles.cardHolder}>{card.cardHolder}</Text>
            </View>
            <View>
              <Text style={styles.expiryLabel}>EXPIRES</Text>
              <Text style={styles.expiry}>{card.expiry}</Text>
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    paddingRight: 16,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    padding: 24,
    marginRight: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
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
    marginBottom: 24,
  },
  cardBalance: {
    marginBottom: 24,
  },
  balanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  balanceAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.white,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardHolderLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
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
    marginBottom: 4,
  },
  expiry: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
  },
});

export default CardCarousel;