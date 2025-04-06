<script setup lang="ts">
import { css } from "styled-system/css";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;

const generate = computed(() => {
  const hasAnchorLinks =
    (typeof headings?.anchorLinks === "boolean" &&
      headings.anchorLinks === true) ||
    (typeof headings?.anchorLinks === "object" &&
      headings.anchorLinks?.h1);

  return props.id && hasAnchorLinks;
});
</script>

<template>
  <h1
    :id="props.id"
    :class="
      css({
        lineHeight: '1.2',
        fontWeight: 'bold',
        color: 'text_main',
      })
    "
  >
    <a v-if="generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h1>
</template>

<style scoped>
h1 {
  margin-bottom: var(--spacing-4);
  font-size: var(--font-sizes-6xl);
}

@media (max-width: 768px) {
  h1 {
    font-size: var(--font-sizes-5xl);
  }
}
</style>
