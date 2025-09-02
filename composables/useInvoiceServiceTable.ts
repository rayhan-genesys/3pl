import type { Services } from "@/types/invoice/service-tables.type";

type ServiceConfig = {
  columns: any[];
  fetchData: (page: number, limit: number) => void;
  getData: any[];
  getPagination: any;
  loadingKey: string;
};

export const useServiceData = (serviceId: Services) => {
  const serviceStore = useServiceStore();
  const globalFn = useGlobalFunc();

  // Service Configs
  const serviceConfigs: Record<Services, ServiceConfig> = {
    pick: {
      columns: [
        {
          accessorKey: "orderId",
          header: "Order ID",
        },
        {
          accessorKey: "date",
          header: "Date",
        },
        {
          accessorKey: "items",
          header: "Items",
        },
        {
          accessorKey: "initialFee",
          header: "Initial Fee",
        },

        {
          accessorKey: "additionalItemFee",
          header: "Additional Item Fee",
        },
        {
          accessorKey: "amount",
          header: "Amount",
        },
      ],
      fetchData: serviceStore.fetchPickServiceTable,
      getData: serviceStore.getPickServiceTable,
      getPagination: serviceStore.getPickServiceTablePagination,
      loadingKey: "service.fetchPickServiceTable",
    },
    packaging: {
      columns: [
        {
          accessorKey: "orderId",
          header: "Order ID",
        },

        {
          accessorKey: "date",
          header: "Date",
        },
        {
          accessorKey: "boxType",
          header: "Box Type",
        },
        {
          accessorKey: "amount",
          header: "Amount",
        },
      ],
      fetchData: serviceStore.fetchPackagingServiceTable,
      getData: serviceStore.getPackagingServiceTable,
      getPagination: serviceStore.getPackagingServiceTablePagination,
      loadingKey: "service.fetchPackagingServiceTable",
    },
  };

  const currentConfig = computed(() => serviceConfigs[serviceId]);

  //handle page change
  const handlePageChange = (page: number) => {
    currentConfig.value.fetchData(page, 10);
  };

  //handle page size change
  const handlePageSizeChange = (value: number) => {
    currentConfig.value.fetchData(1, value);
  };

  const data = computed(() => currentConfig.value.getData);
  const pagination = computed(() => currentConfig.value.getPagination);
  const columns = computed(() => currentConfig.value.columns);
  const isLoading = computed(() =>
    globalFn.isLoading(currentConfig.value.loadingKey)
  );

  return {
    data,
    isLoading,
    pagination,
    columns,
    handlePageChange,
    handlePageSizeChange,
  };
};
