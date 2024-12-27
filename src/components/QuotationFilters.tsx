import { useState } from 'react';
import { Search } from 'lucide-react';

interface QuotationFiltersProps {
  onSearch: (query: string) => void;
  onSort: (field: string) => void;
}

export default function QuotationFilters({ onSearch, onSort }: QuotationFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search quotations..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        <select
          onChange={(e) => onSort(e.target.value)}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="position">Sort by Position</option>
          <option value="area">Sort by Area</option>
          <option value="quantity">Sort by Quantity</option>
        </select>
      </div>
    </div>
  );
}