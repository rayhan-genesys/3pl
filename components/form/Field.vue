<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: null,
  },
  required: {
    type: Boolean,
    default: false,
  },
});
</script>

<template>
  <VeeField
    v-slot="{ field, handleChange, errorMessage }"
    :name="name"
    as="div"
    class="flex flex-col text-sm"
  >
    <div v-if="label" class="flex items-center gap-2 mb-2">
      <label :for="label" class="text-sm font-medium">{{ label }}</label>
    </div>
    <slot
      :id="label"
      :field="field"
      :error-message="errorMessage"
      :handle-change="handleChange"
    />
    <VeeErrorMessage
      v-if="errorMessage"
      :name="field.name"
      class="text-red-500 text-sm mt-1"
    />
  </VeeField>
</template>
