<script setup lang="ts">
interface Props {
  open: boolean;
  invoiceId: string;
}

interface Emits {
  "update:open": [value: boolean];
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const globalFunc = useGlobalFunc();
const invoiceStatStore = useInvoiceStatStore();

const invoiceDetails = computed(() => invoiceStatStore.getInvoiceDetails);
const isLoading = computed(() =>
  globalFunc.isLoading("invoice.getInvoiceDetails")
);

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit("update:open", value),
});

watch(
  () => props.invoiceId,
  (newVal) => {
    invoiceStatStore.fetchInvoiceDetails(newVal);
  }
);
</script>

<template>
  <USlideover
    v-model:open="isOpen"
    :ui="{ content: 'sm:max-w-xl md:max-w-3xl lg:max-w-5xl' }"
  >
    <template #content>
      <InvoiceDetailsSlideOverSkleton v-if="isLoading" />
      <div v-else class="p-12 space-y-8 overflow-y-auto">
        <!-- Header with buttons -->

        <div class="flex flex-col md:flex-row justify-end gap-2">
          <UButton
            color="primary"
            size="lg"
            label="Push to QuickBooks"
            class="flex justify-center"
          />
          <UButton
            color="neutral"
            size="lg"
            variant="subtle"
            icon="lucide:download"
            label="Export PDF"
            class="flex justify-center"
          />
          <UButton
            color="neutral"
            size="lg"
            variant="subtle"
            icon="lucide:download"
            label="Export CSV"
            class="flex justify-center"
          />
          <UButton
            color="neutral"
            size="lg"
            variant="subtle"
            icon="lucide:send"
            label="Send Email"
            class="flex justify-center"
          />
        </div>

        <!-- Invoice Header -->

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm"
        >
          <div>
            <h1 class="text-2xl font-bold text-[#4A6FA5]">INVOICE</h1>
            <div class="mt-2 space-y-1">
              <p>
                <span class="font-semibold">Invoice #:</span> INV-20250708-791
              </p>
              <p><span class="font-semibold">Date:</span> Jul 8, 2025</p>
              <p><span class="font-semibold">Payment Terms:</span> Net 7</p>
              <p><span class="font-semibold">Due Date:</span> Jul 15, 2025</p>
            </div>
          </div>
          <div class="mt-4 sm:mt-0 sm:text-right">
            <p><span class="font-semibold">Status:</span> Unpaid</p>
            <p><span class="font-semibold">Tax ID:</span> TAX-123456789</p>
          </div>
        </div>

        <USeparator />
        <!-- Billing Information -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6 text-sm">
          <div>
            <h3 class="font-semibold mb-2">Bill To:</h3>
            <p>
              The Nordstick<br />123 Business Ave, Suite 100<br />New York, NY
              10001
            </p>
          </div>

          <div>
            <h3 class="font-semibold mb-2">Billing Details:</h3>
            <p>
              <span class="font-medium">Billing Period:</span> 6/02/2025 -
              6/08/2025<br />
              <span class="font-medium">Billing Frequency:</span> Weekly
            </p>
          </div>

          <div class="flex flex-col justify-between md:items-end">
            <a href="#" class="text-blue-600 hover:underline mb-2"
              >View in Quickbooks →</a
            >
            <p>
              <span class="font-semibold">Payment Method:</span> Credit Card
            </p>
          </div>
        </div>

        <!-- Table -->

        <InvoiceDetailsTable />
      </div>
    </template>
  </USlideover>
</template>
