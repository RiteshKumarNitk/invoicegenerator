export interface QuotationItem {
  position: string;
  quantity: number;
  description: string;
  dimensions?: string;
  system?: string;
  colors?: string;
  glazing?: string;
  area?: number;
  diagram?: string;
  unitPrice?: number;
}

export interface QuotationSummary {
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
}