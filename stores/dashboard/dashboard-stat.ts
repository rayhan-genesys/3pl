import { defineStore } from "pinia";
import type {
  RecentClientTable,
  RecentInvoiceTable,
  Stat,
} from "~/types/dashboard/stat";

export const useDashboardStatStore = defineStore("dashboardStatStore", {
  state: () => ({
    stats: [] as Stat[],
    recentClients: [] as RecentClientTable[],
    recentInvoices: [] as RecentInvoiceTable[],
  }),

  getters: {
    getStats: (state) => state.stats,
    getRecentClients: (state) => {
      const data: RecentClientTable[] = [
        {
          id: "c1",
          name: "Acme Corp",
          email: "billing@acme.com",
          billingPeriod: "Monthly",
          status: "Active",
          nextBillingDate: "2025-09-01",
        },
        {
          id: "c2",
          name: "Globex Ltd",
          email: "accounts@globex.com",
          billingPeriod: "Quarterly",
          status: "Active",
          nextBillingDate: "2025-11-15",
        },
        {
          id: "c3",
          name: "Soylent Industries",
          email: "finance@soylent.co",
          billingPeriod: "Annually",
          status: "Active",
          nextBillingDate: "2026-01-01",
        },
        {
          id: "c4",
          name: "Initech",
          email: "billing@initech.io",
          billingPeriod: "Monthly",
          status: "Active",
          nextBillingDate: "2025-09-05",
        },
        {
          id: "c5",
          name: "Umbrella Corp",
          email: "billing@umbrella.org",
          billingPeriod: "Quarterly",
          status: "Active",
          nextBillingDate: "2025-12-10",
        },
      ];

      return data;
    },
    getRecentInvoices: (state) => {
      const data: RecentInvoiceTable[] = [
        {
          client: "Acme Corp",
          status: "Paid",
          invoiceId: "INV-1001",
          invoiceDate: "2025-08-01",
          totalAmount: "$1,200.00",
          downloadLink: "/invoices/INV-1001.pdf",
          invoiceDetails: "Monthly subscription fee for August 2025",
        },
        {
          client: "Globex Ltd",
          status: "Pending",
          invoiceId: "INV-1002",
          invoiceDate: "2025-08-05",
          totalAmount: "$3,450.00",
          downloadLink: "/invoices/INV-1002.pdf",
          invoiceDetails: "Quarterly maintenance and support package",
        },
        {
          client: "Soylent Industries",
          status: "Overdue",
          invoiceId: "INV-1003",
          invoiceDate: "2025-07-15",
          totalAmount: "$980.00",
          downloadLink: "/invoices/INV-1003.pdf",
          invoiceDetails: "Custom integration and consulting services",
        },
        {
          client: "Initech",
          status: "Paid",
          invoiceId: "INV-1004",
          invoiceDate: "2025-08-10",
          totalAmount: "$560.00",
          downloadLink: "/invoices/INV-1004.pdf",
          invoiceDetails: "Monthly software license renewal",
        },
        {
          client: "Umbrella Corp",
          status: "Draft",
          invoiceId: "INV-1005",
          invoiceDate: "2025-08-15",
          totalAmount: "$7,200.00",
          downloadLink: "/invoices/INV-1005.pdf",
          invoiceDetails: "Annual enterprise plan subscription",
        },
      ];
      return data;
    },
  },

  actions: {
    async fetchDashboardStats() {
      return await useGlobalFunc().executeGlobalFunc(
        {
          url: "/dashboard/stats",
        },
        {
          loadingKey: "dashboard.getStats",
          showErrorToast: false,

          onError: (error) => {
            const data = [
              {
                title: "200",
                subtitle: "Total Clients",
                viewLink: "/client",
                icon: "lucide:users",
              },
              {
                title: "155",
                subtitle: "Total Invoices",
                viewLink: "/invoice",
                icon: "lucide:file-text",
              },
              {
                title: "$47,570.06",
                subtitle: "Total Amount Outstanding",
                viewLink: "",
                icon: "lucide:dollar-sign",
              },
              {
                title: "$1,47,570.06",
                subtitle: "Total Billed Amount",
                viewLink: "",
                icon: "lucide:dollar-sign",
              },
            ];

            this.stats = data;
          },
        }
      );
    },
  },
});
