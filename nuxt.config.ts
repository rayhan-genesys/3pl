// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  modules: [
    "@pinia/nuxt",
    "@nuxt/ui",
    "@nuxt/icon",
    "@vee-validate/nuxt",
    "@vueuse/nuxt",
    "@nuxt/fonts",
  ],
  css: ["~/assets/css/main.css"],

  fonts: {
    families: [
      {
        name: "Poppins",
        provider: "google",
        display: "swap",
      },
    ],
  },

  pages: {
    pattern: ["**/*.vue", "!**/components/**"],
  },
  components: [
    "~/components",
    {
      path: "~/pages",
      pattern: "**/components/**",
      pathPrefix: false,
    },
  ],

  ui: {
    colorMode: false,
    theme: {
      colors: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "error",
        "neutral",
        "brand", // Add your custom alias here
      ],
    },
  },

  veeValidate: {
    // disable or enable auto imports
    autoImports: true,
    // Use different names for components
    componentNames: {
      Form: "VeeForm",
      Field: "VeeField",
      FieldArray: "VeeFieldArray",
      ErrorMessage: "VeeErrorMessage",
    },
  },
  imports: {
    dirs: ["stores/**"],
  },

  runtimeConfig: {
    public: {
      backendUrl:
        process.env.NUXT_PUBLIC_BACKEND_URL ||
        "https://three-pl-api.mountainyapps.com/",
      appEnv: process.env.NUXT_PUBLIC_APP_ENV,
    },
  },
});
