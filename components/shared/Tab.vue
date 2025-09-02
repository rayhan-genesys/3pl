<!-- components/SharedTab.vue -->
<script setup lang="ts">
import type { TabsItem } from "@nuxt/ui";
import { computed, type WritableComputedRef } from "vue";

type Variant = "link" | "pill";

const props = defineProps<{
  tab: {
    items: TabsItem[];
    active: WritableComputedRef<string | number>;
    variant?: Variant;
    ui?: Record<string, any>;
  };
}>();

const defaultProps = {
  variant: "link",
  ui: {
    label: "cursor-pointer font-normal",
  },
};

const activeModel = computed<string | number>({
  get: () => props.tab.active.value,
  set: (val) => (props.tab.active.value = val),
});
</script>

<template>
  <UTabs
    v-model="activeModel"
    :items="tab.items"
    :content="false"
    class="w-full"
    :variant="tab.variant || defaultProps.variant as Variant"
    :ui="tab.ui || defaultProps.ui"
  />
</template>
