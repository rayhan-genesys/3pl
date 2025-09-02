<script setup lang="ts">
import { h, resolveComponent } from "vue";
import type { TableColumn } from "@nuxt/ui";
import type { ClientTable } from "~/types/client/client-table";
import type { DropdownMenuItem } from "@nuxt/ui";

const UBadge = resolveComponent("UBadge");
const UButton = resolveComponent("UButton");

defineProps<{
  data: ClientTable[];
  isLoading: boolean;
}>();

const emit = defineEmits<{
  (e: "view", id: string): void;
  (e: "edit", id: string): void;
  (e: "archive", id: string): void;
}>();

function dropdownItems(id: string): DropdownMenuItem[] {
  return [
    {
      label: "Edit",
      icon: "i-lucide-edit",
      onSelect: () => emit("edit", id),
    },
    {
      label: "Archive",
      icon: "i-lucide-archive",
      onSelect: () => emit("archive", id),
    },
  ];
}

const columns: TableColumn<ClientTable>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => row.getValue("id"),
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
    cell: ({ row }) => row.getValue("email"),
    meta: {
      class: {
        th: "text-gray-500",
        td: "text-black",
      },
    },
  },
  {
    accessorKey: "billingPeriod",
    header: "Billing Period",
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
    accessorKey: "totalInvoices",
    header: "Total Invoice",
    cell: ({ row }) => row.getValue("totalInvoices"),
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
  {
    accessorKey: "action",
    header: "Action",
    meta: {
      class: {
        th: "text-gray-500",
      },
    },
  },
];
</script>
<template>
  <UTable
    :data="data"
    :columns="columns"
    :loading="isLoading"
    class="flex-1 bg-white border border-gray-200 rounded-lg p-4 overflow-auto border-b-0 rounded-b-none"
  >
    <template #action-cell="{ row }">
      <div class="flex items-center gap-2">
        <UDropdownMenu
          :items="dropdownItems(row.original.id)"
          :content="{
            align: 'end',
            side: 'bottom',
            sideOffset: 8,
          }"
          :ui="{
            content: 'w-48',
          }"
        >
          <UButton
            icon="i-lucide-ellipsis-vertical"
            color="neutral"
            variant="ghost"
            class="text-black cursor-pointer"
          />
        </UDropdownMenu>
        <Icon
          name="lucide:file-text"
          class="text-black cursor-pointer"
          size="20"
          @click="emit('view', row.original.id)"
        />
      </div>
    </template>
  </UTable>
</template>
