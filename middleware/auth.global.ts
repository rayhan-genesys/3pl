import { createLoginUrl } from "~/utils/redirect";

export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const { hasValidToken } = useApi();

  console.log("🚀 Auth & Permission middleware running for:", to.path);

  // Define public pages that don't need auth
  const publicPages = ["/login"];
  if (publicPages.includes(to.path)) return;

  // STEP 1: Authentication check
  if (!hasValidToken()) {
    console.log("❌ No token, redirecting to login");
    // Preserve current path as redirect parameter
    const redirectPath = to.fullPath !== "/" ? to.fullPath : undefined;
    const loginUrl = createLoginUrl(redirectPath);
    return navigateTo(loginUrl);
  }

  // STEP 2: Initialize auth if needed
  if (!authStore.isInitialized) {
    console.log("🔄 Initializing auth...");
    await authStore.initializeAuth();
  }
});
