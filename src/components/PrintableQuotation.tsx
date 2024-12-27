import { QuotationItem } from '../types/quotation';
import { calculateItemTotal } from '../utils/calculations';
import { formatDate } from '../utils/dateFormat';

interface PrintableQuotationProps {
  items: QuotationItem[];
  taxRate?: number;
}

export default function PrintableQuotation({ items, taxRate = 0.18 }: PrintableQuotationProps) {
  const subtotal = items.reduce((sum, item) => sum + calculateItemTotal(item), 0);
  const taxAmount = subtotal * taxRate;
  const total = subtotal + taxAmount;

  return (
    <div className="p-8 bg-white print:shadow-none" id="printable-content">
      {/* Header */}
      <div className="border-b pb-6 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tone Studio</h1>
            <p className="text-sm text-gray-600">By Galaxy</p>
          </div>
          <div className="text-right">
            <h2 className="text-lg font-semibold">GALAXY ENCLAVE PVT. LTD.</h2>
            <p className="text-sm text-gray-600">SP-5, MANSAROVAR INDUSTRIAL AREA</p>
            <p className="text-sm text-gray-600">RIICO, JAIPUR-302020, RAJASTHAN</p>
          </div>
        </div>
      </div>

      {/* Quotation Info */}
      <div className="mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Date: {formatDate(new Date())}</p>
            <p className="text-sm text-gray-600">Quotation No: QT-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <table className="w-full mb-8">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Position</th>
            <th className="text-left py-2">Description</th>
            <th className="text-right py-2">Qty</th>
            <th className="text-right py-2">Area (Sqft)</th>
            <th className="text-right py-2">Unit Price</th>
            <th className="text-right py-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index} className="border-b">
              <td className="py-2">{item.position}</td>
              <td className="py-2">
                <div>{item.description}</div>
                <div className="text-sm text-gray-600">
                  {item.system && `System: ${item.system}`}<br />
                  {item.colors && `Colors: ${item.colors}`}<br />
                  {item.glazing && `Glazing: ${item.glazing}`}
                </div>
              </td>
              <td className="text-right py-2">{item.quantity}</td>
              <td className="text-right py-2">{item.area?.toFixed(3)}</td>
              <td className="text-right py-2">₹{item.unitPrice?.toLocaleString()}</td>
              <td className="text-right py-2">₹{calculateItemTotal(item).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Summary */}
      <div className="flex justify-end">
        <div className="w-64">
          <div className="flex justify-between py-2">
            <span>Subtotal:</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 border-b">
            <span>GST ({(taxRate * 100)}%):</span>
            <span>₹{taxAmount.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-2 font-bold">
            <span>Total:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Terms and Conditions */}
      <div className="mt-8 text-sm text-gray-600">
        <h3 className="font-semibold mb-2">Terms & Conditions:</h3>
        <ol className="list-decimal list-inside space-y-1">
          <li>Validity: This quotation is valid for 30 days</li>
          <li>Payment: 50% advance with order, balance before delivery</li>
          <li>Delivery: 4-6 weeks from date of order confirmation</li>
          <li>Installation: Additional charges applicable</li>
        </ol>
      </div>
    </div>
  );
}