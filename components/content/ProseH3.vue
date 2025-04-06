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
  <h3
    :id="props.id"
    :class="
      css({
        lineHeight: '1.2',
        fontWeight: 'bold',
        color: 'text_muted',
      })
    "
  >
    <a v-if="props.id && generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </h3>
</template>

<style scoped>
h3 {
  margin: var(--spacing-2) 0;
  font-size: var(--font-sizes-3xl);
}

@media (max-width: 768px) {
  h3 {
    font-size: var(--font-sizes-2xl);
  }
}
</style>
