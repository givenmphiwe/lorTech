<template>
  <span v-if="!loading">
    <slot></slot>
  </span>
  <span v-else>
    <svg
      class="animate-spin h-5 w-5 text-white mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C6.477 0 0 6.477 0 14h4z"
      ></path>
    </svg>
  </span>
</template>

<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  loading: {
    type: Boolean,
    required: true,
  },
});
</script>


