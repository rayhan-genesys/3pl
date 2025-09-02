<script lang="ts" setup>
const globalFunc = useGlobalFunc();
const dashboardStatStore = useDashboardStatStore();
const isLodingStats = computed(() =>
  globalFunc.isLoading("dashboard.getStats")
);
const stats = computed(() => dashboardStatStore.getStats);
const recentClients = computed(() => dashboardStatStore.getRecentClients);

const {
  recentInvoices,
  isInvoiceDetailsSlideOverOpen,
  invoiceId,
  openInvoiceDetailsSlideOver,
} = useRecentInvoiceTable();

function useRecentInvoiceTable() {
  const recentInvoices = computed(() => dashboardStatStore.getRecentInvoices);
  const isInvoiceDetailsSlideOverOpen = ref(false);
  const invoiceId = ref("");

  const openInvoiceDetailsSlideOver = (id: string) => {
    invoiceId.value = id;
    isInvoiceDetailsSlideOverOpen.value = true;
  };

  return {
    recentInvoices,
    isInvoiceDetailsSlideOverOpen,
    invoiceId,
    openInvoiceDetailsSlideOver,
  };
}

onMounted(async () => {
  await dashboardStatStore.fetchDashboardStats();
});
</script>

<template>
  <h1 class="text-3xl font-semibold text-primary">
    Welcome to 3PLFin, Eric Dunion, 👋
  </h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
    <SharedStatCardSkleton v-if="isLodingStats" v-for="i in 4" :key="i" />
    <SharedStatCard
      v-else
      v-for="(stat, i) in stats"
      :key="stat.title"
      :title="stat.title"
      :subtitle="stat.subtitle"
      :viewLink="stat.viewLink"
      :icon="stat.icon"
    />
  </div>

  <div class="mt-6 flex justify-between items-center">
    <span class="text-md text-black">New added clients</span>
    <UButton
      variant="link"
      size="sm"
      class="underline text-primary-400 cursor-pointer"
      @click="navigateTo('/client')"
      >See all details</UButton
    >
  </div>

  <div class="mt-6">
    <RecentClientTable :data="recentClients" />
  </div>

  <div class="mt-6 flex justify-between items-center">
    <span class="text-md text-black">Recent generated invoices</span>
    <UButton
      variant="link"
      size="sm"
      class="underline text-primary-400 cursor-pointer"
      @click="navigateTo('/invoice')"
      >See all invoices</UButton
    >
  </div>

  <div class="mt-6">
    <RecentInvoiceTable
      :data="recentInvoices"
      @openInvoiceDetailsSlideOver="openInvoiceDetailsSlideOver"
    />
  </div>

  <!-- Invoice Details SlideOver -->
  <InvoiceDetailsSlideOver
    v-model:open="isInvoiceDetailsSlideOverOpen"
    :invoiceId="invoiceId"
  />
</template>
