export type ClientTable = {
  id: string;
  name: string;
  email: string;
  billingPeriod: string;
  status: string;
  totalInvoices: string;
  totalAmount: string;
  nextBillingDate: string;
  action: string;
};

export type ClientFromApi = {
  id: string;
  name: string;
  contactInfo: {
    email: string;
    phone: string;
    billingContact: string;
    address: {
      street: string;
      street2?: string | null;
      city: string;
      state: string;
      country: string;
      postalCode: string;
    };
  };
  billingFrequency: "MONTHLY" | "WEEKLY" | "YEARLY" | string;
  paymentTerms: number;
  billingDay: number;
  invoicePreference: "PDF" | "EMAIL" | string;
  shipHeroClientId: string;
  quickBooksId: string;
  paymentPreference: "ACH" | "WIRE" | "CHECK" | string;
  isActive: boolean;
  pricingModelId: string | null;
  createdAt: string;
  updatedAt: string;
  pricingModel: unknown | null;
  totalInvoice: number;
  totalAmount: number;
  nextBillingDate: string;
};
