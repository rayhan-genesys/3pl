<script setup lang="ts">
import * as yup from "yup";
import * as CustomForm from "~/components/form/form";

interface User {
  email: string;
  password: string;
}

const { login } = useAuthStore();
const globalFunc = useGlobalFunc();
const isLoading = computed(() => globalFunc.isLoading("auth.login"));

const { user, validate, handleSubmit } = useLoginForm();

//  "email": "admin@3pl-finance.com",
//  "password": "admin123"
function useLoginForm() {
  const user = ref<User>({
    email: "admin@3pl-finance.com",
    password: "admin123",
  });

  const validate = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: User) => {
    await login(values.email, values.password);
  };

  return {
    user,
    validate,
    handleSubmit,
  };
}
</script>

<template>
  <div class="py-6">
    <div class="mb-6 text-center">
      <UIcon
        name="i-heroicons-lock-closed"
        class="w-10 h-10 text-primary mx-auto mb-2"
      />
      <h2 class="text-2xl font-semibold">Sign in</h2>
      <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">
        Enter your credentials to access your account
      </p>
    </div>

    <CustomForm.Base
      :initial-values="user"
      :validation-schema="validate"
      class="flex flex-col gap-5 max-w-[370px] mx-auto"
      @submit="handleSubmit"
    >
      <CustomForm.Field
        v-slot="{ field, handleChange, errorMessage }"
        name="email"
        label="Email"
      >
        <UInput
          v-model="field.value"
          placeholder="e.g. john.doe@gmail.com"
          icon="i-heroicons-envelope"
          size="lg"
          :color="errorMessage ? 'error' : 'primary'"
          :highlight="errorMessage ? true : false"
        />
      </CustomForm.Field>

      <CustomForm.Field
        v-slot="{ field, handleChange, errorMessage }"
        name="password"
        label="Password"
      >
        <UInput
          v-model="field.value"
          placeholder="Your password"
          type="password"
          icon="i-heroicons-key"
          size="lg"
          :color="errorMessage ? 'error' : 'primary'"
          :highlight="errorMessage ? true : false"
        />
      </CustomForm.Field>

      <UButton
        type="submit"
        size="lg"
        block
        icon="i-heroicons-arrow-right-on-rectangle"
        class="cursor-pointer"
        :disabled="isLoading"
        :loading="isLoading"
      >
        Sign in
      </UButton>
    </CustomForm.Base>

    <p class="text-center text-sm mt-6 text-gray-600 dark:text-gray-400">
      Forgot your password?
      <NuxtLink to="#" class="text-primary hover:underline">
        Click here to reset it.
      </NuxtLink>
    </p>
  </div>
</template>

<style scoped></style>
