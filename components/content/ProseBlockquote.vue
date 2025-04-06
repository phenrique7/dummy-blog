<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <blockquote
    :class="css({ px: 6, color: 'text_main', fontWeight: 'medium' })"
  >
    <slot />
  </blockquote>
</template>

<style scoped>
blockquote {
  margin: 1rem 0;
  font-style: italic;
  border-left: 0.3em solid var(--colors-highlight);
}

blockquote :deep(p) {
  padding: 0;
}
</style>
