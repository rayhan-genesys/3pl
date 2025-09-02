import type { ClientFromApi, ClientTable } from "~/types/client/client-table";
import type { Pagination } from "~/types/pagination.type";

export const useClientTableStore = defineStore("clientTableStore", {
  state: () => ({
    clients: [] as ClientFromApi[],
    pagination: {} as Pagination,
  }),

  getters: {
    getClients: (state) => {
      const shapedData: ClientTable[] = state.clients.map((client) => ({
        id: client.id,
        name: client.name,
        email: client.contactInfo.email,
        billingPeriod: client.billingFrequency,
        status: client.isActive ? "Active" : "Inactive",
        totalInvoices: client.totalInvoice.toString(),
        totalAmount: `$${client.totalAmount.toFixed(2)}`,
        nextBillingDate: new Date(client.nextBillingDate).toLocaleDateString(),
        action: "View",
      }));
      return shapedData;
    },
    getPagination: (state) => state.pagination,
  },

  actions: {
    async fetchClients(
      page: number,
      limit: number,
      billingFrequency?: string,
      search?: string,
      isActive?: boolean
    ) {
      return await useGlobalFunc().executeGlobalFunc(
        {
          url: "/clients",
          params: {
            page,
            limit,
            billingFrequency,
            search,
            isActive,
          },
        },
        {
          loadingKey: "client.getClients",
          showErrorToast: true,
          onSuccess: (data: {
            clients: ClientFromApi[];
            hasNextPage: boolean;
            hasPreviousPage: boolean;
            limit: number;
            page: number;
            total: number;
            totalPages: number;
          }) => {
            this.clients = data.clients;
            this.pagination = {
              hasNextPage: data.hasNextPage,
              hasPreviousPage: data.hasPreviousPage,
              limit: data.limit,
              page: data.page,
              total: data.total,
              totalPages: data.totalPages,
            };
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    },

    async getClientDetails(id: string) {
      return await useGlobalFunc().executeGlobalFunc(
        {
          url: `/clients/${id}`,
          method: "GET",
        },
        {
          loadingKey: "client.getClientDetails",
          showErrorToast: true,
        }
      );
    },

    async archiveClient(
      id: string,
      reason: string = "Client is no longer active"
    ) {
      return await useGlobalFunc().executeGlobalFunc(
        {
          url: `/clients/${id}/archive`,
          method: "PATCH",
          data: {
            reason,
          },
        },
        {
          loadingKey: "client.archiveClient",
          showErrorToast: true,
          showSuccessToast: true,
          successMessage: "Client archived successfully",

          onError: (error) => {
            console.log(error);
          },
        }
      );
    },

    async restoreClient(id: string, reason: string = "Client is active again") {
      return await useGlobalFunc().executeGlobalFunc(
        {
          url: `/clients/${id}/restore`,
          method: "PATCH",
          data: {
            reason,
          },
        },
        {
          loadingKey: "client.restoreClient",
          showErrorToast: true,
          showSuccessToast: true,
          successMessage: "Client restored successfully",

          onError: (error) => {
            console.log(error);
          },
        }
      );
    },
  },
});
