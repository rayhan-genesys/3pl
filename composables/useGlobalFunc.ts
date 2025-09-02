import type { AxiosRequestConfig } from "axios";

interface ApiStateOptions {
  loadingKey?: string;
  showSuccessToast?: boolean;
  showErrorToast?: boolean;
  onSuccess?: (data?: any) => void | Promise<void>;
  onError?: (error: any) => void | Promise<void>;
}

// Global loading states store
const loadingStates = reactive<Record<string, boolean>>({});

export function useGlobalFunc(defaultOptions?: ApiStateOptions) {
  const toast = useNotification();
  const api = useApi();
  const localLoading = ref(false);
  const error = ref<any>(null);
  const data = ref<any>(null);

  // Get loading state based on key or use local
  const isLoading = (key: string): boolean => {
    return computed(() => loadingStates[key] || false).value;
  };

  // Set loading state
  const setLoading = (value: boolean, key?: string) => {
    const loadingKey = key || defaultOptions?.loadingKey;
    if (loadingKey) {
      loadingStates[loadingKey] = value;
    } else {
      localLoading.value = value;
    }
  };

  // Handle success
  const handleSuccess = (
    message?: string,
    responseData?: any,
    options?: ApiStateOptions
  ) => {
    const opts = { ...defaultOptions, ...options };

    // Set data
    data.value = responseData;
    error.value = null;
    console.log("🚀 ~ handleSuccess ~ data:", data.value);
    console.log("🚀 ~ handleSuccess ~ message:", message);
    console.log("🚀 ~ handleSuccess ~ opts:", opts);

    // Show toast if enabled
    if (opts.showSuccessToast !== false && message) {
      toast.success(message, "Success");
    }

    // Call custom success handler
    if (opts.onSuccess) {
      opts.onSuccess(responseData);
    }
  };

  // Handle error
  const handleError = (
    err: any,
    customMessage?: string,
    options?: ApiStateOptions
  ) => {
    const opts = { ...defaultOptions, ...options };

    // Extract error message
    const errorMessage =
      customMessage ||
      err.response?.data?.message ||
      err.message ||
      "An error occurred";

    // Set error state
    error.value = err;

    console.log("🚀 ~ handleError ~ error:", error.value);
    console.log("🚀 ~ handleError ~ errorMessage:", errorMessage, opts);

    // Show toast if enabled
    if (opts.showErrorToast !== false) {
      toast.error(errorMessage, "Error");
    }

    // Call custom error handler
    if (opts.onError) {
      opts.onError(err);
    }

    return errorMessage;
  };

  // Execute async function with loading state management
  const executeGlobalFunc = async <T = any>(
    config: AxiosRequestConfig,
    options?: ApiStateOptions & {
      successMessage?: string;
      errorMessage?: string;
      loadingKey?: string;
    }
  ): Promise<{ success: boolean; data?: T; error?: any }> => {
    const opts = { ...defaultOptions, ...options };
    const loadingKey = opts.loadingKey;

    setLoading(true, loadingKey);
    try {
      const { data, error, isFinished } = api.request<T>(config);

      await until(isFinished).toBe(true);
      console.log("🚀 ~ executeGlobalFunc ~ error:", error.value);
      if (error.value) throw error.value;

      handleSuccess(opts.successMessage, data.value, opts);
      return { success: true, data: data.value };
    } catch (err) {
      console.log("🚀 ~ executeGlobalFunc ~ err:", err);
      const errorMsg = handleError(err, opts.errorMessage, opts);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false, loadingKey);
    }
  };

  // Reset state
  const reset = () => {
    localLoading.value = false;
    error.value = null;
    data.value = null;
  };

  return {
    // State
    isLoading,
    error: readonly(error),
    data: readonly(data),

    // Methods
    setLoading,
    handleSuccess,
    handleError,
    executeGlobalFunc,
    reset,

    // Direct access to loading states
    loadingStates: readonly(loadingStates),
  };
}
