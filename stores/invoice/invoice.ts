import { defineStore } from "pinia";
import type { Stat } from "~/types/dashboard/stat";
import type { InvoiceTable } from "~/types/invoice/invoice-table";

export const useInvoiceStatStore = defineStore("invoiceStatStore", {
  state: () => ({
    stats: [] as Stat[],
    invoices: [] as InvoiceTable[],
    invoiceDetails: {} as any,
  }),

  getters: {
    getStats: (state) => {
      const data: Stat[] = [
        {
          title: "155",
          subtitle: "Invoices",
          viewLink: "",
          icon: "lucide:file-text",
        },
        {
          title: "$47,570.06",
          subtitle: "Total Amount Outstanding",
          viewLink: "",
          icon: "lucide:dollar-sign",
        },
        {
          title: "$100,000",
          subtitle: "Total Billed Amount",
          viewLink: "",
          icon: "lucide:dollar-sign",
        },
      ];
      return data;
    },
    getInvoices: (state) => {
      const data: InvoiceTable[] = [
        {
          client: "Acme Corp",
          status: "Paid",
          invoiceId: "INV-1001",
          invoiceDate: "2025-08-01",
          creationType: "Manual",
          billingFrequency: "Monthly",
          paymentTerms: "Net 30",
          paymentMethod: "Credit Card",
          totalAmount: "$1,200.00",
          downloadLink: "/invoices/INV-1001.pdf",
          invoiceDetails: "Monthly subscription fee for August 2025",
        },
        {
          client: "Globex Ltd",
          status: "Pending",
          invoiceId: "INV-1002",
          invoiceDate: "2025-08-05",
          creationType: "Manual",
          billingFrequency: "Quarterly",
          paymentTerms: "Net 60",
          paymentMethod: "Bank Transfer",
          totalAmount: "$3,450.00",
          downloadLink: "/invoices/INV-1002.pdf",
          invoiceDetails: "Quarterly maintenance and support package",
        },
        {
          client: "Soylent Industries",
          status: "Overdue",
          invoiceId: "INV-1003",
          invoiceDate: "2025-07-15",
          creationType: "Manual",
          billingFrequency: "Annually",
          paymentTerms: "Net 90",
          paymentMethod: "PayPal",
          totalAmount: "$980.00",
          downloadLink: "/invoices/INV-1003.pdf",
          invoiceDetails: "Custom integration and consulting services",
        },
        {
          client: "Initech",
          status: "Paid",
          invoiceId: "INV-1004",
          invoiceDate: "2025-08-10",
          creationType: "Manual",
          billingFrequency: "Monthly",
          paymentTerms: "Net 15",
          paymentMethod: "Bank Transfer",
          totalAmount: "$560.00",
          downloadLink: "/invoices/INV-1004.pdf",
          invoiceDetails: "Monthly software license renewal",
        },
        {
          client: "Umbrella Corp",
          status: "Draft",
          invoiceId: "INV-1005",
          invoiceDate: "2025-08-15",
          creationType: "Manual",
          billingFrequency: "Annually",
          paymentTerms: "Net 30",
          paymentMethod: "PayPal",
          totalAmount: "$7,200.00",
          downloadLink: "/invoices/INV-1005.pdf",
          invoiceDetails: "Annual enterprise plan subscription",
        },
      ];
      return data;
    },
    getInvoiceDetails: (state) => {
      return state.invoiceDetails;
    },
  },

  actions: {
    async fetchInvoiceDetails(invoiceId: string) {
      return await useGlobalFunc().executeGlobalFunc(
        {
          url: `/invoice/details/${invoiceId}`,
        },
        {
          loadingKey: "invoice.getInvoiceDetails",
          showErrorToast: false,
          onSuccess: (data) => {
            this.invoiceDetails = data;
          },
          onError: (error) => {},
        }
      );
    },
  },
});
