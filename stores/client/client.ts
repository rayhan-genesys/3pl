import type { ClientDetails } from "~/types/client/client-details";

export const useClientStore = defineStore("clientStore", {
  state: () => ({
    client: {} as ClientDetails,
  }),

  getters: {
    getClient: (state) => state.client,
  },

  actions: {
    async getClientDetails(id: string) {
      return await useGlobalFunc().executeGlobalFunc(
        {
          url: `/clients/${id}`,
          method: "GET",
        },
        {
          loadingKey: "client.getClientDetails",
          showErrorToast: true,
          onSuccess: (data: ClientDetails) => {
            this.client = data;
          },
          onError: (error) => {
            if (error.status === 404) {
              navigateTo("/404");
            }
          },
        }
      );
    },
  },
});
