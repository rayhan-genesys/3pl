import type { BreadcrumbItem } from "~/types/composables/breadcrumb.type";
import type { Menu } from "~/types/composables/sidebar.type";

export const useBreadcrumbs = () => {
  const route = useRoute();
  const router = useRouter();
  const { menus } = useSidebar();

  const toTitleCase = (value: string): string => {
    return value
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getLabelForPath = (path: string): string => {
    const found = menus.value.find((m: Menu) => m.path === path);
    if (found?.label) return found.label;
    const lastSegment = path.split("/").filter(Boolean).pop() || "";
    return toTitleCase(lastSegment || "Home");
  };

  const items = computed<BreadcrumbItem[]>(() => {
    const pathSegments = route.path.split("/").filter(Boolean);

    const parts: BreadcrumbItem[] = [
      {
        label: "Home",
        to: "/",
        isCurrent: pathSegments.length === 0,
      },
    ];

    if (pathSegments.length === 0) return parts;

    let accumulatedPath = "";
    pathSegments.forEach((segment, index) => {
      accumulatedPath += `/${segment}`;
      const isLast = index === pathSegments.length - 1;
      parts.push({
        label: getLabelForPath(accumulatedPath),
        to: isLast ? undefined : accumulatedPath,
        isCurrent: isLast,
      });
    });

    return parts;
  });

  const goTo = (to?: string) => {
    if (!to) return;
    router.push(to);
  };

  return { items, goTo };
};
