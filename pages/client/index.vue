<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";

const items: TabsItem[] = [
  {
    label: "Clients",
    value: "clients",
    icon: "i-lucide-users",
  },
  {
    label: "Archive",
    value: "archive",
    icon: "i-lucide-archive",
  },
];

const tabs = useTab({ items });

const clientTableStore = useClientTableStore();
const globalFunc = useGlobalFunc();

const isCreateModalOpen = ref(false);

const clients = computed(() => clientTableStore.getClients);
const pagination = computed(() => clientTableStore.getPagination);
const isLoading = computed(() => globalFunc.isLoading("client.getClients"));

const {
  search,
  billingFrequency,
  isActive,
  selectedPageSize,
  debouncedSearch,
  handleBillingFrequencyChange,
  handlePageChange,
  handlePageSizeChange,
} = useFilter();

function useFilter() {
  const search = ref("");
  const billingFrequency = ref<string | undefined>(undefined);
  const isActive = computed(() => tabs.active.value !== "archive");
  const selectedPageSize = ref(10);

  const handleSearch = (value: string) => {
    clientTableStore.fetchClients(
      1,
      selectedPageSize.value,
      billingFrequency.value,
      value,
      isActive.value
    );
  };
  const debouncedSearch = useDebounceFn(handleSearch, 500);

  const handleBillingFrequencyChange = (value: string | undefined) => {
    billingFrequency.value = value;
    clientTableStore.fetchClients(
      1,
      selectedPageSize.value,
      value,
      search.value,
      isActive.value
    );
  };

  const handlePageChange = (page: number) => {
    clientTableStore.fetchClients(
      page,
      selectedPageSize.value,
      billingFrequency.value,
      search.value,
      isActive.value
    );
  };

  const handlePageSizeChange = (value: number) => {
    clientTableStore.fetchClients(
      1,
      value,
      billingFrequency.value,
      search.value,
      isActive.value
    );
  };

  watch(tabs.active, () => {
    search.value = "";
    billingFrequency.value = undefined;
    clientTableStore.fetchClients(
      1,
      selectedPageSize.value,
      billingFrequency.value,
      search.value,
      isActive.value
    );
  });

  return {
    search,
    billingFrequency,
    isActive,
    selectedPageSize,
    debouncedSearch,
    handleBillingFrequencyChange,
    handlePageChange,
    handlePageSizeChange,
  };
}

const openCreateModal = () => {
  isCreateModalOpen.value = true;
};

const handleView = (id: string) => {
  navigateTo(`/client/${id}`);
};

const handleEdit = (id: string) => {
  console.log("edit", id);
};

const handleArchive = async (id: string) => {
  await clientTableStore.archiveClient(id);
  clientTableStore.fetchClients(
    1,
    selectedPageSize.value,
    billingFrequency.value,
    search.value,
    isActive.value
  );
};

const handleRestore = async (id: string) => {
  await clientTableStore.restoreClient(id);
  clientTableStore.fetchClients(
    1,
    selectedPageSize.value,
    billingFrequency.value,
    search.value,
    isActive.value
  );
};

onMounted(() => {
  clientTableStore.fetchClients(
    1,
    selectedPageSize.value,
    billingFrequency.value,
    search.value,
    isActive.value
  );
});
</script>

<template>
  <SharedTab :tab="tabs" />
  <!-- Filters and Actions Bar -->
  <div class="flex flex-col gap-3 md:flex-row md:gap-2 my-4">
    <!-- Search Input: Full width on mobile, takes more space on md+ -->
    <UInput
      icon="i-lucide-search"
      size="lg"
      variant="outline"
      v-model="search"
      placeholder="Search..."
      class="w-full md:flex-1"
      @update:model-value="debouncedSearch"
    />

    <!-- Container for Select and Button: Column on mobile, row on md+ -->
    <div class="flex flex-col gap-3 md:flex-row md:gap-2 md:w-auto">
      <!-- Billing Select: Full width on mobile, auto width on md+ -->
      <div class="relative">
        <USelect
          v-model="billingFrequency"
          :items="[
            { label: 'Weekly', value: 'WEEKLY' },
            { label: 'Monthly', value: 'MONTHLY' },
          ]"
          placeholder="Billing Frequency"
          size="lg"
          rounded="md"
          class="w-full md:w-48"
          @update:model-value="handleBillingFrequencyChange"
        />
        <div
          v-if="billingFrequency"
          @click="handleBillingFrequencyChange(undefined)"
          class="absolute z-10 top-[-10px] right-[-5px] cursor-pointer bg-error rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
        >
          <Icon name="lucide:x" size="xs" class="w-3 h-3 text-white" />
        </div>
      </div>

      <!-- Create Invoice Button: Full width on mobile, auto width on md+ -->
      <UButton
        color="primary"
        size="lg"
        class="w-full flex justify-center items-center md:w-auto"
        @click="openCreateModal"
      >
        Create Client
      </UButton>
    </div>
  </div>

  <ClientTable
    v-if="tabs.active.value === 'clients'"
    :data="clients"
    :is-loading="isLoading"
    @view="handleView"
    @edit="handleEdit"
    @archive="handleArchive"
  />
  <ArchiveClientTable
    v-else
    :data="clients"
    :is-loading="isLoading"
    @view="handleView"
    @edit="handleEdit"
    @restore="handleRestore"
  />

  <!-- table footer (pagination) -->
  <div
    class="flex flex-col md:flex-row md:justify-between justify-center items-center gap-2 border border-default p-4 bg-white rounded-b-lg"
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

  <!-- Create Client Modal -->
  <CreateClientModal v-model:open="isCreateModalOpen" />
</template>
