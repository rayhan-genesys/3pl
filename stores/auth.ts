import type { AuthLoginResponse, User } from "~/types/stores/auth.type";

export const useAuthStore = defineStore("authStore", {
  state: () => ({
    isInitialized: false,
    token: null,
    refreshToken: null,
    user: null,
  }),

  getters: {
    getToken: (state) => state.token,
    getRefreshToken: (state) => state.refreshToken,
    getUser: (state) => state.user,
    getIsInitialized: (state) => state.isInitialized,
  },

  actions: {
    async login(username: string, password: string) {
      const { setTokens } = useApi();
      return await useGlobalFunc().executeGlobalFunc<AuthLoginResponse>(
        {
          url: "/auth/login",
          method: "post",
          data: {
            email: username,
            password,
          },
        },
        {
          loadingKey: "auth.login",
          showErrorToast: true,
          onSuccess: async (data) => {
            setTokens(data.access_token, data.refresh_token);
            await this.initializeAuth();

            // Handle redirect after successful login
            const targetPath = getRedirectTarget();
            navigateTo(targetPath);
          },
        }
      );
    },

    async initializeAuth() {
      if (this.isInitialized) return;

      try {
        const { getTokens } = useApi();
        const tokens = getTokens();

        // Only proceed if we have a valid token
        if (tokens.token) {
          this.token = tokens.token;
          this.refreshToken = tokens.refreshToken || null;

          // If we have a token, try to fetch user data
          await this.fetchUser();
        } else {
          // No token found, mark as initialized without making API call
          console.log("No token found, skipping user fetch");
          this.isInitialized = true;
        }
      } catch (error) {
        console.error("Auth initialization failed:", error);

        await this.logout();
      } finally {
        this.isInitialized = true;
      }
    },

    async fetchUser() {
      return await useGlobalFunc().executeGlobalFunc<User>(
        {
          url: "/auth/profile",
        },
        {
          loadingKey: "auth.fetchUser",
          showErrorToast: true,
          onSuccess: async (data) => {
            console.log("🚀 ~ onSuccess ~ data:", data);
            this.user = data;
          },

          onError: async () => {
            await this.logout();
          },
        }
      );
    },

    async logout() {
      const { removeAuthToken } = useApi();
      removeAuthToken();
      this.token = null;
      this.refreshToken = null;
      this.user = null;
      this.isInitialized = false;

      // Navigate to login (preserve any existing redirect parameter)
      const route = useRoute();
      const redirectPath = route.query.redirect as string;
      const loginUrl = createLoginUrl(redirectPath);
      await navigateTo(loginUrl);
    },
  },
});
