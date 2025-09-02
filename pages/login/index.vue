<script setup lang="ts">
definePageMeta({
  layout: "auth",
});
</script>

<template>
  <div
    class="flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100"
  >
    <UCard class="w-full max-w-md shadow-xl border-0">
      <Login />
    </UCard>
  </div>
</template>

<style scoped></style>
