<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <code
    :class="
      css({
        padding: 1,
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
