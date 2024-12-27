import { QuotationItem } from '../types/quotation';

export const calculateItemTotal = (item: QuotationItem): number => {
  if (!item.unitPrice) return 0;
  return item.quantity * item.unitPrice;
};

export const formatCurrency = (amount: number, currency: string = 'INR'): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(amount);
};