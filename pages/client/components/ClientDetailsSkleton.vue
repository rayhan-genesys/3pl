<template>
  <!-- Main Client Details Card -->
  <div class="bg-white rounded-lg border border-[#77777740] p-6 animate-pulse">
    <!-- Header Section -->
    <div
      class="flex flex-col md:flex-row justify-between items-center border-b border-[#77777740] pb-4 mb-4"
    >
      <div class="flex items-center gap-4 mb-4 md:mb-0">
        <!-- Avatar Placeholder -->
        <div class="bg-gray-200 rounded-full w-10 h-10"></div>

        <!-- Text Placeholders -->
        <div class="space-y-3">
          <div class="bg-gray-200 rounded h-6 w-48"></div>
          <div class="bg-gray-200 rounded h-4 w-64"></div>
        </div>
      </div>

      <!-- Edit Button Skeleton -->
      <div class="bg-gray-200 rounded-lg w-full md:w-24 h-10"></div>
    </div>

    <!-- Info Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- Client ID -->
      <div class="flex flex-col gap-2 lg:border-r border-[#77777740] lg:pr-6">
        <div class="bg-gray-200 rounded h-4 w-16"></div>
        <div class="bg-gray-200 rounded h-5 w-20"></div>
      </div>

      <!-- Email -->
      <div class="flex flex-col gap-2 lg:border-r border-[#77777740] lg:pr-6">
        <div class="bg-gray-200 rounded h-4 w-16"></div>
        <div class="flex gap-2">
          <div class="bg-gray-200 rounded h-6 w-32"></div>
          <div class="bg-gray-200 rounded h-6 w-32"></div>
        </div>
      </div>

      <!-- Phone -->
      <div class="flex flex-col gap-2">
        <div class="bg-gray-200 rounded h-4 w-16"></div>
        <div class="bg-gray-200 rounded h-5 w-24"></div>
      </div>

      <!-- Billing Frequency -->
      <div class="flex flex-col gap-2 lg:border-r border-[#77777740] lg:pr-6">
        <div class="bg-gray-200 rounded h-4 w-28"></div>
        <div class="bg-gray-200 rounded h-7 w-20"></div>
      </div>

      <!-- Billing Day -->
      <div class="flex flex-col gap-2 lg:border-r border-[#77777740] lg:pr-6">
        <div class="bg-gray-200 rounded h-4 w-20"></div>
        <div class="bg-gray-200 rounded h-5 w-16"></div>
      </div>

      <!-- Payment Terms -->
      <div class="flex flex-col gap-2">
        <div class="bg-gray-200 rounded h-4 w-24"></div>
        <div class="bg-gray-200 rounded h-5 w-16"></div>
      </div>
    </div>
  </div>

  <!-- Stat Cards Skeleton -->
  <div class="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4 mt-6">
    <div v-for="n in 4" :key="n" class="flex flex-col gap-1">
      <div
        class="bg-white border border-gray-200 rounded-lg p-6 flex items-start justify-between w-full animate-pulse"
      >
        <!-- Content Side -->
        <div class="w-full">
          <!-- Title placeholder -->
          <div class="bg-gray-200 rounded h-4 w-24 mb-2"></div>
          <!-- Subtitle placeholder -->
          <div class="bg-gray-200 rounded h-6 w-16 mb-5"></div>
          <!-- Button placeholder -->
          <div class="bg-gray-200 rounded h-10 w-20"></div>
        </div>

        <!-- Separator (optional) -->
        <div class="border-r border-gray-200 h-14 mx-4"></div>

        <!-- Icon placeholder -->
        <div class="bg-gray-200 rounded-full w-7 h-7 self-start"></div>
      </div>
    </div>
  </div>
</template>
