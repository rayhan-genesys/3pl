<script lang="ts" setup>
const globalFunc = useGlobalFunc();
const invoiceStatStore = useInvoiceStatStore();
const clientStore = useClientStore();
const clientId = useRoute().params.clientId as string;

const search = ref("");
const billingFrequency = ref("all");
const invoiceType = ref("all");

const invoices = computed(() => invoiceStatStore.getInvoices);
const clientDetails = computed(() => clientStore.getClient);
const isClientDetailsLoading = computed(() =>
  globalFunc.isLoading("client.getClientDetails")
);

const handleDateUpdate = (value: any) => {
  console.log(value);
};

onMounted(async () => {
  clientStore.getClientDetails(clientId);
});
</script>

<template>
  <BasicClientInfoCardSkleton v-if="isClientDetailsLoading" />
  <BasicClientInfoCard v-else :clientDetails="clientDetails" />

  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mt-4">
    <SharedSecondaryStatCardSkleton
      v-if="isClientDetailsLoading"
      v-for="value in 4"
      :key="value"
    />
    <template v-else>
      <SharedSecondaryStatCard
        title="Total Invoices"
        :subtitle="clientDetails?.totalInvoice?.toString()"
        icon="lucide:file-text"
      />
      <SharedSecondaryStatCard
        title="Total Amount"
        :subtitle="`$${clientDetails?.totalAmount?.toLocaleString()}`"
        icon="lucide:dollar-sign"
      />
      <SharedSecondaryStatCard
        title="Paid Amount"
        :subtitle="`$${clientDetails?.paidAmount?.toLocaleString()}`"
        icon="lucide:dollar-sign"
      />
      <SharedSecondaryStatCard
        title="Due Amount"
        :subtitle="`$${clientDetails?.dueAmount?.toLocaleString()}`"
        icon="lucide:dollar-sign"
      />
    </template>
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
      >
        Create Invoice
      </UButton>
    </div>
  </div>

  <InvoiceTable :data="invoices" />
</template>
