<script lang="ts" setup>
const invoiceStatStore = useInvoiceStatStore();

const search = ref("");
const billingFrequency = ref("all");
const invoiceType = ref("all");

const stats = computed(() => invoiceStatStore.getStats);
const invoices = computed(() => invoiceStatStore.getInvoices);

const handleDateUpdate = (value: any) => {
  console.log(value);
};

const isInvoiceDetailsSlideOverOpen = ref(false);
const invoiceId = ref("");

const openInvoiceDetailsSlideOver = (id: string) => {
  invoiceId.value = id;
  isInvoiceDetailsSlideOverOpen.value = true;
};
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <SharedStatCard
      v-for="(stat, i) in stats"
      :key="stat.title"
      :title="stat.title"
      :subtitle="stat.subtitle"
      :viewLink="stat.viewLink"
      :icon="stat.icon"
    />
  </div>

  <!-- Filters and Actions Bar -->
  <div class="flex flex-col xl:flex-row gap-4 my-4">
    <!-- Search -->
    <div class="2xl:w-5/6">
      <UInput
        icon="i-lucide-search"
        size="lg"
        variant="outline"
        v-model="search"
        placeholder="Search..."
        class="w-full"
      />
    </div>

    <!-- Filters + Button -->
    <div class="flex flex-col gap-2 md:flex-row w-full">
      <!-- Billing Frequency -->
      <USelect
        v-model="billingFrequency"
        :items="[
          { label: 'All Billing ', value: 'all' },
          { label: 'Monthly', value: 'monthly' },
          { label: 'Quarterly', value: 'quarterly' },
          { label: 'Annually', value: 'annually' },
        ]"
        size="lg"
        rounded="md"
        class="w-full"
      />

      <!-- Invoice Type -->
      <USelect
        v-model="invoiceType"
        :items="[
          { label: 'All Invoice', value: 'all' },
          { label: 'Standard', value: 'standard' },
          { label: 'Recurring', value: 'recurring' },
          { label: 'One-time', value: 'one-time' },
        ]"
        size="lg"
        rounded="md"
        class="w-full"
      />

      <!-- Date Range -->
      <div class="min-w-48">
        <SharedDateRangePicker @update:model-value="handleDateUpdate" />
      </div>

      <!-- Create Invoice Button -->
      <UButton
        color="primary"
        size="lg"
        class="w-full flex justify-center items-center cursor-pointer"
        @click="navigateTo('/invoice/create')"
      >
        Create Invoice
      </UButton>
    </div>
  </div>

  <InvoiceTable
    :data="invoices"
    @openInvoiceDetailsSlideOver="openInvoiceDetailsSlideOver"
  />

  <!-- Invoice Details SlideOver -->
  <InvoiceDetailsSlideOver
    v-model:open="isInvoiceDetailsSlideOverOpen"
    :invoiceId="invoiceId"
  />
</template>
