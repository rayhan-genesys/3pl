<script lang="ts" setup>
const props = defineProps({
  // Individual props instead of meta object
  currentPage: {
    type: Number,
    required: true,
    default: 1,
  },
  totalPages: {
    type: Number,
    required: true,
    default: 1,
  },
  hasNextPage: {
    type: Boolean,
    default: false,
  },
  hasPreviousPage: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["page-change"]);

const navigateToPage = (page: number) => {
  // Use router navigation if useRouter prop is true

  emit("page-change", page);
};

const getPaginationArray = (totalPages: number, currentPage: number) => {
  const delta = 1; // Number of pages to show on each side of current page
  const pages: (number | string)[] = [];

  // Always show first page
  pages.push(1);

  // Calculate range around current page
  const leftBound = Math.max(2, currentPage - delta);
  const rightBound = Math.min(totalPages - 1, currentPage + delta);

  // Add ellipsis after first page if needed
  if (leftBound > 2) {
    pages.push("ellipsis-start");
  }

  // Add pages in range
  for (let i = leftBound; i <= rightBound; i++) {
    pages.push(i);
  }

  // Add ellipsis before last page if needed
  if (rightBound < totalPages - 1) {
    pages.push("ellipsis-end");
  }

  // Always show last page if it's different from first
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return pages;
};

const paginationArray = computed(() => {
  return getPaginationArray(props.totalPages, props.currentPage);
});
</script>

<template>
  <div class="flex items-center justify-between gap-3">
    <!-- left icon -->
    <div class="">
      <slot name="navLeft">
        <UButton
          :disabled="!hasPreviousPage"
          leading-icon="i-lucide-chevron-left"
          @click="hasPreviousPage && navigateToPage(currentPage - 1)"
          color="neutral"
          variant="outline"
          size="lg"
          class="text-black font-normal"
        >
          Previous
        </UButton>
      </slot>
    </div>

    <div class="flex items-center gap-2.5">
      <template v-for="(item, index) in paginationArray" :key="index">
        <div
          v-if="item === 'ellipsis-start' || item === 'ellipsis-end'"
          class="flex items-center justify-center text-neutral w-10 h-10 aspect-square"
        >
          <Icon name="lucide:ellipsis" />
        </div>
        <UButton
          v-else
          :disabled="currentPage === Number(item)"
          @click="navigateToPage(Number(item))"
          color="neutral"
          :variant="currentPage === Number(item) ? 'outline' : 'ghost'"
          size="lg"
          class="text-black font-normal"
        >
          {{ item }}
        </UButton>
      </template>
    </div>

    <!-- Right icon -->
    <div class="">
      <slot name="rightLeft">
        <UButton
          :disabled="!hasNextPage"
          trailing-icon="i-lucide-chevron-right"
          @click="hasNextPage && navigateToPage(currentPage + 1)"
          color="neutral"
          variant="outline"
          size="lg"
          class="text-black font-normal"
        >
          Next
        </UButton>
      </slot>
    </div>
  </div>
</template>
