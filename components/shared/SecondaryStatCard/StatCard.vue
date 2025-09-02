<script setup lang="ts">
interface Props {
  title: string;
  subtitle: string;
  viewLink?: string;
  icon?: string;
}

defineProps<Props>();
</script>

<template>
  <div
    class="bg-white border border-gray-200 rounded-lg py-5 px-6 flex items-start justify-between hover:shadow transition-shadow duration-200 w-full"
  >
    <!-- Content -->
    <div class="w-full">
      <p class="text-sm text-black mb-2">{{ title }}</p>
      <p class="text-2xl font-bold text-gray-900">{{ subtitle }}</p>

      <UButton
        v-if="viewLink"
        :to="viewLink"
        class="mt-5"
        size="lg"
        icon="lucide:eye"
      >
        View all
      </UButton>
    </div>
    <div class="border-r border-gray-200 h-full"></div>

    <!-- Icon -->
    <div v-if="icon" class="text-gray-600 pl-5 self-center">
      <Icon :name="icon" size="28" />
    </div>
  </div>
</template>
