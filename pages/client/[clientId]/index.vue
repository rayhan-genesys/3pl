<script setup lang="ts">
// Define route parameters
const route = useRoute();
const clientId = route.params.clientId as string;

const globalFunc = useGlobalFunc();
const clientStore = useClientStore();

const clientDetails = computed(() => clientStore.getClient);
const isLoading = computed(() =>
  globalFunc.isLoading("client.getClientDetails")
);

onMounted(async () => {
  await clientStore.getClientDetails(clientId);
});
</script>

<template>
  <ClientDetailsSkleton v-if="isLoading" />
  <template v-else>
    <div class="bg-white rounded-lg border border-[#77777740] p-6">
      <div
        class="flex flex-col md:flex-row justify-between items-center border-b border-[#77777740] pb-4 mb-4"
      >
        <div class="flex items-center gap-4 mb-4 md:mb-0">
          <div
            class="bg-primary/10 rounded-full p-2 w-10 h-10 flex items-center justify-center"
          >
            <Icon name="lucide:users" class="text-primary" :size="20" />
          </div>
          <div class="space-y-1">
            <h1 class="text-3xl font-medium text-black">
              {{ clientDetails?.name }}
            </h1>

            <p class="text-sm text-black flex items-center gap-1">
              <Icon name="lucide:map-pin" class="w-4 h-4" />
              {{ clientDetails?.contactInfo?.address?.street }},
              {{ clientDetails?.contactInfo?.address?.city }},
              {{ clientDetails?.contactInfo?.address?.state }},
              {{ clientDetails?.contactInfo?.address?.postalCode }}
            </p>
          </div>
        </div>
        <UButton
          variant="outline"
          color="neutral"
          size="lg"
          class="gap-2 font-normal flex justify-center w-full md:w-auto"
        >
          <Icon name="lucide:edit" class="w-4 h-4" />
          Edit
        </UButton>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div class="flex flex-col gap-2 lg:border-r border-[#77777740] lg:pr-6">
          <span class="text-sm text-black font-medium">Client ID</span>
          <span class="text-sm text-black">{{ clientDetails?.id }}</span>
        </div>
        <div class="flex flex-col gap-2 lg:border-r border-[#77777740] lg:pr-6">
          <span class="text-sm text-black font-medium">Email</span>
          <div class="flex items-center gap-2 flex-wrap">
            <span class="text-sm text-black bg-primary/10 rounded-md px-2 py-1">
              {{ clientDetails?.contactInfo?.email }}
            </span>
            <!-- <span class="text-sm text-black bg-primary/10 rounded-md px-2 py-1">
            </span> -->
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sm text-black font-medium">Phone</span>
          <span class="text-sm text-black">{{
            clientDetails?.contactInfo?.phone
          }}</span>
        </div>
        <div class="flex flex-col gap-2 lg:border-r border-[#77777740] lg:pr-6">
          <span class="text-sm text-black font-medium">Billing Frequency</span>
          <UBadge color="primary" variant="subtle" class="text-sm w-fit">
            {{ clientDetails?.billingFrequency }}
          </UBadge>
        </div>
        <div class="flex flex-col gap-2 lg:border-r border-[#77777740] lg:pr-6">
          <span class="text-sm text-black font-medium">Billing Day</span>
          <span class="text-sm text-black">{{
            weekDayMapper(clientDetails?.billingDay)
          }}</span>
        </div>
        <div class="flex flex-col gap-2">
          <span class="text-sm text-black font-medium">Payment Terms</span>
          <span class="text-sm text-black"
            >Net {{ clientDetails?.paymentTerms }}</span
          >
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mt-6">
      <SharedSecondaryStatCard
        title="Total Invoices"
        :subtitle="clientDetails?.totalInvoice?.toString()"
        :viewLink="`/client/${clientId}/invoices`"
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
    </div>
  </template>
</template>
