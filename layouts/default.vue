<template>
  <div class="w-full">
    <div class="flex w-full h-screen overflow-hidden">
      <div class="w-14 lg:w-[288px] border-r border-[#5A45AA4D]">
        <LayoutSidebar />
      </div>
      <div class="w-[calc(100%-56px)] lg:w-[calc(100%-288px)]">
        <LayoutBreadcrumbs />
        <div class="h-[100vh] overflow-y-auto w-full bg-[#F6F8FC]">
          <div class="p-4 sm:p-6 w-full mx-auto mb-20">
            <slot />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
