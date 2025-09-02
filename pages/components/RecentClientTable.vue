<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { RecentClientTable } from "~/types/dashboard/stat";

const UBadge = resolveComponent("UBadge");

defineProps<{
  data: RecentClientTable[];
}>();

const columns: TableColumn<RecentClientTable>[] = [
  {
    accessorKey: "id",
    header: "Client ID",
    cell: ({ row }) => `#${row.getValue("id")}`,
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => row.getValue("name"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "email",
    header: "Contact Information",
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "billingPeriod",
    header: "Billing",
    cell: ({ row }) => {
      return h(UBadge, { variant: "subtle", color: "primary" }, () =>
        row.getValue("billingPeriod")
      );
    },
    meta: {
      class: {
        th: "text-gray-500",
      },
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return h(UBadge, { variant: "subtle", color: "success" }, () =>
        row.getValue("status")
      );
    },
    meta: {
      class: {
        th: "text-gray-500",
      },
    },
  },

  {
    accessorKey: "nextBillingDate",
    header: "Next Billing Date",
    cell: ({ row }) => row.getValue("nextBillingDate"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
];
</script>

<template>
  <UTable
    :data="data"
    :columns="columns"
    class="flex-1 bg-white border border-gray-200 rounded-lg p-4 overflow-auto"
  />
</template>
