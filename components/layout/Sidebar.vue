<script lang="ts" setup>
const { menus } = useSidebar();
const { logout } = useAuthStore();
</script>

<template>
  <div class="bg-surface-ground h-full">
    <div class="h-[60px] border-b border-[#F4F6F8] flex items-center">
      <div class="flex-1 flex justify-center lg:hidden">
        <NuxtLink to="/" class="text-2xl font-semibold text-gray-900"
          >M</NuxtLink
        >
      </div>
      <NuxtLink
        to="/"
        class="text-2xl font-semibold text-gray-900 hidden lg:block text-center px-9 align-start"
      >
        Mountainy
      </NuxtLink>
    </div>

    <div class="p-3 lg:px-6 py-4 text-sm">
      <div class="space-y-0">
        <div v-for="menu in menus" :key="menu.label">
          <NuxtLink
            :to="menu.isDisabled ? undefined : menu.path"
            v-if="menu.path"
          >
            <li
              :class="[
                'rounded-md lg:px-3 max-lg:justify-center py-2.5 my-1 flex items-center gap-2 paragraph_black relative text-[#4D5863]',
                menu.isActive ? 'bg-[#F4F6F8]' : 'hover:bg-gray-50',
                menu.isDisabled
                  ? 'cursor-not-allowed opacity-50'
                  : 'cursor-pointer',
              ]"
            >
              <Icon
                :name="menu.icon"
                :size="18"
                :class="[menu.isActive ? 'text-gray-900' : 'text-gray-500']"
              />

              <span
                :class="[
                  'max-lg:hidden font-medium',
                  menu.isActive ? 'text-gray-900' : 'text-gray-700',
                ]"
              >
                {{ menu.label }}
              </span>
            </li>
          </NuxtLink>
        </div>
        <li
          @click="logout"
          :class="[
            'rounded-md lg:px-3 max-lg:justify-center py-2.5 my-1 flex items-center gap-2 paragraph_black relative text-[#4D5863]',
            'hover:bg-gray-50',
            'cursor-pointer',
          ]"
        >
          <Icon name="lucide:log-out" :size="18" class="text-gray-500" />

          <span :class="['max-lg:hidden font-medium', 'text-gray-700']">
            Log out
          </span>
        </li>
      </div>
    </div>
  </div>
</template>
