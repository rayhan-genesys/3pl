import type { Menu } from "~/types/composables/sidebar.type";

export const useSidebar = () => {
  const route = useRoute();

  const menuItems = ref<Menu[]>([
    {
      label: "Dashboard",
      icon: "lucide:layout-dashboard",
      path: "/",
      isActive: false,
      isDisabled: false,
    },
    {
      label: "Invoice",
      icon: "lucide:file-text",
      path: "/invoice",
      isActive: false,
      isDisabled: false,
    },
    {
      label: "Clients",
      icon: "lucide:users",
      path: "/client",
      isActive: false,
      isDisabled: false,
    },
    {
      label: "Pricing Models",
      icon: "lucide:dollar-sign",
      path: "/pricing-model",
      isActive: false,
      isDisabled: false,
    },
  ]);

  const menus = computed(() => {
    const path = route.path;
    const clonedMenuItems = JSON.parse(JSON.stringify(menuItems.value));

    clonedMenuItems.forEach((menu: Menu) => {
      menu.isActive = menu.path === path;
    });

    return clonedMenuItems;
  });

  return { menus };
};
