import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { useAxios } from "@vueuse/integrations/useAxios";
import { useCookies } from "@vueuse/integrations/useCookies";
import axios from "axios";

// Types
interface ApiResponse<T = any> {
  data: Ref<T | undefined>;
  isFinished: Ref<boolean>;
  isLoading: Ref<boolean>;
  isAborted: Ref<boolean>;
  error: Ref<unknown>;
  abort: () => void;
  execute: (url?: string, config?: AxiosRequestConfig) => Promise<any>;
}

interface ApiMethods {
  get: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<ApiResponse<T>>;
  post: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<ApiResponse<T>>;
  put: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<ApiResponse<T>>;
  patch: <T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ) => Promise<ApiResponse<T>>;
  delete: <T = any>(
    url: string,
    config?: AxiosRequestConfig
  ) => Promise<ApiResponse<T>>;
}

// GLOBAL STATE FOR TOKEN REFRESH
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export function useApi() {
  const config = useRuntimeConfig();
  const cookies = useCookies(["token", "refreshToken"]);
  const enableDebugConsole =
    config.public.appEnv === "development" ||
    config.public.appEnv === "staging";

  // Create axios instance
  const axiosInstance: AxiosInstance = axios.create({
    baseURL: config.public.backendUrl || "/api",
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request interceptor
  axiosInstance.interceptors.request.use(
    (config) => {
      // Get auth token from cookies
      const authToken = cookies.get("token");

      if (authToken) {
        config.headers.Authorization = `Bearer ${authToken}`;
      }

      // Log request in development
      if (enableDebugConsole) {
        console.log("API Request:", {
          method: config.method,
          url: config.url,
          data: config.data,
          headers: config.headers,
        });
      }

      return config;
    },
    (error) => {
      console.error("Request interceptor error:", error);
      return Promise.reject(error);
    }
  );

  // Response interceptor
  axiosInstance.interceptors.response.use(
    (response) => {
      // Log response in development
      if (enableDebugConsole) {
        console.log("API Response:", {
          status: response.status,
          data: response.data,
          url: response.config.url,
        });
      }
      return response;
    },
    async (error: AxiosError) => {
      const originalRequest: any = error.config;

      if (error.response) {
        const { status, data } = error.response;

        switch (status) {
          case 401: {
            if (originalRequest._retry) break; // already retried

            if (isRefreshing) {
              // push into queue and wait for token
              return new Promise((resolve, reject) => {
                failedQueue.push({
                  resolve: (token: string) => {
                    originalRequest.headers[
                      "Authorization"
                    ] = `Bearer ${token}`;
                    resolve(axiosInstance(originalRequest));
                  },
                  reject: (err: any) => reject(err),
                });
              });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
              const newToken = await refreshAccessToken();
              processQueue(null, newToken);

              if (newToken) {
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
              } else {
                const authStore = useAuthStore();
                await authStore.logout();
              }
            } catch (err) {
              processQueue(err, null);
              const authStore = useAuthStore();
              await authStore.logout();
            } finally {
              isRefreshing = false;
            }
            break;
          }
          case 403:
            // Forbidden
            console.error("Access forbidden:", data);
            break;
          case 404:
            // Not found
            console.error("Resource not found:", data);
            break;
          case 422:
            // Validation error
            console.error("Validation error:", data);
            break;
          case 500:
            // Server error
            console.error("Server error:", data);
            break;
          default:
            console.error("API error:", status, data);
        }
      } else if (error.request) {
        // Request made but no response received
        console.error("No response received:", error.request);
      } else {
        // Error in request configuration
        console.error("Request configuration error:", error.message);
      }

      return Promise.reject(error);
    }
  );

  // Create wrapper functions for each HTTP method
  const createRequest = async <T = any>(
    method: "get" | "post" | "put" | "patch" | "delete",
    url: string,
    dataOrConfig?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> => {
    let requestConfig: AxiosRequestConfig = {
      method,
      url,
      ...config,
    };

    // Handle data parameter for methods that support it
    if (
      ["post", "put", "patch"].includes(method) &&
      dataOrConfig !== undefined
    ) {
      requestConfig.data = dataOrConfig;
    } else if (method === "get" || method === "delete") {
      // For GET and DELETE, the second parameter is config
      requestConfig = { ...requestConfig, ...dataOrConfig };
    }

    const { data, isFinished, isLoading, isAborted, error, abort, execute } =
      useAxios<T>(url, requestConfig, axiosInstance);

    return {
      data,
      isFinished,
      isLoading,
      isAborted,
      error,
      abort,
      execute,
    };
  };

  // Alternative: Create a more flexible wrapper
  const request = <T = any>(config: AxiosRequestConfig): ApiResponse<T> => {
    const { data, isFinished, isLoading, isAborted, error, abort, execute } =
      useAxios<T>(config.url!, config, axiosInstance);

    return {
      data,
      isFinished,
      isLoading,
      isAborted,
      error,
      abort,
      execute,
    };
  };

  // API methods object - now returns promises
  const api: ApiMethods = {
    get: <T = any>(url: string, config?: AxiosRequestConfig) =>
      createRequest<T>("get", url, config),

    post: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
      createRequest<T>("post", url, data, config),

    put: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
      createRequest<T>("put", url, data, config),

    patch: <T = any>(url: string, data?: any, config?: AxiosRequestConfig) =>
      createRequest<T>("patch", url, data, config),

    delete: <T = any>(url: string, config?: AxiosRequestConfig) =>
      createRequest<T>("delete", url, config),
  };

  // Helper function to set auth token
  const setTokens = (accessToken: string, refreshToken: string) => {
    cookies.set("token", accessToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      secure: true,
    });
    cookies.set("refreshToken", refreshToken, {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
      secure: true,
    });
  };

  // Helper function to remove auth token
  const removeAuthToken = () => {
    cookies.remove("token");
    cookies.remove("refreshToken");
  };

  // Helper function to get auth token
  const getTokens = () => {
    return cookies.getAll();
  };

  // Helper function to check if user is authenticated based on token
  const hasValidToken = () => {
    const token = cookies.get("token");
    // Basic token validation (you can add more sophisticated checks)
    return !!(token && token.length > 0);
  };

  const refreshAccessToken = async (): Promise<string | null> => {
    const refreshToken = cookies.get("refreshToken");
    if (!refreshToken) return null;

    try {
      const response = await axios.post(
        `${config.public.backendUrl}auth/refresh`,
        { refreshToken },
        { headers: { "Content-Type": "application/json" } }
      );

      const newAccessToken = response.data.access_token;
      cookies.set("token", newAccessToken);

      return newAccessToken;
    } catch (err) {
      console.error("Token refresh failed:", err);
      return null;
    }
  };

  return {
    ...api,
    request, // Expose the flexible request method
    setTokens,
    removeAuthToken,
    getTokens,
    hasValidToken,
    axiosInstance, // Expose instance for advanced use cases
  };
}
