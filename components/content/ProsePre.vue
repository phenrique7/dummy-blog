<script setup lang="ts">
import { css } from "styled-system/css";

defineProps({
  code: {
    type: String,
    default: "",
  },
  language: {
    type: String,
    default: null,
  },
  filename: {
    type: String,
    default: null,
  },
  highlights: {
    type: Array as () => number[],
    default: () => [],
  },
  meta: {
    type: String,
    default: null,
  },
  class: {
    type: String,
    default: null,
  },
});

const preEl = useTemplateRef<HTMLPreElement>("pre-el");

onMounted(() => {
  if (preEl.value) {
    preEl.value.childNodes[0].remove();
    preEl.value.childNodes[preEl.value.childNodes.length - 1].remove();
  }
});
</script>

<template>
  <pre
    ref="pre-el"
    :class="
      $props.class +
      ' ' +
      css({
        p: 3,
        my: 4,
        bg: 'bg_code',
        fontSize: 'sm',
        color: 'text.code',
        borderRadius: 'sm',
        border: '1px solid',
        borderColor: 'border_code',
      })
    "
  >
    <slot />
  </pre>
</template>

<style>
pre code .line {
  display: block;
}
</style>
