import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Send, ArrowDownLeft, QrCode, CreditCard, History } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';
import { mockCards } from '@/data/mockCards';
import Button from '@/components/Button';

export default function PaymentsScreen() {
  const [selectedCard, setSelectedCard] = useState(mockCards[0]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentType, setPaymentType] = useState<'send' | 'receive' | null>(null);

  const handlePaymentAction = (type: 'send' | 'receive') => {
    setPaymentType(type);
    setShowPaymentModal(true);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payments</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card Selection */}
        <View style={styles.cardsSection}>
          <Text style={styles.sectionTitle}>Select Card</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
          >
            {mockCards.map((card) => (
              <TouchableOpacity
                key={card.id}
                style={[
                  styles.cardItem,
                  selectedCard.id === card.id && styles.selectedCard,
                  { backgroundColor: card.color }
                ]}
                onPress={() => setSelectedCard(card)}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardType}>{card.type}</Text>
                  <Text style={styles.cardNetwork}>{card.network}</Text>
                </View>
                <Text style={styles.cardNumber}>**** {card.lastFourDigits}</Text>
                <Text style={styles.cardBalance}>{formatCurrency(card.balance)}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.actionsGrid}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handlePaymentAction('send')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.primary[100] }]}>
              <Send size={24} color={colors.primary[700]} />
            </View>
            <Text style={styles.actionTitle}>Send Money</Text>
            <Text style={styles.actionDescription}>Pay using card</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handlePaymentAction('receive')}
          >
            <View style={[styles.actionIcon, { backgroundColor: colors.success[100] }]}>
              <ArrowDownLeft size={24} color={colors.success[700]} />
            </View>
            <Text style={styles.actionTitle}>Receive Money</Text>
            <Text style={styles.actionDescription}>Get paid to card</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: colors.secondary[100] }]}>
              <QrCode size={24} color={colors.secondary[700]} />
            </View>
            <Text style={styles.actionTitle}>QR Payment</Text>
            <Text style={styles.actionDescription}>Scan or show code</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <View style={[styles.actionIcon, { backgroundColor: colors.accent[100] }]}>
              <History size={24} color={colors.accent[700]} />
            </View>
            <Text style={styles.actionTitle}>History</Text>
            <Text style={styles.actionDescription}>View transactions</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.recentSection}>
          <Text style={styles.sectionTitle}>Recent Card Activity</Text>
          <View style={styles.transactionList}>
            {[1, 2, 3].map((_, index) => (
              <View key={index} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <CreditCard size={20} color={colors.gray[600]} />
                </View>
                <View style={styles.transactionInfo}>
                  <Text style={styles.transactionTitle}>Card Payment</Text>
                  <Text style={styles.transactionCard}>Ending in {selectedCard.lastFourDigits}</Text>
                </View>
                <Text style={styles.transactionAmount}>-$24.99</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Payment Modal */}
      {showPaymentModal && (
        <Animated.View 
          entering={FadeIn}
          style={styles.modalContainer}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {paymentType === 'send' ? 'Send Money' : 'Receive Money'}
            </Text>
            <Text style={styles.modalCard}>
              Using card ending in {selectedCard.lastFourDigits}
            </Text>
            <Text style={styles.modalBalance}>
              Available: {formatCurrency(selectedCard.balance)}
            </Text>
            
            <View style={styles.modalActions}>
              <Button
                title="Cancel"
                onPress={() => setShowPaymentModal(false)}
                variant="outlined"
                style={styles.modalButton}
              />
              <Button
                title="Continue"
                onPress={() => {
                  // Handle payment flow
                  setShowPaymentModal(false);
                }}
                style={styles.modalButton}
              />
            </View>
          </View>
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
  content: {
    flex: 1,
  },
  cardsSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: colors.gray[900],
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  cardItem: {
    width: 280,
    padding: 20,
    borderRadius: 16,
    marginRight: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  selectedCard: {
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    fontSize: 16,
    color: colors.white,
    marginBottom: 16,
  },
  cardBalance: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.white,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 16,
    gap: 16,
  },
  actionButton: {
    width: '47%',
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[900],
    marginBottom: 4,
  },
  actionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
  },
  recentSection: {
    marginTop: 8,
  },
  transactionList: {
    paddingHorizontal: 16,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.gray[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[900],
  },
  transactionCard: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
  },
  transactionAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[900],
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 24,
    padding: 24,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.gray[900],
    marginBottom: 8,
  },
  modalCard: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: colors.gray[700],
    marginBottom: 4,
  },
  modalBalance: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 24,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});