import { Printer } from 'lucide-react';
import { printQuotation } from '../utils/print';

export default function PrintButton() {
  return (
    <button
      onClick={printQuotation}
      className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      <Printer className="h-5 w-5 mr-2" />
      Print Quotation
    </button>
  );
}