<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <code
    :class="
      css({
        my: 4,
        bg: 'bg_code',
        fontSize: 'sm',
        color: 'text.code',
        borderRadius: 'sm',
        fontWeight: 'semibold',
        padding: '0.25rem 0.375rem',
        border: '1px solid',
        borderColor: 'border_code',
      })
    "
  >
    <slot />
  </code>
</template>
