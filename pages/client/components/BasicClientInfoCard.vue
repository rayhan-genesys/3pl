<script setup lang="ts">
import type { ClientDetails } from "@/types/client/client-details";

defineProps<{
  clientDetails: ClientDetails;
}>();
</script>

<template>
  <div class="bg-white rounded-lg border border-[#77777740] p-6">
    <div class="flex flex-col md:flex-row justify-between items-center mb-2">
      <div class="flex items-center gap-4">
        <div
          class="bg-primary/10 rounded-full p-2 w-10 h-10 flex items-center justify-center"
        >
          <Icon name="lucide:users" class="text-primary" :size="20" />
        </div>
        <div class="space-y-0">
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
    </div>
  </div>
</template>
