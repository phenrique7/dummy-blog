<script setup lang="ts">
import { css } from "styled-system/css";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;

const generate = computed(() => {
  const hasAnchorLinks =
    (typeof headings?.anchorLinks === "boolean" &&
      headings?.anchorLinks === true) ||
    (typeof headings?.anchorLinks === "object" &&
      headings?.anchorLinks?.h2);

  return props.id && hasAnchorLinks;
});
</script>

<template>
  <h2
    :id="props.id"
    :class="
      css({
        lineHeight: '1.2',
        fontWeight: 'bold',
        color: 'text_main',
      })
    "
  >
    <a v-if="props.id && generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<style scoped>
h2 {
  margin-bottom: var(--spacing-3);
  font-size: var(--font-sizes-4xl);
}

@media (max-width: 768px) {
  h2 {
    font-size: var(--font-sizes-3xl);
  }
}
</style>
