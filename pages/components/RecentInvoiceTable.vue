<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { RecentInvoiceTable } from "~/types/dashboard/stat";

const UButton = resolveComponent("UButton");

defineProps<{
  data: RecentInvoiceTable[];
}>();

const emit = defineEmits<{
  (e: "openInvoiceDetailsSlideOver", invoiceId: string): void;
}>();

const columns: TableColumn<RecentInvoiceTable>[] = [
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

const openInvoiceDetailsSlideOver = (invoiceId: string) => {
  emit("openInvoiceDetailsSlideOver", invoiceId);
};
</script>
<template>
  <UTable
    :data="data"
    :columns="columns"
    class="flex-1 bg-white border border-gray-200 rounded-lg p-4 overflow-auto"
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
          @click="
            () => {
              console.log(row.getValue('invoiceDetails'));
            }
          "
        />
      </div>
    </template>
  </UTable>
</template>
