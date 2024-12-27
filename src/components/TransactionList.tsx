import { useState } from 'react';
import TransactionStatus from './TransactionStatus';
import { Transaction } from '../types/transaction';
import { formatDate } from '../utils/dateFormat';
import { formatCurrency } from '../utils/calculations';

interface TransactionListProps {
  transactions: Transaction[];
  onStatusChange: (id: string, status: Transaction['status']) => void;
}

export default function TransactionList({ transactions, onStatusChange }: TransactionListProps) {
  const [filter, setFilter] = useState('all');

  const filteredTransactions = transactions.filter(transaction => 
    filter === 'all' ? true : transaction.status === filter
  );

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">FF Kings Room Transactions</h2>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quotation ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment Status
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Advance
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Balance
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {formatDate(new Date(transaction.created_at))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {transaction.quotation_id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TransactionStatus status={transaction.status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <TransactionStatus status={transaction.payment_status} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  {formatCurrency(transaction.advance_payment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                  {formatCurrency(transaction.balance_payment)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                  <select
                    value={transaction.status}
                    onChange={(e) => onStatusChange(transaction.id, e.target.value as Transaction['status'])}
                    className="rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}