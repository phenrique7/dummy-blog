<script setup lang="ts">
import { css } from "styled-system/css";

const codeEl = useTemplateRef("code-el");

onMounted(() => {
  if (codeEl.value) {
    codeEl.value.parentElement!.style.setProperty("margin", "1rem 0");
  }
});
</script>

<template>
  <code
    ref="code-el"
    :class="
      css({
        padding: 3,
        bg: 'bg_code',
        fontSize: 'sm',
        color: 'text_main',
        borderRadius: 'sm',
        fontWeight: 'semibold',
        border: '1px solid',
        borderColor: 'border_code',
      })
    "
  >
    <slot />
  </code>
</template>
