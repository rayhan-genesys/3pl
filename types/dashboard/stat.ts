export type Stat = {
  title: string;
  subtitle: string;
  viewLink?: string;
  icon?: string;
};

export type RecentClientTable = {
  id: string;
  name: string;
  email: string;
  billingPeriod: string;
  status: string;
  nextBillingDate: string;
};

export type RecentInvoiceTable = {
  client: string;
  status: string;
  invoiceId: string;
  invoiceDate: string;
  totalAmount: string;
  downloadLink: string;
  invoiceDetails: string;
};
