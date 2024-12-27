import { QuotationItem as QuotationItemType } from '../types/quotation';
import PriceTag from './PriceTag';
import { calculateItemTotal } from '../utils/calculations';

export default function QuotationItem(props: QuotationItemType) {
  const { 
    position, 
    quantity, 
    description, 
    dimensions, 
    system, 
    colors, 
    glazing, 
    area,
    diagram,
    unitPrice 
  } = props;

  const total = calculateItemTotal(props);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{position}</h3>
          <div className="mt-4 space-y-2">
            <div className="flex items-center">
              <span className="text-gray-600 w-24">Quantity:</span>
              <span className="font-medium">{quantity} Pcs</span>
            </div>
            {dimensions && (
              <div className="flex items-center">
                <span className="text-gray-600 w-24">Dimensions:</span>
                <span className="font-medium">{dimensions}</span>
              </div>
            )}
            {system && (
              <div className="flex items-center">
                <span className="text-gray-600 w-24">System:</span>
                <span className="font-medium">{system}</span>
              </div>
            )}
            {colors && (
              <div className="flex items-center">
                <span className="text-gray-600 w-24">Colors:</span>
                <span className="font-medium">{colors}</span>
              </div>
            )}
            {glazing && (
              <div className="flex items-center">
                <span className="text-gray-600 w-24">Glazing:</span>
                <span className="font-medium">{glazing}</span>
              </div>
            )}
            {area && (
              <div className="flex items-center">
                <span className="text-gray-600 w-24">Area:</span>
                <span className="font-medium">{area} Sqft</span>
              </div>
            )}
            {unitPrice && (
              <>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Unit Price:</span>
                  <PriceTag amount={unitPrice} />
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 w-24">Total:</span>
                  <PriceTag amount={total} className="text-green-600" />
                </div>
              </>
            )}
          </div>
        </div>
        {diagram && (
          <div className="ml-6 flex-shrink-0">
            <img src={diagram} alt="Product Diagram" className="w-48 h-48 object-contain" />
          </div>
        )}
      </div>
      <div className="mt-4">
        <p className="text-gray-700">{description}</p>
      </div>
    </div>
  );
}