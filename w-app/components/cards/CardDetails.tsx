import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';
import { colors } from '@/constants/colors';
import { formatCurrency } from '@/utils/formatters';
import { Shield, CreditCard, Smartphone, Globe, Lock } from 'lucide-react-native';

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

interface CardDetailsProps {
  card: Card;
}

const CardDetails: React.FC<CardDetailsProps> = ({ card }) => {
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [onlinePayments, setOnlinePayments] = useState(true);
  const [contactlessPayments, setContactlessPayments] = useState(true);
  const [internationalPayments, setInternationalPayments] = useState(false);
  const [atmWithdrawals, setAtmWithdrawals] = useState(true);

  // Masked card number (only showing last 4 digits)
  const maskedCardNumber = `**** **** **** ${card.lastFourDigits}`;
  
  // Dummy full card number for example (would come from API in real app)
  const fullCardNumber = `4242 4242 4242 ${card.lastFourDigits}`;

  return (
    <View style={styles.container}>
      <View style={[styles.cardPreview, { backgroundColor: card.color }]}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardType}>{card.type}</Text>
          <Text style={styles.cardNetwork}>{card.network}</Text>
        </View>
        
        <View style={styles.cardNumberSection}>
          <Text style={styles.cardNumberLabel}>Card Number</Text>
          <View style={styles.cardNumberRow}>
            <Text style={styles.cardNumber}>
              {showCardNumber ? fullCardNumber : maskedCardNumber}
            </Text>
            <TouchableOpacity 
              style={styles.visibilityToggle}
              onPress={() => setShowCardNumber(!showCardNumber)}
            >
              <Text style={styles.visibilityToggleText}>
                {showCardNumber ? 'HIDE' : 'SHOW'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.cardInfo}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>CARD HOLDER</Text>
            <Text style={styles.infoValue}>{card.cardHolder}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>EXPIRES</Text>
            <Text style={styles.infoValue}>{card.expiry}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>CVV</Text>
            <Text style={styles.infoValue}>***</Text>
          </View>
        </View>
      </View>

      <View style={styles.balanceSection}>
        <Text style={styles.balanceLabel}>Current Balance</Text>
        <Text style={styles.balanceAmount}>{formatCurrency(card.balance)}</Text>
      </View>

      <View style={styles.securitySection}>
        <View style={styles.sectionHeader}>
          <Shield size={20} color={colors.primary[700]} />
          <Text style={styles.sectionTitle}>Card Security</Text>
        </View>
        
        <View style={styles.securitySettings}>
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <CreditCard size={20} color={colors.gray[700]} />
              <Text style={styles.settingText}>Online Payments</Text>
            </View>
            <Switch
              value={onlinePayments}
              onValueChange={setOnlinePayments}
              trackColor={{ false: colors.gray[300], true: colors.primary[500] }}
              thumbColor={colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Smartphone size={20} color={colors.gray[700]} />
              <Text style={styles.settingText}>Contactless Payments</Text>
            </View>
            <Switch
              value={contactlessPayments}
              onValueChange={setContactlessPayments}
              trackColor={{ false: colors.gray[300], true: colors.primary[500] }}
              thumbColor={colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Globe size={20} color={colors.gray[700]} />
              <Text style={styles.settingText}>International Payments</Text>
            </View>
            <Switch
              value={internationalPayments}
              onValueChange={setInternationalPayments}
              trackColor={{ false: colors.gray[300], true: colors.primary[500] }}
              thumbColor={colors.white}
            />
          </View>
          
          <View style={styles.settingItem}>
            <View style={styles.settingInfo}>
              <Lock size={20} color={colors.gray[700]} />
              <Text style={styles.settingText}>ATM Withdrawals</Text>
            </View>
            <Switch
              value={atmWithdrawals}
              onValueChange={setAtmWithdrawals}
              trackColor={{ false: colors.gray[300], true: colors.primary[500] }}
              thumbColor={colors.white}
            />
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity style={styles.freezeButton}>
          <Text style={styles.freezeButtonText}>Freeze Card</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.reportButton}>
          <Text style={styles.reportButtonText}>Report Lost</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardPreview: {
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
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
  cardNumberSection: {
    marginBottom: 24,
  },
  cardNumberLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 8,
  },
  cardNumberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardNumber: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: colors.white,
    letterSpacing: 1,
  },
  visibilityToggle: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 4,
  },
  visibilityToggleText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    color: colors.white,
  },
  cardInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {},
  infoLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  infoValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.white,
  },
  balanceSection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  balanceLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: colors.gray[600],
    marginBottom: 8,
  },
  balanceAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: colors.gray[900],
  },
  securitySection: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: colors.gray[900],
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.gray[900],
    marginLeft: 8,
  },
  securitySettings: {},
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray[200],
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 15,
    color: colors.gray[800],
    marginLeft: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  freezeButton: {
    flex: 1,
    backgroundColor: colors.primary[700],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginRight: 8,
  },
  freezeButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.white,
  },
  reportButton: {
    flex: 1,
    backgroundColor: colors.error[100],
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginLeft: 8,
  },
  reportButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 16,
    color: colors.error[700],
  },
});

export default CardDetails;