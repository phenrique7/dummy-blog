<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <code
    :class="
      css({ fontSize: 'sm', fontWeight: 'semibold', borderRadius: 'sm' })
    "
  >
    <slot />
  </code>
</template>

<style scoped>
code {
  padding: 0.25rem 0.375rem;
  background-color: var(--colors-bg_code);
  border: 1px solid var(--colors-border_code);
}
</style>
