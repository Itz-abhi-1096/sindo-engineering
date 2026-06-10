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
