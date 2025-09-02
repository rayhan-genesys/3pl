import type {
  PickServiceTable,
  PackagingServiceTable,
  StorageServiceTable,
  ShippingServiceTable,
  ReceivingEventServiceTable,
  ValueAddedServiceTable,
  AdHocServiceTable,
} from "~/types/invoice/service-tables.type";
import type { Pagination } from "~/types/pagination.type";

export const useServiceStore = defineStore("serviceStore", {
  state: () => ({
    pickServiceTable: [
      {
        orderId: "1",
        date: "2024-03-11T15:30:00",
        items: "10",
        initialFee: "1,250.25",
        additionalItemFee: "100.00",
        amount: "1,350.25",
      },
      {
        orderId: "2",
        date: "2024-03-11T15:30:00",
        items: "10",
        initialFee: "1,250.25",
        additionalItemFee: "100.00",
        amount: "1,350.25",
      },
      {
        orderId: "3",
        date: "2024-03-11T15:30:00",
        items: "10",
        initialFee: "1,250.25",
        additionalItemFee: "100.00",
        amount: "1,350.25",
      },
    ] as PickServiceTable[],
    pickServiceTablePagination: {} as Pagination,

    packagingServiceTable: [
      {
        orderId: "1",
        date: "2024-03-11T15:30:00",
        boxType: "10",
        amount: "1,350.25",
      },
      {
        orderId: "2",
        date: "2024-03-11T15:30:00",
        boxType: "10",
        amount: "1,350.25",
      },
    ] as PackagingServiceTable[],
    packagingServiceTablePagination: {} as Pagination,

    shippingServiceTable: [] as ShippingServiceTable[],
    shippingServiceTablePagination: {} as Pagination,

    storageServiceTable: [] as StorageServiceTable[],
    storageServiceTablePagination: {} as Pagination,

    receivingEventServiceTable: [] as ReceivingEventServiceTable[],
    receivingEventServiceTablePagination: {} as Pagination,

    valueAddedServiceTable: [] as ValueAddedServiceTable[],
    valueAddedServiceTablePagination: {} as Pagination,

    adHocServiceTable: [] as AdHocServiceTable[],
    adHocServiceTablePagination: {} as Pagination,
  }),

  getters: {
    getPickServiceTable: (state) => state.pickServiceTable,
    getPickServiceTablePagination: (state) => state.pickServiceTablePagination,

    getPackagingServiceTable: (state) => state.packagingServiceTable,
    getPackagingServiceTablePagination: (state) =>
      state.packagingServiceTablePagination,

    getShippingServiceTable: (state) => state.shippingServiceTable,
    getShippingServiceTablePagination: (state) =>
      state.shippingServiceTablePagination,

    getStorageServiceTable: (state) => state.storageServiceTable,
    getStorageServiceTablePagination: (state) =>
      state.storageServiceTablePagination,

    getReceivingEventServiceTable: (state) => state.receivingEventServiceTable,
    getReceivingEventServiceTablePagination: (state) =>
      state.receivingEventServiceTablePagination,

    getValueAddedServiceTable: (state) => state.valueAddedServiceTable,
    getValueAddedServiceTablePagination: (state) =>
      state.valueAddedServiceTablePagination,

    getAdHocServiceTable: (state) => state.adHocServiceTable,
    getAdHocServiceTablePagination: (state) =>
      state.adHocServiceTablePagination,
  },

  actions: {
    async fetchPickServiceTable(page: number, limit: number) {
      return await useGlobalFunc().executeGlobalFunc(
        {
          url: "/services/pick",
          params: {
            page,
            limit,
          },
        },
        {
          loadingKey: "service.fetchPickServiceTable",
          showErrorToast: true,
          onSuccess: (data: {
            data: PickServiceTable[];
            pagination: Pagination;
          }) => {
            this.pickServiceTable = data.data;
            this.pickServiceTablePagination = data.pagination;
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    },

    async fetchPackagingServiceTable(page: number, limit: number) {
      return await useGlobalFunc().executeGlobalFunc(
        {
          url: "/services/packaging",
          params: {
            page,
            limit,
          },
        },
        {
          loadingKey: "service.fetchPackagingServiceTable",
          showErrorToast: true,
          onSuccess: (data: {
            data: PackagingServiceTable[];
            pagination: Pagination;
          }) => {
            this.packagingServiceTable = data.data;
            this.packagingServiceTablePagination = data.pagination;
          },
          onError: (error) => {
            console.log(error);
          },
        }
      );
    },
  },
});
