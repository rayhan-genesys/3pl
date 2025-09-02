<script setup lang="ts">
import * as yup from "yup";
import * as CustomForm from "~/components/form/form";

interface Props {
  open: boolean;
}

interface Emits {
  "update:open": [value: boolean];
}

interface Client {
  clientId: string;
  clientName: string;
  email: string[];
  phone: string;
  quickbooksId: string;
  businessAddress: string;
  billingFrequency: string;
  billingDay: string | undefined;
  paymentTerms: string;
  paymentPreference: string;
  status: boolean;
  invoicePreference: string;
  pricingModel: string | undefined;
  billingProfile: string | undefined;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isOpen = computed({
  get: () => props.open,
  set: (value) => emit("update:open", value),
});

const globalFunc = useGlobalFunc();
const isLoading = computed(() => globalFunc.isLoading("client.create"));

const { client, validate, handleSubmit } = useClientForm();

function useClientForm() {
  const client = ref<Client>({
    clientId: "",
    clientName: "",
    email: [],
    phone: "",
    quickbooksId: "",
    businessAddress: "",
    billingFrequency: "Weekly",
    billingDay: undefined,
    paymentTerms: "Net 7",
    paymentPreference: "Credit Card",
    status: true,
    invoicePreference: "PDF",
    pricingModel: undefined,
    billingProfile: undefined,
  });

  const validate = yup.object({
    clientId: yup.string().required("Client ID is required"),
    clientName: yup.string().required("Client Name is required"),
    email: yup
      .array()
      .of(yup.string().email("Invalid email format"))
      .min(1, "At least one email is required")
      .required("Email is required"),
    phone: yup.string().required("Phone is required"),
    quickbooksId: yup.string().required("Quickbooks ID is required"),
    businessAddress: yup.string().required("Business Address is required"),
    billingFrequency: yup.string().required("Billing Frequency is required"),
    billingDay: yup.string().required("Billing Day is required"),
    paymentTerms: yup.string().required("Payment Terms is required"),
    paymentPreference: yup.string().required("Payment Preference is required"),
    invoicePreference: yup.string().required("Invoice Preference is required"),
    pricingModel: yup.string().required("Pricing Model is required"),
    billingProfile: yup.string().required("Billing Profile is required"),
  });

  const handleSubmit = async (values: Client) => {
    // TODO: Implement client creation logic
    console.log("Creating client:", values);
    // After successful creation, close the modal
    isOpen.value = false;
  };

  return {
    client,
    validate,
    handleSubmit,
  };
}

// Dropdown options
const billingFrequencyOptions = [
  { label: "Weekly", value: "Weekly" },
  { label: "Monthly", value: "Monthly" },
  { label: "Quarterly", value: "Quarterly" },
  { label: "Annually", value: "Annually" },
];

const billingDayOptions = [
  { label: "1st", value: "1" },
  { label: "15th", value: "15" },
  { label: "30th", value: "30" },
];

const paymentTermsOptions = [
  { label: "Net 7", value: "Net 7" },
  { label: "Net 15", value: "Net 15" },
  { label: "Net 30", value: "Net 30" },
  { label: "Net 60", value: "Net 60" },
];

const paymentPreferenceOptions = [
  { label: "Credit Card", value: "Credit Card" },
  { label: "Bank Transfer", value: "Bank Transfer" },
  { label: "Check", value: "Check" },
  { label: "Cash", value: "Cash" },
];

const invoicePreferenceOptions = [
  { label: "PDF", value: "PDF" },
  { label: "Email", value: "Email" },
  { label: "Print", value: "Print" },
];

const pricingModelOptions = [
  { label: "Standard", value: "Standard" },
  { label: "Premium", value: "Premium" },
  { label: "Enterprise", value: "Enterprise" },
];

const billingProfileOptions = [
  { label: "Profile A", value: "Profile A" },
  { label: "Profile B", value: "Profile B" },
  { label: "Profile C", value: "Profile C" },
];
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :close="{
      color: 'primary',
    }"
    :ui="{ content: 'sm:max-w-xl md:max-w-3xl lg:max-w-5xl' }"
    title="Add New Client"
  >
    <template #body>
      <CustomForm.Base
        :initial-values="client"
        :validation-schema="validate"
        class="flex flex-col gap-4"
        @submit="handleSubmit"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Client ID -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="clientId"
            label="Client ID"
          >
            <UInput
              v-model="field.value"
              placeholder="client id"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
              :highlight="errorMessage ? true : false"
            />
          </CustomForm.Field>

          <!-- Client Name -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="clientName"
            label="Client Name"
          >
            <UInput
              v-model="field.value"
              placeholder="client name"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
              :highlight="errorMessage ? true : false"
            />
          </CustomForm.Field>
        </div>

        <!-- Email -->
        <CustomForm.Field
          v-slot="{ field, handleChange, errorMessage }"
          name="email"
          label="Email"
        >
          <UInputTags
            :default-value="field.value"
            placeholder="Type email and hit enter"
            size="lg"
            :color="errorMessage ? 'error' : 'primary'"
            :highlight="errorMessage ? true : false"
            add-on-blur
            add-on-paste
            delimiter=""
            @update:model-value="
              (value) => {
                handleChange(value);
              }
            "
          />
        </CustomForm.Field>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Phone -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="phone"
            label="Phone"
          >
            <UInput
              v-model="field.value"
              placeholder="phone"
              type="tel"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
              :highlight="errorMessage ? true : false"
            />
          </CustomForm.Field>

          <!-- Quickbooks ID -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="quickbooksId"
            label="Quickbooks ID"
          >
            <UInput
              v-model="field.value"
              placeholder="quickbooks id"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
              :highlight="errorMessage ? true : false"
            />
          </CustomForm.Field>
        </div>

        <!-- Business Address (Full Width) -->
        <CustomForm.Field
          v-slot="{ field, handleChange, errorMessage }"
          name="businessAddress"
          label="Business Address"
        >
          <UTextarea
            v-model="field.value"
            placeholder="Business Address"
            size="lg"
            :rows="3"
            :color="errorMessage ? 'error' : 'primary'"
            :highlight="errorMessage ? true : false"
          />
        </CustomForm.Field>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Billing Frequency -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="billingFrequency"
            label="Billing Frequency"
          >
            <USelect
              v-model="field.value"
              :items="billingFrequencyOptions"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
            />
          </CustomForm.Field>

          <!-- Billing Day -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="billingDay"
            label="Billing Day"
          >
            <USelect
              v-model="field.value"
              :items="billingDayOptions"
              placeholder="Select"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
            />
          </CustomForm.Field>

          <!-- Payment Terms -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="paymentTerms"
            label="Payment Terms"
          >
            <USelect
              v-model="field.value"
              :items="paymentTermsOptions"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
            />
          </CustomForm.Field>

          <!-- Payment Preference -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="paymentPreference"
            label="Payment Preference"
          >
            <USelect
              v-model="field.value"
              :items="paymentPreferenceOptions"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
            />
          </CustomForm.Field>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Status Toggle -->
          <div class="flex flex-col text-sm">
            <label class="text-sm font-medium mb-2">Status</label>
            <USwitch v-model="client.status" size="lg" />
          </div>

          <!-- Invoice Preference -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="invoicePreference"
            label="Invoice Preference"
          >
            <USelect
              v-model="field.value"
              :items="invoicePreferenceOptions"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
            />
          </CustomForm.Field>
        </div>

        <div
          class="flex flex-col md:flex-row gap-4 items-center justify-center"
        >
          <!-- Select Pricing Model -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="pricingModel"
            label="Select Pricing Model"
            class="w-full"
          >
            <USelect
              v-model="field.value"
              :items="pricingModelOptions"
              placeholder="Select Template"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
            />
          </CustomForm.Field>

          <span class="text-xs text-primary">OR</span>

          <!-- Select Client Billing Profiles -->
          <CustomForm.Field
            v-slot="{ field, handleChange, errorMessage }"
            name="billingProfile"
            label="Select Client Billing Profiles"
            class="w-full"
          >
            <USelect
              v-model="field.value"
              :items="billingProfileOptions"
              placeholder="Select Client"
              size="lg"
              :color="errorMessage ? 'error' : 'primary'"
            />
          </CustomForm.Field>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-center gap-3 mt-6">
          <UButton
            type="button"
            color="neutral"
            variant="soft"
            size="lg"
            class="flex justify-center w-full"
            @click="isOpen = false"
          >
            Cancel
          </UButton>
          <UButton
            type="submit"
            size="lg"
            class="flex justify-center w-full"
            :disabled="isLoading"
            :loading="isLoading"
          >
            Add
          </UButton>
        </div>
      </CustomForm.Base>
    </template>
  </UModal>
</template>
