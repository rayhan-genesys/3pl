<script setup lang="ts">
import type { Services } from "@/types/invoice/service-tables.type";

const services = [
  {
    id: "pick" as Services,
    service: "Pick Fees",
    orders: "30",
    amount: "1,250.25",
  },
  {
    id: "packaging" as Services,
    service: "Packaging Costs",
    orders: "30",
    amount: "250.00",
  },
  // { id: "3", service: "Shipping Costs", orders: "30", amount: "97.06" },
  // { id: "4", service: "Storage Fees", orders: "30", amount: "45.70" },
  // { id: "5", service: "Receiving Events", orders: "3", amount: "150.00" },
  // { id: "6", service: "Value-Added Services", orders: "3", amount: "25.50" },
  // { id: "7", service: "Ad Hoc Charges", orders: "2", amount: "60.00" },
];
</script>

<template>
  <table class="w-full">
    <thead class="bg-[#F2F7FA] border-b border-[#E1E5EB] text-sm">
      <tr>
        <th class="px-6 py-3 text-left text-gray-700 font-semibold">
          Service Type
        </th>
        <th class="px-6 py-3 text-left text-gray-700 font-semibold">
          Total Orders
        </th>
        <th class="px-6 py-3 text-left text-gray-700 font-semibold">
          Total Amount
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-200">
      <InvoiceDetailsTableRow
        v-for="service in services"
        :key="service.id"
        :id="service.id"
        :service="service.service"
        :orders="service.orders"
        :amount="service.amount"
      />
    </tbody>
    <tbody>
      <tr class="font-semibold font-lg">
        <td></td>
        <td class="px-6 pt-6 pb-1 whitespace-nowrap text-right">Sub Total :</td>

        <td class="px-6 pt-6 pb-1">$1,250.25</td>
      </tr>
      <tr class="font-semibold font-lg">
        <td></td>
        <td class="px-6 py-1 whitespace-nowrap text-right">Tax :</td>

        <td class="px-6 py-1">$100.00</td>
      </tr>

      <tr class="font-semibold font-lg">
        <td></td>
        <td class="px-6 py-1 whitespace-nowrap text-right">
          Credit Card Processing Fee :
        </td>
        <td class="px-6 py-1">$10.00</td>
      </tr>
      <tr>
        <td colspan="3" class="h-4"></td>
      </tr>
      <tr class="font-bold font-lg border-t border-[#E1E5EB]">
        <td></td>
        <td class="px-6 py-1 whitespace-nowrap text-right">Total :</td>
        <td class="px-6 py-1">$10.00</td>
      </tr>
    </tbody>
  </table>
</template>
