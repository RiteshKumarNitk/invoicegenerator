interface PriceTagProps {
  amount: number;
  currency?: string;
  className?: string;
}

export default function PriceTag({ amount, currency = 'INR', className = '' }: PriceTagProps) {
  const formattedAmount = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency,
  }).format(amount);

  return (
    <span className={`font-semibold ${className}`}>
      {formattedAmount}
    </span>
  );
}