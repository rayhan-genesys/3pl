<script setup lang="ts">
const { items, goTo } = useBreadcrumbs();
</script>

<template>
  <div class="w-full h-[60px] border-b border-[#5A45AA4D]">
    <div class="px-4 sm:px-6 py-4 flex items-center gap-3">
      <Icon name="lucide:home" size="22" class="text-gray-800" />
      <nav class="flex items-center gap-2 text-sm">
        <template v-for="(item, idx) in items" :key="item.label + idx">
          <button
            v-if="item.to"
            class="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            @click="goTo(item.to)"
          >
            {{ item.label }}
          </button>
          <span
            v-else
            :class="[
              item.isCurrent ? 'font-semibold text-gray-900' : 'text-gray-400',
            ]"
          >
            {{ item.label }}
          </span>
          <span v-if="idx < items.length - 1" class="text-gray-300">/</span>
        </template>
      </nav>
    </div>
  </div>
</template>
