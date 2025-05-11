import { colors } from '@/constants/colors';

export const mockCards = [
  {
    id: '1',
    type: 'Platinum',
    lastFourDigits: '4321',
    cardHolder: 'Alex Johnson',
    expiry: '09/28',
    balance: 3452.78,
    color: colors.primary[700],
    network: 'Visa',
    dailyLimit: 1000,
    monthlyLimit: 5000
  },
  {
    id: '2',
    type: 'Gold',
    lastFourDigits: '8765',
    cardHolder: 'Alex Johnson',
    expiry: '11/26',
    balance: 1789.63,
    color: colors.accent[500],
    network: 'MasterCard',
    dailyLimit: 500,
    monthlyLimit: 3000
  },
  {
    id: '3',
    type: 'Business',
    lastFourDigits: '2468',
    cardHolder: 'Alex Johnson',
    expiry: '05/27',
    balance: 7623.91,
    color: colors.secondary[700],
    network: 'Visa',
    dailyLimit: 2000,
    monthlyLimit: 10000
  }
];