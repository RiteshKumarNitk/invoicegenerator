/*
  # Create transactions table for FF Kings Room

  1. New Tables
    - `transactions`
      - `id` (uuid, primary key)
      - `quotation_id` (text, required)
      - `position` (text, required)
      - `status` (enum, required)
      - `payment_status` (enum, required)
      - `advance_payment` (numeric, required)
      - `balance_payment` (numeric, required)
      - `notes` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `transactions` table
    - Add policies for authenticated users
*/

-- Create enum types for status
CREATE TYPE transaction_status AS ENUM ('pending', 'approved', 'completed', 'cancelled');
CREATE TYPE payment_status AS ENUM ('pending', 'partial', 'completed');

-- Create transactions table
CREATE TABLE IF NOT EXISTS transactions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  quotation_id text NOT NULL,
  position text NOT NULL,
  status transaction_status NOT NULL DEFAULT 'pending',
  payment_status payment_status NOT NULL DEFAULT 'pending',
  advance_payment numeric NOT NULL DEFAULT 0,
  balance_payment numeric NOT NULL DEFAULT 0,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view all transactions"
  ON transactions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can insert transactions"
  ON transactions
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Users can update transactions"
  ON transactions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_transactions_updated_at
  BEFORE UPDATE
  ON transactions
  FOR EACH ROW
  EXECUTE PROCEDURE update_updated_at_column();