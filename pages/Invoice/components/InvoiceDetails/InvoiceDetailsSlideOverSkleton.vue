<template>
  <div class="p-12 space-y-8 overflow-y-auto">
    <!-- Header Buttons Skeleton -->
    <div class="flex flex-col md:flex-row justify-end gap-2">
      <div class="h-10 w-48 bg-gray-200 rounded-md animate-pulse"></div>
      <div class="h-10 w-36 bg-gray-200 rounded-md animate-pulse"></div>
      <div class="h-10 w-36 bg-gray-200 rounded-md animate-pulse"></div>
      <div class="h-10 w-36 bg-gray-200 rounded-md animate-pulse"></div>
    </div>

    <!-- Invoice Header Skeleton -->
    <div
      class="flex flex-col sm:flex-row justify-between items-start sm:items-center"
    >
      <div class="space-y-3">
        <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div class="space-y-2 mt-4">
          <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-44 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
      <div class="mt-4 sm:mt-0 space-y-2">
        <div class="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>

    <!-- Separator -->
    <div class="h-px bg-gray-300 animate-pulse"></div>

    <!-- Billing Info Skeleton -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div class="space-y-3">
        <div class="h-5 w-16 bg-gray-200 rounded animate-pulse"></div>
        <div class="space-y-2">
          <div class="h-4 w-40 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-36 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div class="space-y-3">
        <div class="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div class="space-y-2">
          <div class="h-4 w-56 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-4 w-44 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      <div class="flex flex-col justify-between md:items-end space-y-3">
        <div class="h-4 w-28 bg-gray-200 rounded animate-pulse self-end"></div>
        <div class="h-4 w-40 bg-gray-200 rounded animate-pulse self-end"></div>
      </div>
    </div>

    <!-- Table Skeleton -->
    <table class="w-full">
      <thead class="text-sm bg-[#F2F7FA] border-b border-[#E1E5EB]">
        <tr>
          <th class="px-6 py-3">
            <div class="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
          </th>
          <th class="px-6 py-3">
            <div class="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
          </th>
          <th class="px-6 py-3">
            <div class="h-5 bg-gray-200 rounded animate-pulse w-1/4"></div>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr
          v-for="i in 4"
          :key="i"
          class="animate-pulse hover:bg-gray-50 transition-colors"
        >
          <td class="px-6 py-4">
            <div class="h-5 bg-gray-200 rounded w-3/4"></div>
          </td>
          <td class="px-6 py-4">
            <div class="h-5 bg-gray-200 rounded w-1/2"></div>
          </td>
          <td class="px-6 py-4">
            <div
              class="h-5 bg-gray-200 rounded w-2/3 flex justify-between items-center"
            ></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
