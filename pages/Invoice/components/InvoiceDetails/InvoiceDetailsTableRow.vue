<script setup lang="ts">
import type { Services } from "@/types/invoice/service-tables.type";
interface Props {
  id: Services;
  service: string;
  orders: string;
  amount: string;
}

const props = defineProps<Props>();

const isOpen = ref(false);
const selectedPageSize = ref(5);
const pagination = ref({
  totalPages: 10,
  page: 1,
  hasNextPage: true,
  hasPreviousPage: false,
});

const { data, columns, isLoading, handlePageChange, handlePageSizeChange } =
  useServiceData(props.id);
</script>

<template>
  <tr
    class="hover:bg-gray-50 transition-colors cursor-pointer text-[#1D1D1D]"
    :class="{ 'bg-[#F4F6F8]': isOpen }"
    @click="isOpen = !isOpen"
  >
    <td class="px-6 py-4 whitespace-nowrap text-sm">{{ props.service }}</td>
    <td class="px-6 py-4 text-left text-sm">{{ props.orders }}</td>
    <td class="px-6 py-4 text-sm flex justify-between items-center">
      {{ props.amount }}
      <Icon
        name="lucide:chevron-right"
        class="w-5 h-5 transition-transform duration-200"
        :class="{ 'rotate-90': isOpen }"
      />
    </td>
  </tr>
  <tr>
    <td class="text-sm" colspan="3">
      <UCollapsible :open="isOpen">
        <template #content>
          <UTable
            :ui="{
              thead: 'bg-[#FAFAFA]',
              th: 'text-[#717680] font-normal',
            }"
            :data="data"
            :columns="columns"
            :loading="isLoading"
          />
          <!-- table footer (pagination) -->
          <div
            class="flex flex-col md:flex-row md:justify-between justify-center items-center gap-2 p-4 border-t border-[#E1E5EB]"
          >
            <div class="flex items-center gap-2">
              <span class="text-sm">Show Per Page </span>
              <USelect
                v-model="selectedPageSize"
                :items="[5, 10, 20, 50, 100]"
                size="lg"
                rounded="md"
                class="w-24"
                @update:model-value="handlePageSizeChange"
              />
            </div>

            <SharedTablePagination
              :total-pages="pagination.totalPages"
              :current-page="pagination.page"
              :has-next-page="pagination.hasNextPage"
              :has-previous-page="pagination.hasPreviousPage"
              @page-change="handlePageChange"
            />
          </div>
        </template>
      </UCollapsible>
    </td>
  </tr>
</template>
