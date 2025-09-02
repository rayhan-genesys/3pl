<script setup>
defineProps({
  initialValues: {
    type: Object,
    required: true,
  },
  validationSchema: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["submit"]);
function handleSubmit(values) {
  emit("submit", values);
}
</script>

<template>
  <VeeForm
    :initial-values="initialValues"
    :validation-schema="validationSchema"
    @submit="handleSubmit"
  >
    <slot />
  </VeeForm>
</template>
