<script setup lang="ts">
import type { ClientFromApi } from "~/types/client/client-table";

const clients = [
  {
    label: "The Nordstick",
    value: "The Nordstick",
  },
  {
    label: "Acme Corp",
    value: "Acme Corp",
  },

  {
    label: "Tech Solutions",
    value: "Tech Solutions",
  },
];
const selectedClient = ref();
const billingLocation = ref("All Location");
const startDate = ref<Date | null>(new Date());
const endDate = ref<Date | null>(new Date());

const generateInvoice = () => {
  alert(`Generating invoice for ${selectedClient.value}...`);
};
</script>

<template>
  <div class="bg-white rounded-lg border border-gray-200 p-8 max-w-2xl mx-auto">
    <!-- Header -->
    <h2 class="text-xl font-semibold text-gray-900 mb-6">Create Invoice</h2>

    <!-- Select Client -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2"
        >Select Client</label
      >
      <ClientSelectMenu v-model="selectedClient" />
    </div>

    <template v-if="selectedClient">
      <!-- Billing Location (Optional) -->
      <div
        class="flex flex-col md:flex-row gap-2 mb-6 bg-primary/10 p-4 rounded-lg justify-between md:items-center"
      >
        <div class="flex items-center gap-3 mb-4">
          <Icon name="lucide:map-pinned" class="text-primary" size="18" />
          <div>
            <p class="text-sm font-medium text-gray-900">Billing Location</p>
            <p class="text-xs text-gray-500">(Optional)</p>
          </div>
        </div>
        <USelect
          v-model="billingLocation"
          :items="['All Location', 'New York', 'Los Angeles', 'Chicago']"
          placeholder="Select location"
          class="w-full md:w-1/2"
          color="neutral"
          variant="outline"
          size="lg"
        />
      </div>

      <!-- Client Info Section -->
      <div class="bg-primary/10 px-4 py-6 rounded-lg mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-y-3 gap-x-4">
          <!-- Client -->
          <div class="flex items-center gap-2">
            <Icon
              name="lucide:circle-user-round"
              class="text-primary"
              size="18"
            />
            <span class="text-sm font-medium text-gray-700">Client:</span>
          </div>
          <span class="text-sm text-gray-900">{{ selectedClient.name }}</span>

          <!-- Contact -->
          <div class="flex items-center gap-2">
            <Icon name="lucide:phone-call" class="text-primary" size="18" />
            <span class="text-sm font-medium text-gray-700">Contact:</span>
          </div>
          <span class="text-sm text-gray-900">(555) 123-456</span>

          <!-- To -->
          <div class="flex items-center gap-2">
            <Icon name="lucide:mail" class="text-primary" size="18" />
            <span class="text-sm font-medium text-gray-700">To:</span>
          </div>
          <span class="text-sm text-gray-900">nordstick@gmail.com</span>

          <!-- CC -->
          <div class="flex items-center gap-2">
            <Icon name="lucide:mail" class="text-primary" size="18" />
            <span class="text-sm font-medium text-gray-700">CC:</span>
          </div>
          <span class="text-sm text-gray-900">nordstick012@gmail.com</span>

          <!-- Business Address -->
          <div class="flex items-center gap-2">
            <Icon name="lucide:map-pinned" class="text-primary" size="18" />
            <span class="text-sm font-medium text-gray-700"
              >Business Address:</span
            >
          </div>
          <span class="text-sm text-gray-900"
            >123 Business Ave, Suite 100, New York, NY 10001</span
          >
        </div>
      </div>
    </template>

    <!-- Invoice ID -->
    <p class="text-sm text-gray-500 mb-4">
      <span class="font-medium mr-2">Invoice ID:</span>
      <span class="text-gray-900 font-medium">20256987</span>
    </p>

    <!-- Billing Period -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Billing Period Start</label
        >
        <SharedDatePicker v-model="startDate" />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2"
          >Billing Period End</label
        >
        <SharedDatePicker v-model="endDate" />
      </div>
    </div>

    <!-- Generate Button -->
    <UButton
      size="lg"
      class="w-full flex justify-center items-center cursor-pointer"
      @click="generateInvoice"
    >
      Generate Invoice
    </UButton>
  </div>
</template>
