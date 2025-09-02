export function useNotification() {
  const toast = useToast();
  return {
    success: (message: string, title: string) => {
      toast.add({
        title,
        description: message,
        icon: "i-lucide-check-circle",
        close: {
          color: "primary",
          variant: "outline",
          class: "rounded-full",
        },
      });
    },
    error: (message: string, title: string) => {
      toast.add({
        title,
        description: message,
        icon: "i-lucide-monitor-x",
        color: "error",
        close: {
          color: "error",
          variant: "outline",
          class: "rounded-full",
        },
      });
    },
    info: (message: string, title: string) => {
      toast.add({
        title,
        description: message,
        icon: "i-lucide-info",
        color: "info",
        close: {
          color: "info",
          variant: "outline",
          class: "rounded-full",
        },
      });
    },
    warning: (message: string, title: string) => {
      toast.add({
        title,
        description: message,
        icon: "i-lucide-alert-triangle",
        color: "warning",
        close: {
          color: "warning",
          variant: "outline",
          class: "rounded-full",
        },
      });
    },
  };
}
