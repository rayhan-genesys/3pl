<!-- SharedDatePicker.vue -->
<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

// Define props and emits for v-model with Date object
const props = defineProps<{
  modelValue?: Date | null;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: Date | null];
}>();

// Convert between Date and CalendarDate for internal use
const internalCalendarDate = computed({
  get: () => {
    if (props.modelValue) {
      // Convert Date to CalendarDate
      const date = props.modelValue;
      return new CalendarDate(
        date.getFullYear(),
        date.getMonth() + 1, // CalendarDate uses 1-based months
        date.getDate()
      );
    }
    return null;
  },
  set: (value: CalendarDate | null) => {
    if (value) {
      // Convert CalendarDate to Date using toDate method
      const jsDate = value.toDate(getLocalTimeZone());
      emit("update:modelValue", jsDate);
    } else {
      emit("update:modelValue", null);
    }
  },
});

// Date formatter
const df = new DateFormatter("en-US", {
  dateStyle: "long",
});

// Helper to format the display text
const displayText = computed(() => {
  if (props.modelValue) {
    return df.format(props.modelValue);
  }
  return "Select a date";
});
</script>

<template>
  <UPopover>
    <UButton
      color="neutral"
      variant="outline"
      trailing-icon="i-lucide-calendar"
      size="lg"
      class="w-full flex justify-between items-center cursor-pointer px-4 py-2"
    >
      {{ displayText }}
    </UButton>

    <template #content>
      <UCalendar v-model="internalCalendarDate" class="p-2" />
    </template>
  </UPopover>
</template>
