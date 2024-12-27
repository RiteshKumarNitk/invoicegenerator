import { QuotationItem } from '../types/quotation';
import { calculateItemTotal } from '../utils/calculations';
import PriceTag from './PriceTag';

interface QuotationSummaryProps {
  items: QuotationItem[];
  taxRate?: number;
}

export default function QuotationSummary({ items, taxRate = 0.18 }: QuotationSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quotation Summary</h3>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <PriceTag amount={subtotal} />
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">GST ({(taxRate * 100).toFixed(0)}%)</span>
          <PriceTag amount={taxAmount} />
        </div>
        <div className="border-t pt-2 mt-4">
          <div className="flex justify-between">
            <span className="text-gray-900 font-semibold">Total</span>
            <PriceTag amount={total} className="text-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}