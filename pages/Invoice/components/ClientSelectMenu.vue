<script setup lang="ts">
const searchTerm = ref("");

const globalFn = useGlobalFunc();
const clientsTableStore = useClientTableStore();
const isLoading = computed(() => globalFn.isLoading("client.getClients"));

// Format clients for SelectMenu
const formattedClients = computed(() => {
  return clientsTableStore.getClients.map((client) => ({
    label: client.name || "Unknown Client", // Adjust based on your client object structure
    value: client.id, // Adjust based on your ID field
    ...client, // Keep all original client data
  }));
});

const handleDebouncedSearchTermUpdate = useDebounceFn((searchTerm: string) => {
  clientsTableStore.fetchClients(
    1,
    10,
    undefined,
    searchTerm || undefined,
    true
  );
}, 300);

// Initial load - fetch first set of clients
onMounted(async () => {
  clientsTableStore.fetchClients(1, 10, undefined, undefined, true);
});
</script>

<template>
  <USelectMenu
    v-model:search-term="searchTerm"
    :items="formattedClients"
    :loading="isLoading"
    placeholder="Select a client"
    class="w-full"
    variant="outline"
    size="lg"
    ignore-filter
    :search-input="{
      placeholder: 'Search clients...',
      icon: 'i-lucide-search',
    }"
    :reset-search-term-on-select="false"
    :reset-search-term-on-blur="false"
    @update:search-term="handleDebouncedSearchTermUpdate"
  >
    <!-- Optional: Customize how items are displayed -->
    <template #item-label="{ item }">
      <div class="flex flex-col">
        <span>{{ item.label }}</span>
        <!-- Add additional info if needed -->
        <span v-if="item.email" class="text-xs text-muted">
          {{ item.email }}
        </span>
      </div>
    </template>

    <!-- Optional: Show empty state -->
    <template #empty>
      <div class="p-2 text-center text-muted">
        {{ searchTerm ? "No clients found" : "Type to search clients" }}
      </div>
    </template>
  </USelectMenu>
</template>
