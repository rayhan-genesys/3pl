// composables/useTab.ts
import type { TabsItem } from "@nuxt/ui";

export function useTab({
  items,
  defaultValue = items[0]?.value || "",
  queryParam = "tab",
  variant = "link",
  ui = {
    label: "cursor-pointer font-normal",
  },
}: {
  items: TabsItem[];
  defaultValue?: string | number;
  queryParam?: string;
  variant?: "link" | "pill";
  ui?: Record<string, any>;
}) {
  const route = useRoute();
  const router = useRouter();

  const active = computed<string | number>({
    get() {
      return (route.query[queryParam] as string) || defaultValue;
    },
    set(tab) {
      router.push({
        path: route.path,
        query: { ...route.query, [queryParam]: tab },
        hash: "#control-active-item",
      });
    },
  });

  return {
    items,
    active,
    variant,
    ui,
  };
}
