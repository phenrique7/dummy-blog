<script setup lang="ts">
const props = defineProps<{ color?: string }>();
</script>

<template>
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    aria-hidden="true"
    focusable="false"
    :fill="props.color ?? 'currentColor'"
  >
    <path
      fill-rule="evenodd"
      d="M7.186 19.172c.789.51 1.701.855 2.814.828 1.111.027 2.025-.318 2.814-.828L12.797 17H7.203l-.017 2.172zM12.697 16c0-4.357 4.63-5.848 4.283-10.188-.218-2.738-2.073-5.81-6.98-5.81S3.238 3.074 3.019 5.813C2.672 10.152 7.303 11.643 7.303 16h5.394zM5 6c.207-2.598 2.113-4 5-4 2.886 0 4.654 1.371 4.861 3.969.113 1.424-.705 2.373-1.809 3.926C12.238 11.041 11.449 12.238 11 14H9c-.449-1.762-1.238-2.959-2.053-4.106C5.844 8.342 4.886 7.424 5 6z"
      clip-rule="evenodd"
    ></path>
  </svg>
</template>
