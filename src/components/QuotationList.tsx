import { useState, useMemo } from 'react';
import QuotationItem from './QuotationItem';
import QuotationSummary from './QuotationSummary';
import QuotationFilters from './QuotationFilters';
import PrintButton from './PrintButton';
import PrintableQuotation from './PrintableQuotation';
import { QuotationItem as QuotationItemType } from '../types/quotation';

const quotationData: QuotationItemType[] = [
  {
    position: "FF KINGS ROOM",
    quantity: 27,
    description: "Window Elements 1525 mm x 2375 mm, Consisting of a Fixed Field",
    dimensions: "1525 mm x 2375 mm",
    system: "AluK 40N",
    colors: "Profiles: TEX 2500 MT GREY",
    glazing: "1 x 24mm 24MM DGU (6+12AG+6)",
    area: 38.987,
    diagram: "https://images.unsplash.com/photo-1585909695284-32d2985ac9c0?auto=format&fit=crop&q=80&w=400&h=400",
    unitPrice: 12500
  },
  {
    position: "FF KINGS ROOM",
    quantity: 8,
    description: "Sliders 2540 mm x 2400 mm, Consisting of a 3-Leaf one fix two Sliding Door",
    dimensions: "2540 mm x 2400 mm",
    system: "AluK SC95-EXP",
    colors: "Profiles: TEX 2500 MT GREY",
    glazing: "3 x 24mm 24MM DGU (6+12AG+6)",
    area: 65.617,
    diagram: "https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400&h=400",
    unitPrice: 18750
  }
];

export default function QuotationList() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('position');

  const filteredAndSortedItems = useMemo(() => {
    let items = [...quotationData];

    if (searchQuery) {
      items = items.filter(item => 
        item.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    items.sort((a, b) => {
      switch (sortField) {
        case 'area':
          return (a.area || 0) - (b.area || 0);
        case 'quantity':
          return a.quantity - b.quantity;
        default:
          return a.position.localeCompare(b.position);
      }
    });

    return items;
  }, [searchQuery, sortField]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Quotation Details</h2>
          <p className="text-gray-600">Project specifications and measurements</p>
        </div>
        <PrintButton />
      </div>

      <QuotationFilters 
        onSearch={setSearchQuery}
        onSort={setSortField}
      />

      <div className="space-y-6">
        {filteredAndSortedItems.map((item, index) => (
          <QuotationItem key={index} {...item} />
        ))}
      </div>

      <QuotationSummary items={filteredAndSortedItems} />

      {/* Hidden printable version */}
      <div className="hidden">
        <PrintableQuotation items={filteredAndSortedItems} />
      </div>
    </div>
  );
}