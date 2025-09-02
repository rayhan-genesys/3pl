<script setup lang="ts">
import {
  CalendarDate,
  DateFormatter,
  getLocalTimeZone,
} from "@internationalized/date";

type DateRange = {
  start: CalendarDate;
  end: CalendarDate;
};

type SelectedDateRange = {
  start: string;
  end: string;
};

const df = new DateFormatter("en-US", {
  month: "short",
  day: "numeric",
});

const resultDf = new DateFormatter("en-US", {
  month: "numeric",
  day: "numeric",
  year: "numeric",
});

const emit = defineEmits<{
  (e: "update:modelValue", value: SelectedDateRange | null): void;
}>();

const modelValue = shallowRef<DateRange | null>(null);

const displayText = computed(() => {
  if (modelValue.value) {
    return `${df.format(
      modelValue.value.start.toDate(getLocalTimeZone())
    )} - ${df.format(modelValue.value.end.toDate(getLocalTimeZone()))}`;
  }

  return "Select date range";
});

const resetDates = (e: MouseEvent) => {
  e.stopPropagation();
  modelValue.value = null;
};

watch(modelValue, (value) => {
  let selectedDateRange = null;
  if (value) {
    selectedDateRange = {
      start: resultDf.format(value.start.toDate(getLocalTimeZone())),
      end: resultDf.format(value.end.toDate(getLocalTimeZone())),
    };
  }

  emit("update:modelValue", selectedDateRange);
});
</script>

<template>
  <UPopover>
    <div class="relative">
      <UButton
        color="neutral"
        variant="outline"
        trailing-icon="i-lucide-calendar"
        class="w-full px-4 py-2 flex justify-between items-center font-normal"
      >
        {{ displayText }}
      </UButton>

      <div
        v-if="modelValue"
        @click="resetDates"
        class="absolute z-10 top-[-10px] right-[-5px] cursor-pointer bg-error rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
      >
        <Icon name="lucide:x" size="xs" class="w-3 h-3 text-white" />
      </div>
    </div>

    <template #content>
      <UCalendar v-model="modelValue" class="p-2" :number-of-months="2" range />
    </template>
  </UPopover>
</template>
