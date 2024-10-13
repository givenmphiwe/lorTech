
<template>
  <span @click="togglePasswordVisibility"  class="absolute inset-y-0 right-3 top-5 flex items-center cursor-pointer">
    <svg
      v-if="!showPassword"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.437 1.1-1.028 2.073-1.754 2.918m-2.22 2.133A8.963 8.963 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.042 9.042 0 012.752-3.702m2.243 1.292L3 3"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-1.06 2.663-3.693 4-5.542 4-1.849 0-4.482-1.337-5.542-4-1.06-2.663 0-5 1.542-5 .892 0 1.84.533 2.542 1.457A3 3 0 0012 15a3 3 0 100-6"
      />
    </svg>
  </span>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  showPassword: {
    type: Boolean,
    required: true,
  },
  togglePasswordVisibility: {
    type: Function,
    required: true,
  },
});
</script>

