export interface Transaction {
  id: string;
  quotation_id: string;
  position: string;
  status: 'pending' | 'approved' | 'completed' | 'cancelled';
  payment_status: 'pending' | 'partial' | 'completed';
  advance_payment: number;
  balance_payment: number;
  created_at: string;
  updated_at: string;
  notes?: string;
}