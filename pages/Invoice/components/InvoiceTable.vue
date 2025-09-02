<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { InvoiceTable } from "~/types/invoice/invoice-table";

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

defineProps<{
  data: InvoiceTable[];
}>();

const emit = defineEmits<{
  (e: "openInvoiceDetailsSlideOver", invoiceId: string): void;
}>();

const columns: TableColumn<InvoiceTable>[] = [
  {
    accessorKey: "client",
    header: "Client",
    cell: ({ row }) => row.getValue("client"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => row.getValue("status"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "invoiceId",
    header: "Invoice ID",
    cell: ({ row }) => row.getValue("invoiceId"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "invoiceDate",
    header: "Invoice Date",
    cell: ({ row }) => row.getValue("invoiceDate"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "creationType",
    header: "Creation Type",
    cell: ({ row }) => row.getValue("creationType"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "billingFrequency",
    header: "Billing Frequency",
    cell: ({ row }) => {
      return h(UBadge, { variant: "subtle", color: "primary" }, () =>
        row.getValue("billingFrequency")
      );
    },
    meta: {
      class: {
        th: "text-gray-500",
      },
    },
  },
  {
    accessorKey: "totalAmount",
    header: "Total Amount",
    cell: ({ row }) => row.getValue("totalAmount"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "paymentTerms",
    header: "Payment Terms",
    cell: ({ row }) => row.getValue("paymentTerms"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "paymentMethod",
    header: "Payment Method",
    cell: ({ row }) => row.getValue("paymentMethod"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "downloadLink",
    header: "Download Link",
    cell: ({ row }) => {
      return h(UButton, {
        variant: "soft",
        icon: "i-heroicons-arrow-down-tray",
        size: "sm",
        class: "text-black cursor-pointer",
        onClick: () => {
          console.log(row.getValue("downloadLink"));
        },
      });
    },
    meta: {
      class: {
        th: "text-gray-500",
      },
    },
  },
  {
    accessorKey: "invoiceDetails",
    header: "Invoice Details",
    meta: {
      class: {
        th: "text-gray-500",
      },
    },
  },
];

const handlePageChange = (page: number) => {
  console.log(page);
};

const selectedPageSize = ref(10);

const openInvoiceDetailsSlideOver = (invoiceId: string) => {
  emit("openInvoiceDetailsSlideOver", invoiceId);
};
</script>
<template>
  <UTable
    :data="data"
    :columns="columns"
    class="flex-1 bg-white border border-gray-200 rounded-lg p-4 overflow-auto border-b-0 rounded-b-none"
  >
    <template #invoiceDetails-cell="{ row }">
      <div class="flex items-center gap-2">
        <Icon
          name="lucide:file-text"
          class="text-black cursor-pointer"
          size="20"
          @click="openInvoiceDetailsSlideOver(row.getValue('invoiceId'))"
        />
        <UButton
          variant="link"
          size="sm"
          class="text-primary-300 cursor-pointer underline"
          label="Quickbooks"
        />
      </div>
    </template>
  </UTable>
  <div
    class="flex justify-between border border-default p-4 bg-white rounded-b-lg"
  >
    <div class="flex items-center gap-2">
      <span class="text-sm">Show Per Page </span>
      <USelect
        v-model="selectedPageSize"
        :items="[10, 20, 50, 100]"
        size="lg"
        rounded="md"
        class="w-24"
      />
    </div>
    <SharedTablePagination
      :total-pages="10"
      :current-page="1"
      :has-next-page="true"
      :has-previous-page="true"
      @page-change="handlePageChange"
    />
  </div>
</template>
