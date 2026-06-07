export interface Product {
  id: string;
  name: string;
  category: 'Tee' | 'Elbow & Bend' | 'Reducer' | 'Other' | 'Custom';
  description: string;
  longDescription: string;
  imageSeed: string; // fallback seed for decorative picsum or illustrative icons
  specifications: {
    sizeRange: string;
    grades: string[];
    standards: string[];
  };
  features: string[];
}

export interface QuoteItem {
  id: string;
  product: Product;
  selectedSize: string;
  selectedGrade: string;
  quantity: number;
  customNotes?: string;
}

export interface QuoteRequest {
  id: string;
  companyName?: string;
  contactName: string;
  phone: string;
  email: string;
  industry: string;
  items: QuoteItem[];
  message?: string;
  status: 'Received' | 'Reviewing' | 'Quoted';
  createdAt: string;
}
