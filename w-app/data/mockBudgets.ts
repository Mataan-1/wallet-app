import { colors } from '@/constants/colors';

export const mockBudgets = [
  {
    id: '1',
    category: 'Food & Dining',
    limit: 600,
    spent: 432.50,
    color: colors.primary[500]
  },
  {
    id: '2',
    category: 'Shopping',
    limit: 400,
    spent: 325.75,
    color: colors.accent[500]
  },
  {
    id: '3',
    category: 'Transportation',
    limit: 300,
    spent: 189.25,
    color: colors.secondary[500]
  },
  {
    id: '4',
    category: 'Entertainment',
    limit: 350,
    spent: 270.00,
    color: colors.warning[500]
  },
  {
    id: '5',
    category: 'Bills & Utilities',
    limit: 800,
    spent: 756.30,
    color: colors.error[500]
  },
  {
    id: '6',
    category: 'Health',
    limit: 200,
    spent: 85.00,
    color: colors.success[500]
  }
];