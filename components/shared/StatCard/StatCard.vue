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
      <p class="text-2xl font-bold text-gray-900">{{ title }}</p>
      <p class="text-sm text-black mt-1">{{ subtitle }}</p>
      <NuxtLink
        v-if="viewLink"
        :to="viewLink"
        class="text-xs text-primary-400 underline mt-2 inline-block"
      >
        View all
      </NuxtLink>
    </div>
    <div class="border-r border-gray-200 h-full"></div>

    <!-- Icon -->
    <div v-if="icon" class="text-gray-600 pl-5 self-center">
      <Icon :name="icon" size="28" />
    </div>
  </div>
</template>
