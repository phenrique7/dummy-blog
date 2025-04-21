<script setup lang="ts">
import { css } from "styled-system/css";
</script>

<template>
  <blockquote
    :class="
      css({
        px: 6,
        my: 4,
        color: 'text_main',
        fontStyle: 'italic',
        fontWeight: 'medium',
        borderLeft: '0.3em solid',
        borderColor: 'highlight',
        '& p': {
          padding: 0,
        },
      })
    "
  >
    <slot />
  </blockquote>
</template>
