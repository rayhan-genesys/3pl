// Define the nested types first for clarity
export type Address = {
  city: string;
  state: string;
  street: string;
  country: string;
  street2: string;
  postalCode: string;
};

export type ContactInfo = {
  email: string;
  phone: string;
  address: Address;
  billingContact: string;
};

// Define the main ClientDetails type
export type ClientDetails = {
  id: string;
  name: string;
  contactInfo: ContactInfo;
  billingFrequency: "MONTHLY" | "WEEKLY" | "QUARTERLY" | "YEARLY";
  paymentTerms: number;
  billingDay: number;
  invoicePreference: "PDF" | "EMAIL" | "PAPER";
  shipHeroClientId: string;
  quickBooksId: string;
  paymentPreference: "ACH" | "CREDIT_CARD" | "WIRE" | "CHECK";
  isActive: boolean;
  pricingModelId: string | null;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  totalInvoice: number;
  totalAmount: number;
  paidAmount: number;
  dueAmount: number;
};
